import { getStore } from '@netlify/blobs';

export default async (req) => {
  let body;
  try {
    body = await req.json();
  } catch {
    return new Response('bad request', { status: 400 });
  }

  const { password, action, data } = body;

  if (!password || password !== process.env.WORKSHOP_PASSWORD) {
    return new Response('unauthorized', { status: 401 });
  }

  const store = getStore('workshop');

  if (action === 'get') {
    const value = await store.get('data', { type: 'json' });
    return Response.json(value ?? { todos: [], ideas: [] });
  }

  if (action === 'update' && data) {
    await store.set('data', JSON.stringify(data));
    return Response.json({ ok: true });
  }

  return new Response('bad request', { status: 400 });
};

export const config = { path: '/api/workshop' };
