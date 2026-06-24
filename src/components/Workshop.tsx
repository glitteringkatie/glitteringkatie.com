import { useState, useEffect, useRef } from 'react';
import { FaRegSquare, FaCheckSquare } from 'react-icons/fa';

type Item = { id: string; text: string; done: boolean };
type Data = { todos: Item[]; ideas: Item[] };

const SESSION_KEY = 'gk-workshop-pw';

async function callApi(password: string, action: string, data?: Data) {
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
  onToggle,
  onRemove,
  onAdd,
}: {
  title: string;
  items: Item[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onAdd: (text: string) => void;
}) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = () => {
    const text = input.trim();
    if (!text) return;
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
              onClick={() => onToggle(item.id)}
              className={`shrink-0 transition-colors mt-0.5 ${item.done ? 'text-dimGray' : 'text-pine hover:text-fern'}`}
              aria-label={item.done ? 'uncheck' : 'check'}
            >
              {item.done ? <FaCheckSquare /> : <FaRegSquare />}
            </button>
            <span className={`flex-1 text-lg leading-snug ${item.done ? 'line-through text-dimGray' : 'text-warmBlack'}`}>
              {item.text}
            </span>
            <button
              onClick={() => onRemove(item.id)}
              className="opacity-0 group-hover:opacity-100 text-dimGray hover:text-warmBlack transition-opacity text-xl leading-none shrink-0"
              aria-label="remove"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
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
    </section>
  );
}

export default function Workshop() {
  const [data, setData] = useState<Data | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const passwordRef = useRef('');
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const login = async (pw: string) => {
    setLoading(true);
    setLoginError(false);
    try {
      const result = await callApi(pw, 'get');
      passwordRef.current = pw;
      sessionStorage.setItem(SESSION_KEY, pw);
      setData(result);
    } catch (e) {
      setLoginError((e as Error).message === 'unauthorized');
      sessionStorage.removeItem(SESSION_KEY);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved) login(saved);
  }, []);

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

  if (data) {
    return (
      <div className="max-w-xl">
        <div className="text-xs text-dimGray/60 pb-8 text-right h-6">
          {syncStatus === 'saving' && 'saving…'}
          {syncStatus === 'saved' && 'saved'}
          {syncStatus === 'error' && 'sync error — changes may not have saved'}
        </div>
        <List title="todo" items={data.todos} {...actions('todos')} />
        <List title="ideas" items={data.ideas} {...actions('ideas')} />
      </div>
    );
  }

  return (
    <div className="max-w-xs">
      <div className="space-y-6">
        {loginError && <p className="text-red-600 text-sm">wrong password</p>}
        <div>
          <label className="font-sans uppercase tracking-widest text-xs text-dimGray block pb-2">
            password
          </label>
          <input
            type="password"
            value={passwordInput}
            onChange={e => { setPasswordInput(e.target.value); setLoginError(false); }}
            onKeyDown={e => e.key === 'Enter' && login(passwordInput)}
            placeholder="enter password"
            autoFocus
            className="w-full bg-transparent border-b border-dimGray/40 focus:border-pine outline-none text-lg pb-1 placeholder:text-dimGray/40 transition-colors"
          />
        </div>
        <button
          onClick={() => login(passwordInput)}
          disabled={loading || !passwordInput}
          className="bg-pine text-cream pt-3 px-6 pb-2 rounded-full font-serif font-semibold text-lg transition-colors hover:bg-fern disabled:opacity-40"
        >
          {loading ? 'unlocking…' : 'unlock'}
        </button>
      </div>
    </div>
  );
}
