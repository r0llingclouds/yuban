import React from 'react'

function Header({ currentView, onViewChange }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-chinese">中文</span>
          <h1>Daily Chinese</h1>
        </div>
        <p className="tagline">Learn a little Chinese every day</p>
        <div className="header-buttons">
          <button 
            className={`header-btn ${currentView === 'quiz' ? 'active' : ''}`}
            onClick={() => onViewChange(currentView === 'quiz' ? 'lesson' : 'quiz')}
          >
            {currentView === 'quiz' ? 'Back to Lesson' : 'Start Quiz'}
          </button>
          <button 
            className={`header-btn ${currentView === 'stats' ? 'active' : ''}`}
            onClick={() => onViewChange(currentView === 'stats' ? 'lesson' : 'stats')}
          >
            {currentView === 'stats' ? 'Back to Lesson' : 'View Progress'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
