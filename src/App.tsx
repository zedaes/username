import { useState } from "react";
import { platforms } from "./websites";

export default function App() {
  const [username, setUsername] = useState("");
  const [results, setResults] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function checkAll() {
    setLoading(true);
    const r: Record<string, string> = {};
    await Promise.all(
      platforms.map(async (plat) => {
        try {
          r[plat.name] = (await plat.check(username)) ? "Available" : "Taken";
        } catch {
          r[plat.name] = "Error";
        }
      })
    );
    setResults(r);
    setLoading(false);
  }

  return (
    <div style={{ margin: 40 }}>
      <h1>Username Availability Checker</h1>
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Enter username"
        style={{ marginRight: 8 }}
      />
      <button disabled={loading || !username} onClick={checkAll}>
        {loading ? "Checking..." : "Check"}
      </button>
      <ul>
        {Object.entries(results).map(([site, status]) => (
          <li key={site}>
            {site}: {status}
          </li>
        ))}
      </ul>
    </div>
  );
}
