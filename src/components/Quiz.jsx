import React, { useState, useEffect, useRef } from 'react'
import { checkPinyinAnswer, checkMeaningAnswer } from '../hooks/useProgress'

function Quiz({ onExit, getItemsForReview, recordAnswer, getMasteryStatus, getSeenCount }) {
  const [quizItems, setQuizItems] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [quizComplete, setQuizComplete] = useState(false)
  const [results, setResults] = useState({ correct: 0, incorrect: 0, items: [] })
  const [questionTypes, setQuestionTypes] = useState([]) // 'pinyin' or 'meaning' for each item
  const inputRef = useRef(null)

  // Initialize quiz with items from SRS and assign question types
  useEffect(() => {
    const items = getItemsForReview(10, true, true)
    setQuizItems(items)
    
    // Assign question types based on mastery status
    // If user already got pinyin right, test meaning (and vice versa)
    // If neither or both, randomly pick
    const types = items.map(item => {
      const status = getMasteryStatus(item.id, item.isWord)
      
      if (status.pinyinCorrect && !status.meaningCorrect) {
        // Already got pinyin, now test meaning
        return 'meaning'
      } else if (!status.pinyinCorrect && status.meaningCorrect) {
        // Already got meaning, now test pinyin
        return 'pinyin'
      } else {
        // Neither or both - random pick (50/50)
        return Math.random() < 0.5 ? 'pinyin' : 'meaning'
      }
    })
    setQuestionTypes(types)
  }, [])

  // Focus input when moving to next question
  useEffect(() => {
    if (!showResult && !quizComplete && inputRef.current) {
      inputRef.current.focus()
    }
  }, [currentIndex, showResult, quizComplete])

  const currentItem = quizItems[currentIndex]
  const currentQuestionType = questionTypes[currentIndex]
  const currentMastery = currentItem ? getMasteryStatus(currentItem.id, currentItem.isWord) : null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!userAnswer.trim() || showResult) return

    let correct
    if (currentQuestionType === 'pinyin') {
      correct = checkPinyinAnswer(userAnswer, currentItem.pinyin)
    } else {
      correct = checkMeaningAnswer(userAnswer, currentItem.english)
    }
    
    setIsCorrect(correct)
    setShowResult(true)

    // Record the answer for SRS with question type
    recordAnswer(currentItem.id, currentItem.isWord, currentQuestionType, correct)

    // Track results
    setResults(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      incorrect: prev.incorrect + (correct ? 0 : 1),
      items: [...prev.items, { ...currentItem, userAnswer, correct, questionType: currentQuestionType }]
    }))
  }

  const handleNext = () => {
    if (currentIndex + 1 >= quizItems.length) {
      setQuizComplete(true)
    } else {
      setCurrentIndex(prev => prev + 1)
      setUserAnswer('')
      setShowResult(false)
      setIsCorrect(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && showResult) {
      handleNext()
    }
  }

  const restartQuiz = () => {
    const items = getItemsForReview(10, true, true)
    setQuizItems(items)
    
    const types = items.map(item => {
      const status = getMasteryStatus(item.id, item.isWord)
      if (status.pinyinCorrect && !status.meaningCorrect) {
        return 'meaning'
      } else if (!status.pinyinCorrect && status.meaningCorrect) {
        return 'pinyin'
      } else {
        return Math.random() < 0.5 ? 'pinyin' : 'meaning'
      }
    })
    setQuestionTypes(types)
    
    setCurrentIndex(0)
    setUserAnswer('')
    setShowResult(false)
    setIsCorrect(false)
    setQuizComplete(false)
    setResults({ correct: 0, incorrect: 0, items: [] })
  }

  if (quizItems.length === 0) {
    const seenCount = getSeenCount()
    
    // No items seen yet - user needs to complete a daily lesson first
    if (seenCount.total === 0) {
      return (
        <div className="quiz">
          <div className="quiz-empty">
            <h2>No Words to Quiz Yet!</h2>
            <p>Complete your daily lesson first to unlock the quiz.</p>
            <p className="quiz-empty-hint">
              The quiz only tests words you've already seen in your daily lessons.
            </p>
            <button className="quiz-btn primary" onClick={onExit}>
              Go to Today's Lesson
            </button>
          </div>
        </div>
      )
    }
    
    // Items exist but still loading
    return (
      <div className="quiz">
        <div className="quiz-loading">Loading quiz...</div>
      </div>
    )
  }

  if (quizComplete) {
    const percentage = Math.round((results.correct / quizItems.length) * 100)
    const incorrectItems = results.items.filter(item => !item.correct)

    return (
      <div className="quiz">
        <div className="quiz-results">
          <h2>Quiz Complete!</h2>
          
          <div className="results-score">
            <div className="score-circle" data-percentage={percentage}>
              <span className="score-number">{percentage}%</span>
            </div>
            <p className="score-text">
              {results.correct} of {quizItems.length} correct
            </p>
          </div>

          <div className="results-message">
            {percentage === 100 && <p className="perfect">Perfect score! You're doing great!</p>}
            {percentage >= 80 && percentage < 100 && <p className="great">Great job! Keep practicing!</p>}
            {percentage >= 60 && percentage < 80 && <p className="good">Good effort! Review the words below.</p>}
            {percentage < 60 && <p className="needs-work">Keep practicing! These words will come up more often.</p>}
          </div>

          {incorrectItems.length > 0 && (
            <div className="review-section">
              <h3>Words to Review</h3>
              <div className="review-list">
                {incorrectItems.map((item, idx) => (
                  <div key={idx} className="review-item">
                    <span className="review-chinese">{item.chinese}</span>
                    <span className="review-pinyin">{item.pinyin}</span>
                    <span className="review-english">{item.english}</span>
                    <span className="review-type">({item.questionType})</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="results-actions">
            <button className="quiz-btn primary" onClick={restartQuiz}>
              Quiz Again
            </button>
            <button className="quiz-btn secondary" onClick={onExit}>
              Back to Lesson
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz" onKeyDown={handleKeyDown}>
      <div className="quiz-header">
        <h2>Quiz Time</h2>
        <div className="quiz-progress">
          <span>{currentIndex + 1} of {quizItems.length}</span>
          <div className="progress-dots">
            {quizItems.map((_, idx) => (
              <span 
                key={idx} 
                className={`dot ${idx < currentIndex ? 'completed' : ''} ${idx === currentIndex ? 'current' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="quiz-card">
        <div className="quiz-chinese">
          {currentItem.chinese}
        </div>

        <div className="quiz-question-type">
          {currentQuestionType === 'pinyin' ? (
            <p className={`quiz-instruction ${currentQuestionType === 'pinyin' ? 'quiz-instruction-pinyin' : ''}`}>
              Type the <strong>pinyin</strong>
              <span className="instruction-hint">(use numbers for tones: ni3 hao3)</span>
            </p>
          ) : (
            <p className="quiz-instruction">
              Type the <strong>English meaning</strong>
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="quiz-form">
          <input
            ref={inputRef}
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder={currentQuestionType === 'pinyin' ? 'e.g., ni3 hao3' : 'English meaning...'}
            disabled={showResult}
            className={`quiz-input ${showResult ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
            autoComplete="off"
            autoCapitalize="off"
          />
          
          {!showResult && (
            <button type="submit" className="quiz-btn submit" disabled={!userAnswer.trim()}>
              Check
            </button>
          )}
        </form>

        {showResult && (
          <div className={`quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? (
              <div className="feedback-correct">
                <span className="feedback-icon">✓</span>
                <span>Correct!</span>
                {/* Check if word is now fully learned */}
                {(() => {
                  const newStatus = getMasteryStatus(currentItem.id, currentItem.isWord)
                  if (newStatus.pinyinCorrect && newStatus.meaningCorrect) {
                    return <span className="fully-learned">Word mastered!</span>
                  }
                  return null
                })()}
              </div>
            ) : (
              <div className="feedback-incorrect">
                <span className="feedback-icon">✗</span>
                <div className="feedback-answer">
                  <p>The correct {currentQuestionType === 'pinyin' ? 'pinyin' : 'meaning'}:</p>
                  {currentQuestionType === 'pinyin' ? (
                    <p className="correct-pinyin">{currentItem.pinyin}</p>
                  ) : (
                    <p className="correct-english">{currentItem.english}</p>
                  )}
                </div>
              </div>
            )}
            <button className="quiz-btn next" onClick={handleNext}>
              {currentIndex + 1 >= quizItems.length ? 'See Results' : 'Next'}
            </button>
          </div>
        )}
      </div>

      <button className="quiz-exit" onClick={onExit}>
        Exit Quiz
      </button>
    </div>
  )
}

export default Quiz
