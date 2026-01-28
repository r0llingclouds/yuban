import { useState, useEffect } from 'react'
import vocabulary from '../data/vocabulary'
import phrases from '../data/phrases'

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

// Default SRS stats for a new word
const getDefaultWordStats = () => ({
  interval: 1,           // Days until next review
  easeFactor: 2.5,       // How easy this word is (SM-2 algorithm)
  nextReview: getToday(), // When to review next
  correctCount: 0,
  incorrectCount: 0,
  lastReviewed: null,
  // Dual tracking for pinyin and meaning
  pinyinCorrect: false,   // Has user gotten pinyin right?
  meaningCorrect: false,  // Has user gotten meaning right?
})

const getDefaultProgress = () => ({
  learnedWords: [],      // Array of word IDs
  learnedPhrases: [],    // Array of phrase IDs
  seenWords: [],         // Word IDs that have appeared in daily lessons
  seenPhrases: [],       // Phrase IDs that have appeared in daily lessons
  daysActive: [],        // Array of dates (YYYY-MM-DD)
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: null,
  wordStats: {},         // SRS stats for each word: { [wordId]: { interval, easeFactor, ... } }
  phraseStats: {},       // SRS stats for each phrase
})

// Tone number to pinyin tone mark conversion
// Maps vowel + tone number to accented vowel
const toneMap = {
  'a1': 'ā', 'a2': 'á', 'a3': 'ǎ', 'a4': 'à',
  'e1': 'ē', 'e2': 'é', 'e3': 'ě', 'e4': 'è',
  'i1': 'ī', 'i2': 'í', 'i3': 'ǐ', 'i4': 'ì',
  'o1': 'ō', 'o2': 'ó', 'o3': 'ǒ', 'o4': 'ò',
  'u1': 'ū', 'u2': 'ú', 'u3': 'ǔ', 'u4': 'ù',
  'v1': 'ǖ', 'v2': 'ǘ', 'v3': 'ǚ', 'v4': 'ǜ',
  'ü1': 'ǖ', 'ü2': 'ǘ', 'ü3': 'ǚ', 'ü4': 'ǜ',
}

// Convert tone numbers to tone marks (e.g., "ni3 hao3" -> "nǐ hǎo")
const convertToneNumbers = (input) => {
  let result = input.toLowerCase().trim()
  
  // Replace v or u: with ü for convenience
  result = result.replace(/v/g, 'ü').replace(/u:/g, 'ü')
  
  // Find syllables with tone numbers and convert them
  // Pattern: sequence of letters followed by a tone number (1-4)
  // The tone mark goes on the main vowel according to pinyin rules:
  // 1. If there's an 'a' or 'e', it takes the tone
  // 2. If there's 'ou', the 'o' takes the tone
  // 3. Otherwise, the last vowel takes the tone
  
  const syllablePattern = /([a-züāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]+)([1-4])/gi
  
  result = result.replace(syllablePattern, (match, syllable, tone) => {
    const vowels = ['a', 'e', 'i', 'o', 'u', 'ü']
    const syllableLower = syllable.toLowerCase()
    
    // Rule 1: 'a' or 'e' takes the tone
    if (syllableLower.includes('a')) {
      return syllable.replace(/a/i, toneMap['a' + tone] || 'a')
    }
    if (syllableLower.includes('e')) {
      return syllable.replace(/e/i, toneMap['e' + tone] || 'e')
    }
    
    // Rule 2: 'ou' - 'o' takes the tone
    if (syllableLower.includes('ou')) {
      return syllable.replace(/o/i, toneMap['o' + tone] || 'o')
    }
    
    // Rule 3: last vowel takes the tone
    let lastVowelIndex = -1
    let lastVowel = ''
    for (let i = syllableLower.length - 1; i >= 0; i--) {
      if (vowels.includes(syllableLower[i])) {
        lastVowelIndex = i
        lastVowel = syllableLower[i]
        break
      }
    }
    
    if (lastVowelIndex >= 0 && lastVowel) {
      const toneKey = (lastVowel === 'ü' ? 'v' : lastVowel) + tone
      const replacement = toneMap[toneKey] || lastVowel
      return syllable.substring(0, lastVowelIndex) + replacement + syllable.substring(lastVowelIndex + 1)
    }
    
    return syllable
  })
  
  // Remove any remaining tone numbers (5 for neutral tone)
  result = result.replace(/[1-5]/g, '')
  
  return result
}

// Normalize string for comparison (lowercase, remove tones for pinyin)
const normalizeForComparison = (str) => {
  return str
    .toLowerCase()
    .trim()
    // Remove tone marks from pinyin
    .replace(/[āáǎà]/g, 'a')
    .replace(/[ēéěè]/g, 'e')
    .replace(/[īíǐì]/g, 'i')
    .replace(/[ōóǒò]/g, 'o')
    .replace(/[ūúǔù]/g, 'u')
    .replace(/[ǖǘǚǜü]/g, 'v')
    // Remove spaces and special characters
    .replace(/[^a-z0-9]/g, '')
}

// Normalize pinyin for comparison: preserve tone marks, only lowercase/trim/collapse spaces
const normalizePinyinForComparison = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
}

// Levenshtein distance for typo tolerance
const levenshtein = (a, b) => {
  const matrix = []
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        )
      }
    }
  }
  return matrix[b.length][a.length]
}

// Check if pinyin answer is correct (with tone number support)
export const checkPinyinAnswer = (userAnswer, correctPinyin) => {
  // Convert tone numbers to tone marks so both sides use the same form
  const convertedAnswer = convertToneNumbers(userAnswer)
  const convertedCorrect = convertToneNumbers(correctPinyin)
  
  // Normalize with tone-preserving normalizer (no stripping of tones)
  const normalizedAnswer = normalizePinyinForComparison(convertedAnswer)
  const normalizedCorrect = normalizePinyinForComparison(convertedCorrect)
  
  // Exact match only; no typo tolerance so wrong tones (e.g. shi1 vs shi3) never match
  return normalizedAnswer === normalizedCorrect
}

// Check if meaning answer is correct
export const checkMeaningAnswer = (userAnswer, correctEnglish) => {
  const normalizedAnswer = normalizeForComparison(userAnswer)
  const normalizedCorrect = normalizeForComparison(correctEnglish)

  // Exact match against full correct string
  if (normalizedAnswer === normalizedCorrect) {
    return true
  }

  // Allow 1 typo for longer words (full string)
  if (normalizedCorrect.length > 3 && levenshtein(normalizedAnswer, normalizedCorrect) <= 1) {
    return true
  }

  // Accept any comma-separated alternative (e.g. "not have" for "not have, there is not")
  const alternatives = correctEnglish.split(',').map(s => s.trim()).filter(Boolean)
  for (const alt of alternatives) {
    const normalizedAlt = normalizeForComparison(alt)
    if (normalizedAnswer === normalizedAlt) {
      return true
    }
    if (normalizedAlt.length > 3 && levenshtein(normalizedAnswer, normalizedAlt) <= 1) {
      return true
    }
  }

  return false
}

// Legacy function for backwards compatibility
export const checkAnswer = (userAnswer, correctPinyin, correctEnglish) => {
  return checkPinyinAnswer(userAnswer, correctPinyin) || checkMeaningAnswer(userAnswer, correctEnglish)
}

export function useProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        // Ensure new fields exist for backwards compatibility
        return {
          ...getDefaultProgress(),
          ...parsed,
        }
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

  // Mark words/phrases as seen (shown in daily lesson)
  const markItemsSeen = (wordIds, phraseIds) => {
    setProgress(prev => {
      const newSeenWords = [...prev.seenWords]
      const newSeenPhrases = [...prev.seenPhrases]
      
      wordIds.forEach(id => {
        if (!newSeenWords.includes(id)) {
          newSeenWords.push(id)
        }
      })
      
      phraseIds.forEach(id => {
        if (!newSeenPhrases.includes(id)) {
          newSeenPhrases.push(id)
        }
      })
      
      // Only update if something changed
      if (newSeenWords.length === prev.seenWords.length && 
          newSeenPhrases.length === prev.seenPhrases.length) {
        return prev
      }
      
      return {
        ...prev,
        seenWords: newSeenWords,
        seenPhrases: newSeenPhrases,
      }
    })
  }

  const getSeenCount = () => ({
    words: progress.seenWords?.length || 0,
    phrases: progress.seenPhrases?.length || 0,
    total: (progress.seenWords?.length || 0) + (progress.seenPhrases?.length || 0),
  })

  // Record a quiz answer with question type (pinyin or meaning)
  // Only boosts SRS interval when BOTH pinyin and meaning are correct
  const recordAnswer = (itemId, isWord, questionType, isCorrect) => {
    setProgress(prev => {
      const statsKey = isWord ? 'wordStats' : 'phraseStats'
      const learnedKey = isWord ? 'learnedWords' : 'learnedPhrases'
      const currentStats = prev[statsKey][itemId] || getDefaultWordStats()
      const today = getToday()
      
      // Update the specific question type correctness
      let newPinyinCorrect = currentStats.pinyinCorrect
      let newMeaningCorrect = currentStats.meaningCorrect
      
      if (questionType === 'pinyin') {
        newPinyinCorrect = isCorrect ? true : false
      } else if (questionType === 'meaning') {
        newMeaningCorrect = isCorrect ? true : false
      }
      
      // Check if both are now correct
      const bothCorrect = newPinyinCorrect && newMeaningCorrect
      
      let newInterval = currentStats.interval
      let newEaseFactor = currentStats.easeFactor
      
      if (bothCorrect) {
        // Both correct: boost SRS interval and reset flags for next round
        newEaseFactor = Math.max(1.3, currentStats.easeFactor + 0.1)
        if (currentStats.interval === 1) {
          newInterval = 2
        } else if (currentStats.interval === 2) {
          newInterval = 6
        } else {
          newInterval = Math.round(currentStats.interval * newEaseFactor)
        }
        // Cap at 180 days
        newInterval = Math.min(180, newInterval)
        // Reset flags for next review cycle
        newPinyinCorrect = false
        newMeaningCorrect = false
      } else if (!isCorrect) {
        // Wrong answer: decrease ease, but don't reset interval yet
        newEaseFactor = Math.max(1.3, currentStats.easeFactor - 0.1)
      }
      
      // Calculate next review date (only updates when both correct)
      const nextDate = new Date()
      nextDate.setDate(nextDate.getDate() + newInterval)
      const nextReview = nextDate.toISOString().split('T')[0]
      
      // Auto-mark as learned if both correct
      let newLearnedList = prev[learnedKey]
      if (bothCorrect && !newLearnedList.includes(itemId)) {
        newLearnedList = [...newLearnedList, itemId]
      }
      
      return {
        ...prev,
        [learnedKey]: newLearnedList,
        [statsKey]: {
          ...prev[statsKey],
          [itemId]: {
            interval: newInterval,
            easeFactor: newEaseFactor,
            nextReview,
            correctCount: currentStats.correctCount + (isCorrect ? 1 : 0),
            incorrectCount: currentStats.incorrectCount + (isCorrect ? 0 : 1),
            lastReviewed: today,
            pinyinCorrect: newPinyinCorrect,
            meaningCorrect: newMeaningCorrect,
          }
        }
      }
    })
  }

  // Get words/phrases that need review, prioritized by SRS algorithm
  // Only includes items that have been seen in daily lessons
  const getItemsForReview = (count = 10, includeWords = true, includePhrases = true) => {
    const today = getToday()
    const items = []
    const seenWords = progress.seenWords || []
    const seenPhrases = progress.seenPhrases || []
    
    // Add vocabulary (only if seen in daily lessons)
    if (includeWords) {
      vocabulary.forEach(word => {
        if (seenWords.includes(word.id)) {
          const stats = progress.wordStats[word.id] || getDefaultWordStats()
          items.push({
            ...word,
            isWord: true,
            stats: stats,
          })
        }
      })
    }
    
    // Add phrases (only if seen in daily lessons)
    if (includePhrases) {
      phrases.forEach(phrase => {
        if (seenPhrases.includes(phrase.id)) {
          const stats = progress.phraseStats[phrase.id] || getDefaultWordStats()
          items.push({
            ...phrase,
            isWord: false,
            stats: stats,
          })
        }
      })
    }
    
    // Sort by priority:
    // 1. Items with partial progress (only pinyin OR meaning correct) - need to complete
    // 2. Never reviewed (no stats or never reviewed)
    // 3. Due for review (nextReview <= today)
    // 4. Lower ease factor (struggling)
    // 5. Random for variety
    items.sort((a, b) => {
      const aStats = a.stats
      const bStats = b.stats
      
      // Partial progress items come first (need to complete the other half)
      const aPartial = (aStats.pinyinCorrect && !aStats.meaningCorrect) || (!aStats.pinyinCorrect && aStats.meaningCorrect)
      const bPartial = (bStats.pinyinCorrect && !bStats.meaningCorrect) || (!bStats.pinyinCorrect && bStats.meaningCorrect)
      if (aPartial && !bPartial) return -1
      if (!aPartial && bPartial) return 1
      
      // Never reviewed items come next
      const aNeverReviewed = !aStats.lastReviewed
      const bNeverReviewed = !bStats.lastReviewed
      if (aNeverReviewed && !bNeverReviewed) return -1
      if (!aNeverReviewed && bNeverReviewed) return 1
      
      // Then items due for review
      const aDue = aStats.nextReview <= today
      const bDue = bStats.nextReview <= today
      if (aDue && !bDue) return -1
      if (!aDue && bDue) return 1
      
      // Then by ease factor (lower = harder = review sooner)
      if (aStats.easeFactor !== bStats.easeFactor) {
        return aStats.easeFactor - bStats.easeFactor
      }
      
      // Random tiebreaker
      return Math.random() - 0.5
    })
    
    return items.slice(0, count)
  }

  // Get the mastery status for an item
  const getMasteryStatus = (itemId, isWord) => {
    const statsKey = isWord ? 'wordStats' : 'phraseStats'
    const stats = progress[statsKey][itemId] || getDefaultWordStats()
    return {
      pinyinCorrect: stats.pinyinCorrect,
      meaningCorrect: stats.meaningCorrect,
      fullyLearned: stats.pinyinCorrect && stats.meaningCorrect,
    }
  }

  const stats = {
    totalWordsLearned: progress.learnedWords.length,
    totalPhrasesLearned: progress.learnedPhrases.length,
    totalLearned: progress.learnedWords.length + progress.learnedPhrases.length,
    daysActive: progress.daysActive.length,
    currentStreak: progress.currentStreak,
    longestStreak: progress.longestStreak,
    // Quiz stats
    totalReviewed: Object.keys(progress.wordStats).length + Object.keys(progress.phraseStats).length,
    totalCorrect: Object.values(progress.wordStats).reduce((sum, s) => sum + (s.correctCount || 0), 0) +
                  Object.values(progress.phraseStats).reduce((sum, s) => sum + (s.correctCount || 0), 0),
    totalIncorrect: Object.values(progress.wordStats).reduce((sum, s) => sum + (s.incorrectCount || 0), 0) +
                    Object.values(progress.phraseStats).reduce((sum, s) => sum + (s.incorrectCount || 0), 0),
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
    // Seen tracking
    markItemsSeen,
    getSeenCount,
    // SRS functions
    recordAnswer,
    getItemsForReview,
    getMasteryStatus,
    // Answer checking
    checkAnswer,
    checkPinyinAnswer,
    checkMeaningAnswer,
  }
}

export default useProgress
