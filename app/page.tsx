'use client';

import { useState } from 'react';

export default function Home() {
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword }),
      });

      const data = await res.json();
      setResult(data.result);
    } catch (error) {
      setResult("Erreur lors de la génération de la veille.");
    }
    setLoading(false);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '4rem',
      fontFamily: 'Arial, sans-serif',
      background: '#f4f4f4',
      minHeight: '100vh'
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '600px'
      }}>
        <h1 style={{ marginBottom: '1rem', textAlign: 'center', color: '#333' }}>
          🔍 Génère une veille avec l'IA
        </h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem' }}>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Mot-clé (ex: cybersécurité)"
            required
            style={{
              flex: 1,
              padding: '0.8rem',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '1px solid #ccc'
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '0.8rem 1.5rem',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background 0.3s'
            }}
          >
            {loading ? '⏳...' : 'Lancer'}
          </button>
        </form>

        {result && (
          <div style={{
            marginTop: '2rem',
            background: '#f9f9f9',
            padding: '1rem',
            borderRadius: '8px',
            whiteSpace: 'pre-wrap'
          }}>
            <h2 style={{ color: '#0070f3' }}>🧠 Résultat de la veille :</h2>
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
