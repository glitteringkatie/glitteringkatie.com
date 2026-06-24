import { useState, useEffect, useRef } from 'react';
import { FaRegSquare, FaCheckSquare, FaLock, FaLockOpen } from 'react-icons/fa';

type Item = { id: string; text: string; done: boolean };
type Data = { todos: Item[]; ideas: Item[] };

const SESSION_KEY = 'gk-workshop-pw';

async function callApi(password: string | null, action: string, data?: Data) {
  const res = await fetch('/api/workshop', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, action, data }),
  });
  if (res.status === 401) throw new Error('unauthorized');
  if (!res.ok) throw new Error('error');
  return res.json();
}

function List({
  title,
  items,
  editable,
  onToggle,
  onRemove,
  onAdd,
}: {
  title: string;
  items: Item[];
  editable: boolean;
  onToggle?: (id: string) => void;
  onRemove?: (id: string) => void;
  onAdd?: (text: string) => void;
}) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = () => {
    const text = input.trim();
    if (!text || !onAdd) return;
    onAdd(text);
    setInput('');
    inputRef.current?.focus();
  };

  return (
    <section className="mb-12">
      <h2 className="font-sans uppercase tracking-widest font-light text-xl pb-3 mb-4 border-b border-dimGray/20">
        {title}
      </h2>
      <ul className="mb-6 space-y-3">
        {items.length === 0 && (
          <li className="text-dimGray italic">nothing yet</li>
        )}
        {items.map(item => (
          <li key={item.id} className="flex items-baseline group gap-3">
            <button
              onClick={() => editable && onToggle?.(item.id)}
              disabled={!editable}
              className={`shrink-0 transition-colors mt-0.5 ${item.done ? 'text-dimGray' : 'text-pine'} ${editable ? 'hover:text-fern cursor-pointer' : 'cursor-default'}`}
              aria-label={item.done ? 'uncheck' : 'check'}
            >
              {item.done ? <FaCheckSquare /> : <FaRegSquare />}
            </button>
            <span className={`flex-1 text-lg leading-snug ${item.done ? 'line-through text-dimGray' : 'text-warmBlack'}`}>
              {item.text}
            </span>
            {editable && (
              <button
                onClick={() => onRemove?.(item.id)}
                className="opacity-0 group-hover:opacity-100 text-dimGray hover:text-warmBlack transition-opacity text-xl leading-none shrink-0"
                aria-label="remove"
              >
                ×
              </button>
            )}
          </li>
        ))}
      </ul>
      {editable && (
        <div className="flex gap-3 items-baseline">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
            placeholder={`add to ${title}…`}
            className="flex-1 bg-transparent border-b border-dimGray/40 focus:border-pine outline-none text-lg pb-1 placeholder:text-dimGray/40 transition-colors"
          />
          <button
            onClick={submit}
            className="text-pine hover:text-fern font-serif font-semibold text-2xl transition-colors shrink-0 leading-none"
          >
            +
          </button>
        </div>
      )}
    </section>
  );
}

export default function Workshop() {
  const [data, setData] = useState<Data | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const passwordRef = useRef('');
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const promptInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    callApi(null, 'get').then(setData);
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved) {
      passwordRef.current = saved;
      setEditMode(true);
    }
  }, []);

  useEffect(() => {
    if (showPrompt) promptInputRef.current?.focus();
  }, [showPrompt]);

  const unlock = async () => {
    setVerifying(true);
    setLoginError(false);
    try {
      await callApi(passwordInput, 'verify');
      passwordRef.current = passwordInput;
      sessionStorage.setItem(SESSION_KEY, passwordInput);
      setEditMode(true);
      setShowPrompt(false);
      setPasswordInput('');
    } catch {
      setLoginError(true);
    } finally {
      setVerifying(false);
    }
  };

  const lock = () => {
    setEditMode(false);
    setShowPrompt(false);
    setPasswordInput('');
    passwordRef.current = '';
    sessionStorage.removeItem(SESSION_KEY);
  };

  const updateData = (newData: Data) => {
    setData(newData);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    setSyncStatus('saving');
    saveTimer.current = setTimeout(async () => {
      try {
        await callApi(passwordRef.current, 'update', newData);
        setSyncStatus('saved');
        setTimeout(() => setSyncStatus('idle'), 2000);
      } catch {
        setSyncStatus('error');
      }
    }, 1200);
  };

  const actions = (key: keyof Data) => ({
    onToggle: (id: string) =>
      updateData({ ...data!, [key]: data![key].map(item => item.id === id ? { ...item, done: !item.done } : item) }),
    onRemove: (id: string) =>
      updateData({ ...data!, [key]: data![key].filter(item => item.id !== id) }),
    onAdd: (text: string) =>
      updateData({ ...data!, [key]: [...data![key], { id: String(Date.now()), text, done: false }] }),
  });

  if (!data) return <p className="text-dimGray italic">loading…</p>;

  return (
    <div className="max-w-xl">
      <div className="flex justify-between items-center pb-8 min-h-[2rem]">
        <div className="text-xs text-dimGray/60">
          {syncStatus === 'saving' && 'saving…'}
          {syncStatus === 'saved' && 'saved'}
          {syncStatus === 'error' && 'sync error'}
        </div>
        <div className="flex items-center gap-3">
          {showPrompt && !editMode && (
            <div className="flex items-center gap-2">
              {loginError && <span className="text-xs text-red-500">wrong password</span>}
              <input
                ref={promptInputRef}
                type="password"
                value={passwordInput}
                onChange={e => { setPasswordInput(e.target.value); setLoginError(false); }}
                onKeyDown={e => {
                  if (e.key === 'Enter') unlock();
                  if (e.key === 'Escape') { setShowPrompt(false); setPasswordInput(''); setLoginError(false); }
                }}
                placeholder="password"
                className="bg-transparent border-b border-dimGray/40 focus:border-pine outline-none text-sm pb-0.5 w-28 placeholder:text-dimGray/40 transition-colors"
              />
              <button
                onClick={unlock}
                disabled={verifying || !passwordInput}
                className="text-pine hover:text-fern text-sm transition-colors disabled:opacity-40"
              >
                {verifying ? '…' : 'unlock'}
              </button>
            </div>
          )}
          <button
            onClick={editMode ? lock : () => setShowPrompt(p => !p)}
            className="text-dimGray/50 hover:text-dimGray transition-colors"
            aria-label={editMode ? 'lock editing' : 'unlock editing'}
          >
            {editMode ? <FaLockOpen className="text-base" /> : <FaLock className="text-base" />}
          </button>
        </div>
      </div>

      <List title="todo" items={data.todos} editable={editMode} {...(editMode ? actions('todos') : {})} />
      <List title="ideas" items={data.ideas} editable={editMode} {...(editMode ? actions('ideas') : {})} />
    </div>
  );
}
