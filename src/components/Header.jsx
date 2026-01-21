import React from 'react'

function Header({ onShowStats, showingStats }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-chinese">中文</span>
          <h1>Daily Chinese</h1>
        </div>
        <p className="tagline">Learn a little Chinese every day</p>
        <button 
          className={`stats-toggle ${showingStats ? 'active' : ''}`}
          onClick={onShowStats}
        >
          {showingStats ? 'Back to Lesson' : 'View Progress'}
        </button>
      </div>
    </header>
  )
}

export default Header
