import { checkGithub } from "./github";
import { checkChesscom } from "./chesscom";

export const platforms = [
  {
    name: "GitHub",
    check: checkGithub,
  },
  {
    name: "Chess.com",
    check: checkChesscom,
  }
  // Add more here as you expand
];
