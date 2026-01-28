import React from 'react'

function Header({ currentView, onViewChange }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-chinese">语伴</span>
          <h1>Yǔbàn</h1>
        </div>
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
