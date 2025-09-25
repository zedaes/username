import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const username = req.query.username as string;
  if (!username) return res.status(400).json({ error: "Username required" });

  try {
    const response = await fetch(`https://medium.com/@${username}`, { method: "HEAD" });
    res.json({ available: response.status === 404 });
  } catch {
    res.status(500).json({ error: "Medium check failed" });
  }
}
