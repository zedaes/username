export async function checkInstagram(username: string): Promise<boolean> {
  const res = await fetch(`/api/check/instagram?username=${username}`);
  if (!res.ok) throw new Error("API error");
  const data = await res.json();
  return data.available;
}