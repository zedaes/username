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
  },
  {
    name: "Chess.com",
    check: checkChesscom,
  },
  {
    name: "Etsy",
    check: checkEtsy,
  },
  {
    name: "Instagram",
    check: checkInstagram,
  },
  {
    name: "Medium",
    check: checkMedium,
  },
  {
    name: "Reddit",
    check: checkReddit,
  },
  {
    name: "Steam",
    check: checkSteam,
  },
  {
    name: "Twitch",
    check: checkTwitch,
  },
  {
    name: "Twitter",
    check: checkTwitter,
  }
];
