import type { VercelRequest, VercelResponse } from '@vercel/node'

// Map of platform key -> profile URL generator
const TEMPLATES: Record<string, (username: string) => string> = {
  facebook: (u) => `https://www.facebook.com/${u}`,
  linkedin: (u) => `https://www.linkedin.com/in/${u}`,
  youtube: (u) => `https://www.youtube.com/@${u}`,
  pinterest: (u) => `https://www.pinterest.com/${u}`,
  snapchat: (u) => `https://www.snapchat.com/add/${u}`,
  tiktok: (u) => `https://www.tiktok.com/@${u}`,
  telegram: (u) => `https://t.me/${u}`,
  discord: (u) => `https://discord.com/users/${u}`,
  gitlab: (u) => `https://gitlab.com/${u}`,
  npm: (u) => `https://www.npmjs.com/~${u}`,
  docker: (u) => `https://hub.docker.com/u/${u}`,
  codepen: (u) => `https://codepen.io/${u}`,
  codesandbox: (u) => `https://codesandbox.io/u/${u}`,
  replit: (u) => `https://replit.com/@${u}`,
  hashnode: (u) => `https://hashnode.com/@${u}`,
  devto: (u) => `https://dev.to/${u}`,
  dribbble: (u) => `https://dribbble.com/${u}`,
  behance: (u) => `https://www.behance.net/${u}`,
  soundcloud: (u) => `https://soundcloud.com/${u}`,
  vimeo: (u) => `https://vimeo.com/${u}`,
  flickr: (u) => `https://www.flickr.com/people/${u}`,
  producthunt: (u) => `https://www.producthunt.com/@${u}`,
  angellist: (u) => `https://angel.co/u/${u}`,
  patreon: (u) => `https://www.patreon.com/${u}`,
  spotify: (u) => `https://open.spotify.com/user/${u}`,
  meetup: (u) => `https://www.meetup.com/members/${u}`,
  mastodon: (u) => `https://mastodon.social/@${u}`,
  hackernews: (u) => `https://news.ycombinator.com/user?id=${u}`,
  codeberg: (u) => `https://codeberg.org/${u}`,
  sourceforge: (u) => `https://sourceforge.net/u/${u}/profile`,
  bitbucket: (u) => `https://bitbucket.org/${u}`,
  artstation: (u) => `https://www.artstation.com/${u}`,
  keybase: (u) => `https://keybase.io/${u}`,
  unsplash: (u) => `https://unsplash.com/@${u}`,
  px500: (u) => `https://500px.com/${u}`,
  codementor: (u) => `https://www.codementor.io/${u}`,
  goodreads: (u) => `https://www.goodreads.com/user/show/${u}`,
  stackoverflow: (u) => `https://stackoverflow.com/users/${u}`,
  hackerone: (u) => `https://hackerone.com/${u}`,
  telegramme: (u) => `https://telegram.me/${u}`,
  mixcloud: (u) => `https://www.mixcloud.com/${u}`,
  scribd: (u) => `https://www.scribd.com/user/${u}`,
  wix: (u) => `https://www.wix.com/${u}`,
  slack: (u) => `https://slack.com/team/${u}`,
  tradeshift: (u) => `https://tradeshift.com/${u}`,
  tripadvisor: (u) => `https://www.tripadvisor.com/members/${u}`,
  telegramorg: (u) => `https://telegram.org/${u}`,
  academia: (u) => `https://www.academia.edu/${u}`,
  tumblr: (u) => `https://${u}.tumblr.com`,
  gitee: (u) => `https://gitee.com/${u}`,
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const platform = Array.isArray(req.query.platform) ? req.query.platform[0] : req.query.platform
  const username = Array.isArray(req.query.username) ? req.query.username[0] : req.query.username

  if (!platform) return res.status(400).json({ error: 'Platform required' })
  if (!username) return res.status(400).json({ error: 'Username required' })

  const generator = TEMPLATES[platform]
  if (!generator) return res.status(404).json({ error: 'Unknown platform' })

  const url = generator(encodeURIComponent(username))

  try {
    const response = await fetch(url, { method: 'HEAD' })
    // If HEAD not allowed, try GET as a fallback
    if (response.status === 405 || response.status === 403) {
      const getRes = await fetch(url, { method: 'GET' })
      return res.json({ available: getRes.status === 404 })
    }
    return res.json({ available: response.status === 404 })
  } catch {
    return res.status(500).json({ error: 'Check failed' })
  }
}
