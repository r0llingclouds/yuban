import React, { useState } from 'react'
import Header from './components/Header'
import DailyLesson from './components/DailyLesson'
import ProgressStats from './components/ProgressStats'
import Quiz from './components/Quiz'
import useProgress from './hooks/useProgress'

function App() {
  const [currentView, setCurrentView] = useState('lesson') // 'lesson', 'stats', 'quiz'
  const {
    stats,
    markWordLearned,
    markPhraseLearned,
    isWordLearned,
    isPhraseLearned,
    resetProgress,
    markItemsSeen,
    getSeenCount,
    recordAnswer,
    getItemsForReview,
    getMasteryStatus,
  } = useProgress()

  const renderView = () => {
    switch (currentView) {
      case 'stats':
        return (
          <ProgressStats 
            stats={stats}
            onReset={resetProgress}
          />
        )
      case 'quiz':
        return (
          <Quiz
            onExit={() => setCurrentView('lesson')}
            getItemsForReview={getItemsForReview}
            recordAnswer={recordAnswer}
            getMasteryStatus={getMasteryStatus}
            getSeenCount={getSeenCount}
          />
        )
      default:
        return (
          <DailyLesson
            markItemsSeen={markItemsSeen}
            recordAnswer={recordAnswer}
          />
        )
    }
  }

  return (
    <div className="app">
      <Header 
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      {renderView()}
    </div>
  )
}

export default App
