import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { username } = req.query;

  if (typeof username !== 'string') {
    res.status(400).json({ error: "Missing or invalid username" });
    return;
  }

  try {
    const response = await fetch(`https://github.com/${username}`, { method: 'HEAD' });
    res.json({ available: response.status === 404 });
  } catch (error) {
    res.status(500).json({ error: "Failed to check GitHub username" });
  }
}
