import { useEffect, useState } from 'react';

export default function App() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function recommend() {
    setLoading(true);
    const res = await fetch(
      'http://localhost:4000/content-items/recommend?mood=ANXIOUS&energy=LOW&duration=15'
    );
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }

  return (
    <div style={{ padding: 40, fontFamily: 'system-ui' }}>
      <h1>🌙 Mood Media Engine</h1>

      <button onClick={recommend} style={{ padding: 10 }}>
        Get Recommendations
      </button>

      {loading && <p>Thinking…</p>}

      <div style={{ marginTop: 20 }}>
        {items.map(item => (
          <div
            key={item.id}
            style={{
              padding: 16,
              marginBottom: 12,
              borderRadius: 8,
              background: '#f5f5f5',
            }}
          >
            <h3>{item.title}</h3>
            <strong>Score: {item.score}</strong>

            <ul>
              {item.reasons.map((r: string) => (
                <li key={r}>✓ {r}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
