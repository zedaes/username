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
