import React, { useState } from 'react'
import Header from './components/Header'
import DailyLesson from './components/DailyLesson'
import ProgressStats from './components/ProgressStats'
import useProgress from './hooks/useProgress'

function App() {
  const [showStats, setShowStats] = useState(false)
  const {
    stats,
    markWordLearned,
    markPhraseLearned,
    isWordLearned,
    isPhraseLearned,
    resetProgress,
  } = useProgress()

  return (
    <div className="app">
      <Header 
        onShowStats={() => setShowStats(!showStats)}
        showingStats={showStats}
      />
      
      {showStats ? (
        <ProgressStats 
          stats={stats}
          onReset={resetProgress}
        />
      ) : (
        <DailyLesson
          isWordLearned={isWordLearned}
          isPhraseLearned={isPhraseLearned}
          markWordLearned={markWordLearned}
          markPhraseLearned={markPhraseLearned}
        />
      )}
    </div>
  )
}

export default App
