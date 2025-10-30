import { checkGithub } from "./github";
import { checkChesscom } from "./chesscom";
import { checkEtsy } from "./etsy";
import { checkInstagram } from "./instagram";
import { checkMedium } from "./medium";
import { checkReddit } from "./reddit";
import { checkSteam } from "./steam";
import { checkTwitch } from "./twitch";
import { checkTwitter } from "./twitter";

export const platforms = [
  {
    name: "GitHub",
    check: checkGithub,
    url: (username: string) => `https://github.com/${username}`,
  },
  {
    name: "Chess.com",
    check: checkChesscom,
    url: (username: string) => `https://www.chess.com/member/${username}`,
  },
  {
    name: "Etsy",
    check: checkEtsy,
    url: (username: string) => `https://www.etsy.com/shop/${username}`,
  },
  {
    name: "Instagram",
    check: checkInstagram,
    url: (username: string) => `https://www.instagram.com/${username}`,
  },
  {
    name: "Medium",
    check: checkMedium,
    url: (username: string) => `https://medium.com/@${username}`,
  },
  {
    name: "Reddit",
    check: checkReddit,
    url: (username: string) => `https://www.reddit.com/user/${username}`,
  },
  {
    name: "Steam",
    check: checkSteam,
    url: (username: string) => `https://steamcommunity.com/id/${username}`,
  },
  {
    name: "Twitch",
    check: checkTwitch,
    url: (username: string) => `https://www.twitch.tv/${username}`,
  },
  {
    name: "Twitter",
    check: checkTwitter,
    url: (username: string) => `https://twitter.com/${username}`,
  }
];

// Generic helper to call the dynamic API for platforms that don't have bespoke checkers
const makeCheck = (key: string) => async (username: string) => {
  const res = await fetch(`/api/check/${key}?username=${encodeURIComponent(username)}`)
  if (!res.ok) throw new Error('API error')
  const data = await res.json()
  return data.available
}

// Additional platforms (50+)
const extraPlatforms = [
  { name: 'Facebook', key: 'facebook', url: (u: string) => `https://www.facebook.com/${u}` },
  { name: 'LinkedIn', key: 'linkedin', url: (u: string) => `https://www.linkedin.com/in/${u}` },
  { name: 'YouTube', key: 'youtube', url: (u: string) => `https://www.youtube.com/@${u}` },
  { name: 'Pinterest', key: 'pinterest', url: (u: string) => `https://www.pinterest.com/${u}` },
  { name: 'Snapchat', key: 'snapchat', url: (u: string) => `https://www.snapchat.com/add/${u}` },
  { name: 'TikTok', key: 'tiktok', url: (u: string) => `https://www.tiktok.com/@${u}` },
  { name: 'Telegram', key: 'telegram', url: (u: string) => `https://t.me/${u}` },
  { name: 'Discord', key: 'discord', url: (u: string) => `https://discord.com/users/${u}` },
  { name: 'GitLab', key: 'gitlab', url: (u: string) => `https://gitlab.com/${u}` },
  { name: 'npm', key: 'npm', url: (u: string) => `https://www.npmjs.com/~${u}` },
  { name: 'Docker Hub', key: 'docker', url: (u: string) => `https://hub.docker.com/u/${u}` },
  { name: 'CodePen', key: 'codepen', url: (u: string) => `https://codepen.io/${u}` },
  { name: 'CodeSandbox', key: 'codesandbox', url: (u: string) => `https://codesandbox.io/u/${u}` },
  { name: 'Replit', key: 'replit', url: (u: string) => `https://replit.com/@${u}` },
  { name: 'Hashnode', key: 'hashnode', url: (u: string) => `https://hashnode.com/@${u}` },
  { name: 'Dev.to', key: 'devto', url: (u: string) => `https://dev.to/${u}` },
  { name: 'Dribbble', key: 'dribbble', url: (u: string) => `https://dribbble.com/${u}` },
  { name: 'Behance', key: 'behance', url: (u: string) => `https://www.behance.net/${u}` },
  { name: 'SoundCloud', key: 'soundcloud', url: (u: string) => `https://soundcloud.com/${u}` },
  { name: 'Vimeo', key: 'vimeo', url: (u: string) => `https://vimeo.com/${u}` },
  { name: 'Flickr', key: 'flickr', url: (u: string) => `https://www.flickr.com/people/${u}` },
  { name: 'Product Hunt', key: 'producthunt', url: (u: string) => `https://www.producthunt.com/@${u}` },
  { name: 'AngelList', key: 'angellist', url: (u: string) => `https://angel.co/u/${u}` },
  { name: 'Patreon', key: 'patreon', url: (u: string) => `https://www.patreon.com/${u}` },
  { name: 'Spotify', key: 'spotify', url: (u: string) => `https://open.spotify.com/user/${u}` },
  { name: 'Meetup', key: 'meetup', url: (u: string) => `https://www.meetup.com/members/${u}` },
  { name: 'Mastodon', key: 'mastodon', url: (u: string) => `https://mastodon.social/@${u}` },
  { name: 'Hacker News', key: 'hackernews', url: (u: string) => `https://news.ycombinator.com/user?id=${u}` },
  { name: 'Codeberg', key: 'codeberg', url: (u: string) => `https://codeberg.org/${u}` },
  { name: 'SourceForge', key: 'sourceforge', url: (u: string) => `https://sourceforge.net/u/${u}/profile` },
  { name: 'Bitbucket', key: 'bitbucket', url: (u: string) => `https://bitbucket.org/${u}` },
  { name: 'ArtStation', key: 'artstation', url: (u: string) => `https://www.artstation.com/${u}` },
  { name: 'Keybase', key: 'keybase', url: (u: string) => `https://keybase.io/${u}` },
  { name: 'Unsplash', key: 'unsplash', url: (u: string) => `https://unsplash.com/@${u}` },
  { name: '500px', key: 'px500', url: (u: string) => `https://500px.com/${u}` },
  { name: 'Codementor', key: 'codementor', url: (u: string) => `https://www.codementor.io/${u}` },
  { name: 'Goodreads', key: 'goodreads', url: (u: string) => `https://www.goodreads.com/user/show/${u}` },
  { name: 'StackOverflow', key: 'stackoverflow', url: (u: string) => `https://stackoverflow.com/users/${u}` },
  { name: 'HackerOne', key: 'hackerone', url: (u: string) => `https://hackerone.com/${u}` },
  { name: 'Mixcloud', key: 'mixcloud', url: (u: string) => `https://www.mixcloud.com/${u}` },
  { name: 'Scribd', key: 'scribd', url: (u: string) => `https://www.scribd.com/user/${u}` },
  { name: 'Wix', key: 'wix', url: (u: string) => `https://www.wix.com/${u}` },
  { name: 'Slack (team)', key: 'slack', url: (u: string) => `https://slack.com/team/${u}` },
  { name: 'TripAdvisor', key: 'tripadvisor', url: (u: string) => `https://www.tripadvisor.com/members/${u}` },
  { name: 'Academia.edu', key: 'academia', url: (u: string) => `https://www.academia.edu/${u}` },
  { name: 'Tumblr', key: 'tumblr', url: (u: string) => `https://${u}.tumblr.com` },
  { name: 'Gitee', key: 'gitee', url: (u: string) => `https://gitee.com/${u}` },
]

// Attach extra platforms using the generic check
extraPlatforms.forEach(p => {
  platforms.push({ name: p.name, check: makeCheck(p.key), url: p.url })
})
