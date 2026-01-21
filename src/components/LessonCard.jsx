import React, { useState } from 'react'

function LessonCard({ item, type, isLearned, onMarkLearned }) {
  const [showMeaning, setShowMeaning] = useState(false)

  return (
    <div className={`lesson-card ${isLearned ? 'learned' : ''}`}>
      <div className="card-type">
        {type === 'word' ? 'Vocabulary' : 'Phrase'}
        {item.category && <span className="category">{item.category}</span>}
      </div>
      
      <div className="chinese-text">
        {item.chinese}
      </div>
      
      <div className="pinyin">
        {item.pinyin}
      </div>
      
      <div className="meaning-section">
        {showMeaning ? (
          <div className="english">
            {item.english}
          </div>
        ) : (
          <button 
            className="reveal-btn"
            onClick={() => setShowMeaning(true)}
          >
            Reveal Meaning
          </button>
        )}
      </div>
      
      <div className="card-actions">
        {isLearned ? (
          <div className="learned-badge">
            <span className="check">✓</span> Learned
          </div>
        ) : (
          <button 
            className="learn-btn"
            onClick={onMarkLearned}
            disabled={!showMeaning}
          >
            Mark as Learned
          </button>
        )}
      </div>
    </div>
  )
}

export default LessonCard
