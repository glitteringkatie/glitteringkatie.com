import { useState, useEffect, useRef } from 'react';
import { FaRegSquare, FaCheckSquare } from 'react-icons/fa';

type Item = { id: string; text: string; done: boolean };
type Data = { todos: Item[]; ideas: Item[] };
type Config = { passwordHash: string; githubToken: string; gistId: string };
type AppState = 'loading' | 'setup' | 'locked' | 'unlocked';

const CONFIG_KEY = 'gk-workshop-config';
const CACHE_KEY = 'gk-workshop-cache';
const GIST_FILE = 'workshop.json';
const EMPTY_DATA: Data = { todos: [], ideas: [] };

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

const gistHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  Accept: 'application/vnd.github+json',
  'Content-Type': 'application/json',
});

async function fetchGist(token: string, gistId: string): Promise<Data> {
  const res = await fetch(`https://api.github.com/gists/${gistId}`, {
    headers: gistHeaders(token),
  });
  if (!res.ok) throw new Error('fetch failed');
  const json = await res.json();
  const content = json.files?.[GIST_FILE]?.content;
  return content ? JSON.parse(content) : EMPTY_DATA;
}

async function patchGist(token: string, gistId: string, data: Data): Promise<void> {
  await fetch(`https://api.github.com/gists/${gistId}`, {
    method: 'PATCH',
    headers: gistHeaders(token),
    body: JSON.stringify({ files: { [GIST_FILE]: { content: JSON.stringify(data, null, 2) } } }),
  });
}

async function createGist(token: string, initial: Data): Promise<string> {
  const res = await fetch('https://api.github.com/gists', {
    method: 'POST',
    headers: gistHeaders(token),
    body: JSON.stringify({
      description: 'glitteringkatie.com workshop',
      public: false,
      files: { [GIST_FILE]: { content: JSON.stringify(initial, null, 2) } },
    }),
  });
  if (!res.ok) throw new Error('create failed');
  const json = await res.json();
  return json.id as string;
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
  const [appState, setAppState] = useState<AppState>('loading');
  const [data, setData] = useState<Data>(EMPTY_DATA);
  const [config, setConfig] = useState<Config | null>(null);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Setup form
  const [setupPassword, setSetupPassword] = useState('');
  const [setupToken, setSetupToken] = useState('');
  const [setupError, setSetupError] = useState('');
  const [setupLoading, setSetupLoading] = useState(false);

  // Login form
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONFIG_KEY);
    if (stored) {
      setConfig(JSON.parse(stored));
      setAppState('locked');
    } else {
      setAppState('setup');
    }
  }, []);

  const handleSetup = async () => {
    if (!setupPassword || !setupToken) return;
    setSetupLoading(true);
    setSetupError('');
    try {
      const hash = await sha256(setupPassword);
      const gistId = await createGist(setupToken, EMPTY_DATA);
      const newConfig: Config = { passwordHash: hash, githubToken: setupToken, gistId };
      localStorage.setItem(CONFIG_KEY, JSON.stringify(newConfig));
      setConfig(newConfig);
      setData(EMPTY_DATA);
      setAppState('unlocked');
    } catch {
      setSetupError('Could not create gist — check that your token has the gist scope.');
    } finally {
      setSetupLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!config) return;
    setLoginLoading(true);
    setLoginError(false);
    const hash = await sha256(loginPassword);
    if (hash !== config.passwordHash) {
      setLoginError(true);
      setLoginPassword('');
      setLoginLoading(false);
      return;
    }
    try {
      const gistData = await fetchGist(config.githubToken, config.gistId);
      setData(gistData);
      localStorage.setItem(CACHE_KEY, JSON.stringify(gistData));
    } catch {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) setData(JSON.parse(cached));
    }
    setLoginLoading(false);
    setAppState('unlocked');
  };

  const updateData = (newData: Data) => {
    setData(newData);
    localStorage.setItem(CACHE_KEY, JSON.stringify(newData));
    if (saveTimer.current) clearTimeout(saveTimer.current);
    setSyncStatus('saving');
    saveTimer.current = setTimeout(async () => {
      try {
        if (config) await patchGist(config.githubToken, config.gistId, newData);
        setSyncStatus('saved');
        setTimeout(() => setSyncStatus('idle'), 2000);
      } catch {
        setSyncStatus('error');
      }
    }, 1200);
  };

  const actions = (key: keyof Data) => ({
    onToggle: (id: string) =>
      updateData({ ...data, [key]: data[key].map(item => item.id === id ? { ...item, done: !item.done } : item) }),
    onRemove: (id: string) =>
      updateData({ ...data, [key]: data[key].filter(item => item.id !== id) }),
    onAdd: (text: string) =>
      updateData({ ...data, [key]: [...data[key], { id: String(Date.now()), text, done: false }] }),
  });

  if (appState === 'loading') return null;

  if (appState === 'setup') {
    return (
      <div className="max-w-md">
        <h2 className="font-serif font-semibold text-2xl pb-2">first time setup</h2>
        <p className="text-dimGray text-sm pb-8">
          Your todos will sync to a private GitHub Gist.{' '}
          <a
            href="https://github.com/settings/tokens/new?scopes=gist&description=glitteringkatie+workshop"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pine hover:text-fern underline"
          >
            Create a token here
          </a>{' '}
          with the <code className="font-code text-xs bg-dimGray/10 px-1 py-0.5 rounded">gist</code> scope.
        </p>
        {setupError && <p className="text-red-600 text-sm pb-4">{setupError}</p>}
        <div className="space-y-6">
          <div>
            <label className="font-sans uppercase tracking-widest text-xs text-dimGray block pb-2">password</label>
            <input
              type="password"
              value={setupPassword}
              onChange={e => setSetupPassword(e.target.value)}
              placeholder="choose a password"
              className="w-full bg-transparent border-b border-dimGray/40 focus:border-pine outline-none text-lg pb-1 placeholder:text-dimGray/40 transition-colors"
            />
          </div>
          <div>
            <label className="font-sans uppercase tracking-widest text-xs text-dimGray block pb-2">github token</label>
            <input
              type="password"
              value={setupToken}
              onChange={e => setSetupToken(e.target.value)}
              placeholder="ghp_..."
              className="w-full bg-transparent border-b border-dimGray/40 focus:border-pine outline-none text-lg pb-1 placeholder:text-dimGray/40 transition-colors font-code text-sm"
            />
          </div>
          <button
            onClick={handleSetup}
            disabled={setupLoading || !setupPassword || !setupToken}
            className="bg-pine text-cream pt-3 px-6 pb-2 rounded-full font-serif font-semibold text-lg transition-colors hover:bg-fern disabled:opacity-40"
          >
            {setupLoading ? 'setting up…' : 'set up workshop'}
          </button>
        </div>
      </div>
    );
  }

  if (appState === 'locked') {
    return (
      <div className="max-w-xs">
        <div className="space-y-6">
          {loginError && <p className="text-red-600 text-sm">wrong password</p>}
          <div>
            <label className="font-sans uppercase tracking-widest text-xs text-dimGray block pb-2">password</label>
            <input
              type="password"
              value={loginPassword}
              onChange={e => { setLoginPassword(e.target.value); setLoginError(false); }}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="enter password"
              autoFocus
              className="w-full bg-transparent border-b border-dimGray/40 focus:border-pine outline-none text-lg pb-1 placeholder:text-dimGray/40 transition-colors"
            />
          </div>
          <button
            onClick={handleLogin}
            disabled={loginLoading || !loginPassword}
            className="bg-pine text-cream pt-3 px-6 pb-2 rounded-full font-serif font-semibold text-lg transition-colors hover:bg-fern disabled:opacity-40"
          >
            {loginLoading ? 'unlocking…' : 'unlock'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <div className="text-xs text-dimGray/60 pb-8 text-right">
        {syncStatus === 'saving' && 'saving…'}
        {syncStatus === 'saved' && 'saved'}
        {syncStatus === 'error' && 'sync error'}
      </div>
      <List title="todo" items={data.todos} {...actions('todos')} />
      <List title="ideas" items={data.ideas} {...actions('ideas')} />
    </div>
  );
}
