import React, { useState, useEffect, useRef, useCallback } from 'react'
import vocabulary from '../data/vocabulary'
import phrases from '../data/phrases'
import { getDayNumber, checkPinyinAnswer, checkMeaningAnswer } from '../hooks/useProgress'

function DailyLesson({ 
  markItemsSeen,
  recordAnswer
}) {
  const dayNumber = getDayNumber()
  const inputRef = useRef(null)

  // Select today's content: 3 words spread across the full HSK1 list (mixed categories)
  const wordsPerDay = 3
  const L = vocabulary.length
  let i0 = (dayNumber * 3) % L
  let i1 = (dayNumber * 37 + 17) % L
  let i2 = (dayNumber * 71 + 31) % L
  // Ensure three distinct indices (nudge if any duplicate)
  while (i1 === i0) { i1 = (i1 + 1) % L }
  while (i2 === i0 || i2 === i1) { i2 = (i2 + 1) % L }
  const todaysWords = [vocabulary[i0], vocabulary[i1], vocabulary[i2]]
  
  const phraseIndex = dayNumber % phrases.length
  const todaysPhrase = phrases[phraseIndex]

  // Initialize lesson items with quiz state
  const initializeLessonItems = () => {
    const allItems = [
      ...todaysWords.map(w => ({ ...w, isWord: true })),
      { ...todaysPhrase, isWord: false }
    ]
    
    return allItems.map(item => ({
      item,
      quizOrder: Math.random() < 0.5 ? 'meaning-first' : 'reading-first',
      meaningPassed: false,
      readingPassed: false,
    }))
  }

  const [lessonItems, setLessonItems] = useState([])
  const [quizQueue, setQuizQueue] = useState([])
  const [currentQueueIndex, setCurrentQueueIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [lessonComplete, setLessonComplete] = useState(false)

  // Initialize lesson on mount
  useEffect(() => {
    const items = initializeLessonItems()
    setLessonItems(items)
    setQuizQueue(items.map((_, idx) => idx))
    setCurrentQueueIndex(0)
    
    // Mark items as seen
    const wordIds = todaysWords.map(w => w.id)
    const phraseIds = [todaysPhrase.id]
    markItemsSeen(wordIds, phraseIds)
  }, [dayNumber])

  // Focus input when moving to next question
  useEffect(() => {
    if (!showResult && !lessonComplete && inputRef.current) {
      inputRef.current.focus()
    }
  }, [currentQueueIndex, showResult, lessonComplete])

  // Get current item being quizzed
  const getCurrentItem = () => {
    if (quizQueue.length === 0 || currentQueueIndex >= quizQueue.length) return null
    const itemIndex = quizQueue[currentQueueIndex]
    if (itemIndex === undefined || !lessonItems[itemIndex]) return null
    return lessonItems[itemIndex]
  }

  // Determine which aspect to quiz for current item
  const getCurrentAspect = () => {
    const current = getCurrentItem()
    if (!current) return null

    const { quizOrder, meaningPassed, readingPassed } = current

    // If both passed, this shouldn't happen (item should be removed from queue)
    if (meaningPassed && readingPassed) return null

    // Determine which aspect to quiz based on order and what's passed
    if (quizOrder === 'meaning-first') {
      return meaningPassed ? 'reading' : 'meaning'
    } else {
      return readingPassed ? 'meaning' : 'reading'
    }
  }

  const currentItem = getCurrentItem()
  const currentAspect = getCurrentAspect()

  // Check if lesson is complete (all items passed both tests)
  const checkLessonComplete = () => {
    return lessonItems.every(item => item.meaningPassed && item.readingPassed)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!userAnswer.trim() || showResult || !currentItem || !currentAspect) return

    const item = currentItem.item
    let correct = false

    if (currentAspect === 'reading') {
      correct = checkPinyinAnswer(userAnswer, item.pinyin)
    } else {
      correct = checkMeaningAnswer(userAnswer, item.english)
    }

    setIsCorrect(correct)
    setShowResult(true)

    // Record the answer
    recordAnswer(item.id, item.isWord, currentAspect === 'reading' ? 'pinyin' : 'meaning', correct)

    // Update lesson item state
    setLessonItems(prev => {
      const newItems = [...prev]
      const itemIndex = quizQueue[currentQueueIndex]
      const updatedItem = { ...newItems[itemIndex] }

      if (correct) {
        if (currentAspect === 'reading') {
          updatedItem.readingPassed = true
        } else {
          updatedItem.meaningPassed = true
        }
      }

      newItems[itemIndex] = updatedItem
      return newItems
    })
  }

  const handleNext = () => {
    // Save the current result before resetting
    const wasCorrect = isCorrect
    
    // Reset UI state
    setUserAnswer('')
    setShowResult(false)
    setIsCorrect(false)

    // Read current state values
    const currentIdx = currentQueueIndex
    const currentQueue = quizQueue
    const currentItems = lessonItems

    // Get current item index from queue
    if (currentQueue.length === 0 || currentIdx >= currentQueue.length) {
      return
    }

    const itemIndex = currentQueue[currentIdx]
    const currentItem = currentItems[itemIndex]
    
    if (!currentItem) {
      return
    }

    // Check current state of the item
    const bothPassed = currentItem.meaningPassed && currentItem.readingPassed

    // Update queue based on result
    if (wasCorrect && bothPassed) {
      // Both aspects passed - remove from queue
      const newQueue = currentQueue.filter((_, idx) => idx !== currentIdx)
      const newQueueLength = newQueue.length
      
      setQuizQueue(newQueue)
      
      // Adjust index to stay within bounds
      if (newQueueLength === 0) {
        setCurrentQueueIndex(0)
      } else {
        const adjustedIdx = currentIdx >= newQueueLength ? 0 : currentIdx
        setCurrentQueueIndex(adjustedIdx)
      }
    } else if (wasCorrect) {
      // Correct but not both passed - continue with same item (will quiz other aspect)
      // Don't change index - stay on same item, getCurrentAspect will return the other aspect
      // No state updates needed
    } else {
      // Incorrect - add item back to end of queue for re-quiz
      const newQueue = [...currentQueue]
      // Remove current occurrence
      newQueue.splice(currentIdx, 1)
      // Add to end
      newQueue.push(itemIndex)
      
      setQuizQueue(newQueue)
      
      // Adjust index - if we removed the last item, go to 0, otherwise stay at same index
      const adjustedIdx = currentIdx >= currentQueue.length - 1 ? 0 : currentIdx
      setCurrentQueueIndex(adjustedIdx)
    }
  }

  // Check completion when queue or items change (empty queue = all items removed = complete)
  useEffect(() => {
    if (quizQueue.length === 0 && lessonItems.length > 0) {
      setLessonComplete(true)
    }
  }, [quizQueue, lessonItems])

  // Sync queue when current item has both passed but was not removed (stale state in handleNext)
  useEffect(() => {
    if (quizQueue.length === 0 || currentQueueIndex >= quizQueue.length) return
    const itemIndex = quizQueue[currentQueueIndex]
    const currentItem = lessonItems[itemIndex]
    if (!currentItem || !(currentItem.meaningPassed && currentItem.readingPassed)) return
    const newQueue = quizQueue.filter((_, idx) => idx !== currentQueueIndex)
    setQuizQueue(newQueue)
    if (newQueue.length === 0) {
      setLessonComplete(true)
      setCurrentQueueIndex(0)
    } else {
      setCurrentQueueIndex(prev => (prev >= newQueue.length ? 0 : prev))
    }
  }, [lessonItems, quizQueue, currentQueueIndex])

  // Document-level Enter key listener when result is shown
  useEffect(() => {
    if (!showResult) return

    const handleEnterKey = (e) => {
      if (e.key === 'Enter' && showResult) {
        e.preventDefault()
        handleNext()
      }
    }

    document.addEventListener('keydown', handleEnterKey)
    return () => {
      document.removeEventListener('keydown', handleEnterKey)
    }
  }, [showResult, handleNext])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && showResult) {
      handleNext()
    }
  }

  // Format today's date
  const today = new Date()
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  const formattedDate = today.toLocaleDateString('en-US', dateOptions)

  // Calculate progress
  const completedItems = lessonItems.filter(item => item.meaningPassed && item.readingPassed).length
  const totalItems = lessonItems.length

  // Show completion screen
  if (lessonComplete) {
    return (
      <div className="daily-lesson">
        <div className="lesson-header">
          <h2>Lesson Complete!</h2>
          <p className="date">{formattedDate}</p>
        </div>
        
        <div className="quiz-results">
          <div className="results-score">
            <div className="score-circle" data-percentage={100}>
              <span className="score-number">100%</span>
            </div>
            <p className="score-text">
              All {totalItems} items mastered!
            </p>
          </div>

          <div className="results-message">
            <p className="perfect">Excellent work! You've completed today's lesson.</p>
          </div>

          <div className="results-actions">
            <button 
              className="quiz-btn primary" 
              onClick={() => window.location.reload()}
            >
              Review Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Show quiz interface
  if (!currentItem || !currentAspect) {
    // If we have items but no current item, there might be a state issue
    if (lessonItems.length > 0 && quizQueue.length === 0) {
      // Queue is empty but we have items - lesson might be complete
      const allComplete = lessonItems.every(item => item.meaningPassed && item.readingPassed)
      if (allComplete) {
        setLessonComplete(true)
      }
    }
    
    return (
      <div className="daily-lesson">
        <div className="quiz-loading">Loading lesson...</div>
        {lessonItems.length === 0 && (
          <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
            Initializing lesson...
          </p>
        )}
      </div>
    )
  }

  const item = currentItem.item
  const isAskingReading = currentAspect === 'reading'
  const progressText = `${completedItems} of ${totalItems} items completed`

  return (
    <div className="daily-lesson" onKeyDown={handleKeyDown}>
      <div className="lesson-header">
        <h2>Today's Lesson</h2>
        <p className="date">{formattedDate}</p>
      </div>

      <div className="quiz-progress" style={{ marginBottom: '20px' }}>
        <span>{progressText}</span>
        <div className="progress-dots">
          {lessonItems.map((lessonItem, idx) => {
            const isComplete = lessonItem.meaningPassed && lessonItem.readingPassed
            const isCurrent = quizQueue.length > 0 && currentQueueIndex < quizQueue.length && quizQueue[currentQueueIndex] === idx
            return (
              <span 
                key={idx} 
                className={`dot ${isComplete ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
              />
            )
          })}
        </div>
      </div>

      <div className="quiz-card">
        <div className="quiz-chinese">
          {item.chinese}
        </div>

        <div className="quiz-question-type">
          {isAskingReading ? (
            <p className={`quiz-instruction ${isAskingReading ? 'quiz-instruction-pinyin' : ''}`}>
              Type the <strong>reading (pinyin)</strong>
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
            placeholder={isAskingReading ? 'e.g., ni3 hao3' : 'English meaning...'}
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
                {(() => {
                  if (quizQueue.length > 0 && currentQueueIndex < quizQueue.length) {
                    const updatedItem = lessonItems[quizQueue[currentQueueIndex]]
                    if (updatedItem && updatedItem.meaningPassed && updatedItem.readingPassed) {
                      return <span className="fully-learned">Item mastered!</span>
                    }
                  }
                  return null
                })()}
              </div>
            ) : (
              <div className="feedback-incorrect">
                <span className="feedback-icon">✗</span>
                <div className="feedback-answer">
                  <p>The correct {isAskingReading ? 'reading' : 'meaning'}:</p>
                  {isAskingReading ? (
                    <p className="correct-pinyin">{item.pinyin}</p>
                  ) : (
                    <p className="correct-english">{item.english}</p>
                  )}
                </div>
              </div>
            )}
            <button className="quiz-btn next" onClick={handleNext}>
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default DailyLesson
