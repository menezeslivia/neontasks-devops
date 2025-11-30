import React from 'react';

function Header({ temaEscuro, toggleTema }) {
  return (
    <header>
      <h1>NEON PLANNER</h1>
      <p>Vamos organizar sua rotina?</p>
      <button onClick={toggleTema} className="theme-toggle" aria-label="Alternar tema">
        {temaEscuro ? '☀️' : '🌙'}
      </button>
    </header>
  );
}

export default React.memo(Header);
