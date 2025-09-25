export async function checkChesscom(username: string): Promise<boolean> {
  const res = await fetch(`https://api.chess.com/pub/player/${username}`);
  return res.status === 404;
}
