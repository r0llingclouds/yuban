import React, { useState, useEffect } from 'react'

function Study({ onExit, onStartQuiz, getItemsForReview, getSeenCount }) {
  const [studyItems, setStudyItems] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const items = getItemsForReview(50, true, true)
    setStudyItems(items)
    setCurrentIndex(0)
  }, [getItemsForReview])

  const seenCount = getSeenCount()

  if (seenCount.total === 0) {
    return (
      <div className="study">
        <div className="study-empty quiz-empty">
          <h2>No Words to Study Yet!</h2>
          <p>Complete your daily lesson first to unlock study.</p>
          <p className="quiz-empty-hint">
            Study shows the reading and meaning of words you&apos;ve already seen in your daily lessons.
          </p>
          <button className="quiz-btn primary" onClick={onExit}>
            Go to Today&apos;s Lesson
          </button>
        </div>
      </div>
    )
  }

  if (studyItems.length === 0) {
    return (
      <div className="study">
        <div className="quiz-loading">Loading study...</div>
      </div>
    )
  }

  const currentItem = studyItems[currentIndex]
  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < studyItems.length - 1

  const handlePrev = () => {
    if (canGoPrev) setCurrentIndex((i) => i - 1)
  }

  const handleNext = () => {
    if (canGoNext) setCurrentIndex((i) => i + 1)
  }

  return (
    <div className="study">
      <div className="study-header quiz-header">
        <h2>Study</h2>
        <div className="quiz-progress study-progress">
          <span>{currentIndex + 1} of {studyItems.length}</span>
          <div className="progress-dots">
            {studyItems.map((_, idx) => (
              <span
                key={idx}
                className={`dot ${idx < currentIndex ? 'completed' : ''} ${idx === currentIndex ? 'current' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="quiz-card study-card">
        <div className="quiz-chinese study-chinese">
          {currentItem.chinese}
        </div>
        <div className="study-reading">
          <span className="study-label">Reading (pinyin)</span>
          <p className="study-pinyin">{currentItem.pinyin}</p>
        </div>
        <div className="study-meaning">
          <span className="study-label">Meaning</span>
          <p className="study-english">{currentItem.english}</p>
        </div>
      </div>

      <div className="study-nav">
        <button
          type="button"
          className="quiz-btn secondary"
          onClick={handlePrev}
          disabled={!canGoPrev}
        >
          Previous
        </button>
        <button
          type="button"
          className="quiz-btn secondary"
          onClick={handleNext}
          disabled={!canGoNext}
        >
          Next
        </button>
      </div>

      <div className="study-actions">
        <button className="quiz-btn primary" onClick={onStartQuiz}>
          Start Quiz
        </button>
        <button className="quiz-btn secondary" onClick={onExit}>
          Back to Lesson
        </button>
      </div>
    </div>
  )
}

export default Study
