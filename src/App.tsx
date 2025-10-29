import { useState } from "react";
import { platforms } from "./websites";
import "./App.css";

type Status = "available" | "taken" | "error" | "loading" | "idle";

interface Result {
  status: Status;
  url?: string;
}

export default function App() {
  const [username, setUsername] = useState("");
  const [results, setResults] = useState<Record<string, Result>>({});
  const [checking, setChecking] = useState(false);

  const availableCount = Object.values(results).filter(r => r.status === "available").length;
  const takenCount = Object.values(results).filter(r => r.status === "taken").length;
  const totalChecked = Object.values(results).filter(r => r.status !== "idle" && r.status !== "loading").length;

  async function checkAll() {
    if (!username.trim()) return;
    
    setChecking(true);
    
    // Initialize all platforms as loading
    const initialResults: Record<string, Result> = {};
    platforms.forEach(plat => {
      initialResults[plat.name] = { status: "loading" };
    });
    setResults(initialResults);

    // Check each platform
    const promises = platforms.map(async (plat) => {
      try {
        const isAvailable = await plat.check(username.trim());
        return {
          name: plat.name,
          result: {
            status: isAvailable ? "available" : "taken",
            url: plat.url(username.trim())
          } as Result
        };
      } catch {
        return {
          name: plat.name,
          result: { status: "error" } as Result
        };
      }
    });

    // Update results as they complete
    for (const promise of promises) {
      promise.then(({ name, result }) => {
        setResults(prev => ({
          ...prev,
          [name]: result
        }));
      });
    }

    await Promise.all(promises);
    setChecking(false);
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && username.trim() && !checking) {
      checkAll();
    }
  };

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case "available":
        return (
          <svg className="status-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case "taken":
        return (
          <svg className="status-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case "error":
        return (
          <svg className="status-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case "loading":
        return (
          <svg className="status-icon spinner" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  const getStatusLabel = (status: Status) => {
    switch (status) {
      case "available":
        return "Available";
      case "taken":
        return "Taken";
      case "error":
        return "Error";
      case "loading":
        return "Checking";
      default:
        return "";
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>Username Checker</h1>
          <p>Check username availability across multiple platforms</p>
        </header>

        <div className="search-section">
          <div className="search-box">
            <div className="input-wrapper">
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter a username..."
                disabled={checking}
              />
            </div>
            <button
              className="check-button"
              disabled={checking || !username.trim()}
              onClick={checkAll}
            >
              {checking ? "Checking..." : "Check Availability"}
            </button>
          </div>

          {totalChecked > 0 && (
            <div className="stats">
              <div className="stat-item">
                <div className="stat-value" style={{ color: "#4caf50" }}>{availableCount}</div>
                <div className="stat-label">Available</div>
              </div>
              <div className="stat-item">
                <div className="stat-value" style={{ color: "#f44336" }}>{takenCount}</div>
                <div className="stat-label">Taken</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{totalChecked}</div>
                <div className="stat-label">Total Checked</div>
              </div>
            </div>
          )}
        </div>

        {Object.keys(results).length === 0 ? (
          <div className="empty-state">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3>Ready to check?</h3>
            <p>Enter a username above to check availability across {platforms.length} platforms</p>
          </div>
        ) : (
          <div className="results-grid">
            {platforms.map(plat => {
              const result = results[plat.name] || { status: "idle" };
              return (
                <div
                  key={plat.name}
                  className={`platform-card ${result.status}`}
                >
                  <div className="platform-header">
                    <div className="platform-name">{plat.name}</div>
                    {result.status !== "idle" && (
                      <span className={`status-badge ${result.status}`}>
                        {getStatusIcon(result.status)}
                        {getStatusLabel(result.status)}
                      </span>
                    )}
                  </div>
                  {result.url && result.status !== "loading" && (
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="platform-url"
                      style={{ color: result.status === "available" ? "#4caf50" : "#666" }}
                    >
                      {result.url}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <footer className="footer">
          <p>
            Made with ❤️ by <a href="https://github.com/zedaes" target="_blank" rel="noopener noreferrer">zedaes</a>
          </p>
        </footer>
      </div>
    </div>
  );
}
