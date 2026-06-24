import { getStore } from '@netlify/blobs';

const authorized = (password) =>
  password && password === process.env.WORKSHOP_PASSWORD;

export default async (req) => {
  let body;
  try {
    body = await req.json();
  } catch {
    return new Response('bad request', { status: 400 });
  }

  const { password, action, data } = body;
  const store = getStore('workshop');

  if (action === 'get') {
    const value = await store.get('data', { type: 'json' });
    return Response.json(value ?? { todos: [], ideas: [] });
  }

  if (action === 'verify') {
    if (!authorized(password)) return new Response('unauthorized', { status: 401 });
    return Response.json({ ok: true });
  }

  if (action === 'update') {
    if (!authorized(password)) return new Response('unauthorized', { status: 401 });
    if (!data) return new Response('bad request', { status: 400 });
    await store.set('data', JSON.stringify(data));
    return Response.json({ ok: true });
  }

  return new Response('bad request', { status: 400 });
};

export const config = { path: '/api/workshop' };
