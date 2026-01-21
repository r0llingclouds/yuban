# 语伴 (Yǔbàn) - Language Companion

A modern web app that teaches you Chinese vocabulary and phrases, a little bit every day. Built with spaced repetition to help you actually remember what you learn.

## Features

- **Daily Lessons** - Learn 3 new vocabulary words + 1 phrase each day
- **Smart Quiz System** - Tests both pinyin AND meaning separately (you must get both right to master a word)
- **Spaced Repetition (SRS)** - Words you struggle with appear more often; words you know well appear less frequently
- **Tone Number Input** - Type `ni3 hao3` instead of hunting for `nǐ hǎo` characters
- **Progress Tracking** - Track your streak, days active, and mastery progress
- **Mobile Responsive** - Works great on phone, tablet, or desktop
- **Offline Capable** - All progress saved locally, no account needed

## Content

### Vocabulary (100 words)
| Category | Examples |
|----------|----------|
| Greetings | 你好, 谢谢, 再见 |
| Numbers | 一, 二, 三... 百, 千, 万 |
| Food & Drink | 水, 茶, 米饭, 饺子 |
| Time | 今天, 明天, 现在 |
| Common Verbs | 是, 有, 要, 去, 吃 |
| People & Pronouns | 我, 你, 朋友, 家人 |

### Phrases (50 phrases)
| Category | Examples |
|----------|----------|
| Introductions | 我叫..., 很高兴认识你 |
| Basic Expressions | 我不懂, 没问题 |
| Shopping | 多少钱？太贵了 |
| Restaurant | 请给我菜单, 买单 |
| Directions | 洗手间在哪里？ |
| Daily Life | 今天天气很好, 加油！ |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd chinese

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` (or next available port).

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview the production build
npm run preview
```

## How to Use

### Daily Lesson

1. Open the app to see today's lesson
2. Each day shows 3 new vocabulary words and 1 phrase
3. Click "Reveal Meaning" to see the English translation
4. Click "Mark as Learned" when you're ready to move on
5. Come back tomorrow for new content!

### Quiz Mode

1. Click "Start Quiz" to test yourself
2. The quiz only tests words you've already seen in lessons
3. For each word, you'll be asked to type either:
   - **Pinyin** (with the English meaning shown as a hint)
   - **English meaning** (with just the Chinese shown)
4. You must get BOTH pinyin and meaning correct to master a word
5. Use tone numbers for pinyin: `shui3` = shuǐ, `ni3 hao3` = nǐ hǎo

### Tone Number Reference

| Tone | Number | Example |
|------|--------|---------|
| 1st (flat) | 1 | mā → `ma1` |
| 2nd (rising) | 2 | má → `ma2` |
| 3rd (dip) | 3 | mǎ → `ma3` |
| 4th (falling) | 4 | mà → `ma4` |
| Neutral | 5 or none | ma → `ma` |

### Progress Tracking

Click "View Progress" to see:
- Total words and phrases learned
- Current streak (consecutive days)
- Vocabulary and phrase completion percentages
- Overall mastery progress

## Tech Stack

- **React 18** - UI framework
- **Vite 5** - Build tool and dev server
- **localStorage** - Persistent storage (no backend needed)
- **Google Fonts** - Noto Sans SC for Chinese characters, Inter for UI

## Project Structure

```
chinese/
├── index.html              # Entry HTML file
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
└── src/
    ├── main.jsx            # React entry point
    ├── App.jsx             # Main app component
    ├── App.css             # All styles
    ├── components/
    │   ├── Header.jsx      # Navigation header
    │   ├── DailyLesson.jsx # Daily lesson view
    │   ├── LessonCard.jsx  # Individual word/phrase card
    │   ├── Quiz.jsx        # Quiz interface
    │   └── ProgressStats.jsx # Progress dashboard
    ├── data/
    │   ├── vocabulary.js   # 100 vocabulary words
    │   └── phrases.js      # 50 common phrases
    └── hooks/
        └── useProgress.js  # Progress tracking & SRS logic
```

## How the Learning Algorithm Works

语伴 uses a simplified version of the SM-2 spaced repetition algorithm:

1. **New words** start with a 1-day review interval
2. **Correct answers** increase the interval (1 → 2 → 6 → 14 → 30... days)
3. **Wrong answers** reset the interval back to 1 day
4. **Ease factor** adjusts based on performance (harder words stay in rotation longer)
5. **Dual mastery** - Both pinyin AND meaning must be correct before the interval increases

This means:
- Words you know well gradually disappear from quizzes
- Words you struggle with keep appearing until you master them
- You spend your time on what you actually need to learn

## Contributing

Contributions are welcome! Some ideas:
- Add more vocabulary/phrases
- Add audio pronunciation
- Add handwriting practice
- Add HSK level filtering
- Add dark mode

## License

MIT License - feel free to use this for your own learning or build upon it.
