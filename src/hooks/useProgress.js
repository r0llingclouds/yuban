import { useState, useEffect } from 'react'

const STORAGE_KEY = 'daily-chinese-progress'

// Get today's date as a string (YYYY-MM-DD)
const getToday = () => {
  return new Date().toISOString().split('T')[0]
}

// Get the day number since a fixed epoch (for deterministic daily content)
export const getDayNumber = () => {
  const epoch = new Date('2024-01-01')
  const today = new Date()
  const diffTime = today - epoch
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

const getDefaultProgress = () => ({
  learnedWords: [],      // Array of word IDs
  learnedPhrases: [],    // Array of phrase IDs
  daysActive: [],        // Array of dates (YYYY-MM-DD)
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: null,
})

export function useProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (e) {
      console.error('Error loading progress:', e)
    }
    return getDefaultProgress()
  })

  // Save to localStorage whenever progress changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    } catch (e) {
      console.error('Error saving progress:', e)
    }
  }, [progress])

  // Update streak on mount and when visiting
  useEffect(() => {
    const today = getToday()
    
    if (progress.lastActiveDate !== today) {
      setProgress(prev => {
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const yesterdayStr = yesterday.toISOString().split('T')[0]
        
        let newStreak = prev.currentStreak
        
        if (prev.lastActiveDate === yesterdayStr) {
          // Continuing streak
          newStreak = prev.currentStreak + 1
        } else if (prev.lastActiveDate !== today) {
          // Streak broken, start new
          newStreak = 1
        }
        
        const newDaysActive = prev.daysActive.includes(today) 
          ? prev.daysActive 
          : [...prev.daysActive, today]
        
        return {
          ...prev,
          lastActiveDate: today,
          daysActive: newDaysActive,
          currentStreak: newStreak,
          longestStreak: Math.max(prev.longestStreak, newStreak),
        }
      })
    }
  }, [])

  const markWordLearned = (wordId) => {
    setProgress(prev => {
      if (prev.learnedWords.includes(wordId)) {
        return prev
      }
      return {
        ...prev,
        learnedWords: [...prev.learnedWords, wordId],
      }
    })
  }

  const markPhraseLearned = (phraseId) => {
    setProgress(prev => {
      if (prev.learnedPhrases.includes(phraseId)) {
        return prev
      }
      return {
        ...prev,
        learnedPhrases: [...prev.learnedPhrases, phraseId],
      }
    })
  }

  const isWordLearned = (wordId) => progress.learnedWords.includes(wordId)
  const isPhraseLearned = (phraseId) => progress.learnedPhrases.includes(phraseId)

  const stats = {
    totalWordsLearned: progress.learnedWords.length,
    totalPhrasesLearned: progress.learnedPhrases.length,
    totalLearned: progress.learnedWords.length + progress.learnedPhrases.length,
    daysActive: progress.daysActive.length,
    currentStreak: progress.currentStreak,
    longestStreak: progress.longestStreak,
  }

  const resetProgress = () => {
    setProgress(getDefaultProgress())
  }

  return {
    progress,
    stats,
    markWordLearned,
    markPhraseLearned,
    isWordLearned,
    isPhraseLearned,
    resetProgress,
  }
}

export default useProgress
