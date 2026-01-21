import React from 'react'
import vocabulary from '../data/vocabulary'
import phrases from '../data/phrases'

function ProgressStats({ stats, onReset }) {
  const totalWords = vocabulary.length
  const totalPhrases = phrases.length
  const totalContent = totalWords + totalPhrases
  
  const wordsProgress = (stats.totalWordsLearned / totalWords) * 100
  const phrasesProgress = (stats.totalPhrasesLearned / totalPhrases) * 100
  const overallProgress = (stats.totalLearned / totalContent) * 100

  return (
    <div className="progress-stats">
      <h2>Your Progress</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.totalLearned}</div>
          <div className="stat-label">Total Learned</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{stats.currentStreak}</div>
          <div className="stat-label">Day Streak</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{stats.daysActive}</div>
          <div className="stat-label">Days Active</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{stats.longestStreak}</div>
          <div className="stat-label">Best Streak</div>
        </div>
      </div>
      
      <div className="progress-section">
        <h3>Vocabulary Progress</h3>
        <div className="progress-bar-container">
          <div 
            className="progress-bar" 
            style={{ width: `${wordsProgress}%` }}
          />
        </div>
        <p className="progress-text">
          {stats.totalWordsLearned} of {totalWords} words ({wordsProgress.toFixed(1)}%)
        </p>
      </div>
      
      <div className="progress-section">
        <h3>Phrases Progress</h3>
        <div className="progress-bar-container">
          <div 
            className="progress-bar phrases" 
            style={{ width: `${phrasesProgress}%` }}
          />
        </div>
        <p className="progress-text">
          {stats.totalPhrasesLearned} of {totalPhrases} phrases ({phrasesProgress.toFixed(1)}%)
        </p>
      </div>
      
      <div className="progress-section">
        <h3>Overall Mastery</h3>
        <div className="progress-bar-container large">
          <div 
            className="progress-bar overall" 
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <p className="progress-text">
          {overallProgress.toFixed(1)}% complete
        </p>
      </div>
      
      <div className="reset-section">
        <button 
          className="reset-btn"
          onClick={() => {
            if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
              onReset()
            }
          }}
        >
          Reset Progress
        </button>
      </div>
    </div>
  )
}

export default ProgressStats
