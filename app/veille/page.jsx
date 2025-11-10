'use client';
import { useState } from 'react';

export default function VeillePage() {
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keyword }),
    });

    const data = await res.json();
    setResult(data.result);
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial', color: '#000' }}>
      <h1 style={{ color: '#000' }}>Créer une veille avec l'IA</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tape un mot-clé ex: cybersécurité"
          style={{
            width: '300px',
            padding: '10px',
            marginBottom: '20px',
            color: '#000',
          }}
        />
        <button
          type="submit"
          style={{
            marginLeft: '10px',
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Lancer
        </button>
      </form>

      {result && (
        <div style={{ marginTop: '30px' }}>
          <h2 style={{ color: '#000' }}>Résultat de la veille :</h2>
          <pre style={{ color: '#000' }}>{result}</pre>
        </div>
      )}
    </div>
  );
}
