import React, { useEffect } from 'react'
import LessonCard from './LessonCard'
import vocabulary from '../data/vocabulary'
import phrases from '../data/phrases'
import { getDayNumber } from '../hooks/useProgress'

function DailyLesson({ 
  isWordLearned, 
  isPhraseLearned, 
  markWordLearned, 
  markPhraseLearned,
  markItemsSeen 
}) {
  // Get today's content based on the day number
  const dayNumber = getDayNumber()
  
  // Select 3 words deterministically based on day
  const wordsPerDay = 3
  const wordStartIndex = (dayNumber * wordsPerDay) % vocabulary.length
  const todaysWords = []
  for (let i = 0; i < wordsPerDay; i++) {
    const index = (wordStartIndex + i) % vocabulary.length
    todaysWords.push(vocabulary[index])
  }
  
  // Select 1 phrase deterministically based on day
  const phraseIndex = dayNumber % phrases.length
  const todaysPhrase = phrases[phraseIndex]
  
  // Mark today's items as seen when the lesson loads
  useEffect(() => {
    const wordIds = todaysWords.map(w => w.id)
    const phraseIds = [todaysPhrase.id]
    markItemsSeen(wordIds, phraseIds)
  }, [dayNumber]) // Only re-run if day changes
  
  // Format today's date nicely
  const today = new Date()
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  const formattedDate = today.toLocaleDateString('en-US', dateOptions)

  return (
    <div className="daily-lesson">
      <div className="lesson-header">
        <h2>Today's Lesson</h2>
        <p className="date">{formattedDate}</p>
      </div>
      
      <div className="lesson-section">
        <h3>New Vocabulary</h3>
        <div className="cards-grid">
          {todaysWords.map(word => (
            <LessonCard
              key={word.id}
              item={word}
              type="word"
              isLearned={isWordLearned(word.id)}
              onMarkLearned={() => markWordLearned(word.id)}
            />
          ))}
        </div>
      </div>
      
      <div className="lesson-section">
        <h3>Phrase of the Day</h3>
        <div className="cards-grid single">
          <LessonCard
            item={todaysPhrase}
            type="phrase"
            isLearned={isPhraseLearned(todaysPhrase.id)}
            onMarkLearned={() => markPhraseLearned(todaysPhrase.id)}
          />
        </div>
      </div>
      
      <div className="lesson-tip">
        <strong>Tip:</strong> Try to use these words and phrases throughout your day 
        to help remember them!
      </div>
    </div>
  )
}

export default DailyLesson
