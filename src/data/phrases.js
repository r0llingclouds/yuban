// Curated Chinese phrases database
// Each phrase includes Chinese characters, pinyin, English meaning, and category

export const phrases = [
  // Basic Expressions (1-15)
  { id: 1, chinese: '我叫...', pinyin: 'wǒ jiào...', english: 'My name is...', category: 'introduction' },
  { id: 2, chinese: '你叫什么名字？', pinyin: 'nǐ jiào shén me míng zi?', english: 'What is your name?', category: 'introduction' },
  { id: 3, chinese: '很高兴认识你', pinyin: 'hěn gāo xìng rèn shi nǐ', english: 'Nice to meet you', category: 'introduction' },
  { id: 4, chinese: '我是中国人', pinyin: 'wǒ shì zhōng guó rén', english: 'I am Chinese', category: 'introduction' },
  { id: 5, chinese: '你是哪国人？', pinyin: 'nǐ shì nǎ guó rén?', english: 'Where are you from?', category: 'introduction' },
  { id: 6, chinese: '我不懂', pinyin: 'wǒ bù dǒng', english: "I don't understand", category: 'basic' },
  { id: 7, chinese: '请再说一遍', pinyin: 'qǐng zài shuō yī biàn', english: 'Please say it again', category: 'basic' },
  { id: 8, chinese: '这个怎么说？', pinyin: 'zhè ge zěn me shuō?', english: 'How do you say this?', category: 'basic' },
  { id: 9, chinese: '我在学中文', pinyin: 'wǒ zài xué zhōng wén', english: 'I am learning Chinese', category: 'basic' },
  { id: 10, chinese: '你会说英语吗？', pinyin: 'nǐ huì shuō yīng yǔ ma?', english: 'Can you speak English?', category: 'basic' },
  { id: 11, chinese: '一点点', pinyin: 'yì diǎn diǎn', english: 'A little bit', category: 'basic' },
  { id: 12, chinese: '没问题', pinyin: 'méi wèn tí', english: 'No problem', category: 'basic' },
  { id: 13, chinese: '太好了', pinyin: 'tài hǎo le', english: 'Great! / Wonderful!', category: 'basic' },
  { id: 14, chinese: '是的', pinyin: 'shì de', english: 'Yes', category: 'basic' },
  { id: 15, chinese: '不是', pinyin: 'bú shì', english: 'No / Not', category: 'basic' },

  // Shopping & Restaurant (16-25)
  { id: 16, chinese: '多少钱？', pinyin: 'duō shǎo qián?', english: 'How much?', category: 'shopping' },
  { id: 17, chinese: '太贵了', pinyin: 'tài guì le', english: 'Too expensive', category: 'shopping' },
  { id: 18, chinese: '可以便宜一点吗？', pinyin: 'kě yǐ pián yi yì diǎn ma?', english: 'Can it be cheaper?', category: 'shopping' },
  { id: 19, chinese: '我要这个', pinyin: 'wǒ yào zhè ge', english: 'I want this one', category: 'shopping' },
  { id: 20, chinese: '请给我菜单', pinyin: 'qǐng gěi wǒ cài dān', english: 'Please give me the menu', category: 'restaurant' },
  { id: 21, chinese: '我饿了', pinyin: 'wǒ è le', english: 'I am hungry', category: 'restaurant' },
  { id: 22, chinese: '我渴了', pinyin: 'wǒ kě le', english: 'I am thirsty', category: 'restaurant' },
  { id: 23, chinese: '买单', pinyin: 'mǎi dān', english: 'Check please', category: 'restaurant' },
  { id: 24, chinese: '很好吃', pinyin: 'hěn hǎo chī', english: 'Very delicious', category: 'restaurant' },
  { id: 25, chinese: '不要辣', pinyin: 'bú yào là', english: 'No spicy please', category: 'restaurant' },

  // Directions & Transportation (26-35)
  { id: 26, chinese: '...在哪里？', pinyin: '...zài nǎ lǐ?', english: 'Where is...?', category: 'directions' },
  { id: 27, chinese: '洗手间在哪里？', pinyin: 'xǐ shǒu jiān zài nǎ lǐ?', english: 'Where is the restroom?', category: 'directions' },
  { id: 28, chinese: '我迷路了', pinyin: 'wǒ mí lù le', english: 'I am lost', category: 'directions' },
  { id: 29, chinese: '请问怎么走？', pinyin: 'qǐng wèn zěn me zǒu?', english: 'How do I get there?', category: 'directions' },
  { id: 30, chinese: '往左转', pinyin: 'wǎng zuǒ zhuǎn', english: 'Turn left', category: 'directions' },
  { id: 31, chinese: '往右转', pinyin: 'wǎng yòu zhuǎn', english: 'Turn right', category: 'directions' },
  { id: 32, chinese: '一直走', pinyin: 'yì zhí zǒu', english: 'Go straight', category: 'directions' },
  { id: 33, chinese: '我要去...', pinyin: 'wǒ yào qù...', english: 'I want to go to...', category: 'travel' },
  { id: 34, chinese: '打车', pinyin: 'dǎ chē', english: 'Take a taxi', category: 'travel' },
  { id: 35, chinese: '坐地铁', pinyin: 'zuò dì tiě', english: 'Take the subway', category: 'travel' },

  // Daily Conversations (36-50)
  { id: 36, chinese: '今天天气很好', pinyin: 'jīn tiān tiān qì hěn hǎo', english: 'The weather is nice today', category: 'daily' },
  { id: 37, chinese: '你在做什么？', pinyin: 'nǐ zài zuò shén me?', english: 'What are you doing?', category: 'daily' },
  { id: 38, chinese: '我很忙', pinyin: 'wǒ hěn máng', english: 'I am very busy', category: 'daily' },
  { id: 39, chinese: '我很累', pinyin: 'wǒ hěn lèi', english: 'I am very tired', category: 'daily' },
  { id: 40, chinese: '等一下', pinyin: 'děng yī xià', english: 'Wait a moment', category: 'daily' },
  { id: 41, chinese: '慢慢来', pinyin: 'màn màn lái', english: 'Take your time', category: 'daily' },
  { id: 42, chinese: '几点了？', pinyin: 'jǐ diǎn le?', english: 'What time is it?', category: 'daily' },
  { id: 43, chinese: '我要回家', pinyin: 'wǒ yào huí jiā', english: 'I want to go home', category: 'daily' },
  { id: 44, chinese: '明天见', pinyin: 'míng tiān jiàn', english: 'See you tomorrow', category: 'daily' },
  { id: 45, chinese: '周末你有空吗？', pinyin: 'zhōu mò nǐ yǒu kòng ma?', english: 'Are you free this weekend?', category: 'daily' },
  { id: 46, chinese: '我喜欢中国菜', pinyin: 'wǒ xǐ huān zhōng guó cài', english: 'I like Chinese food', category: 'daily' },
  { id: 47, chinese: '祝你好运', pinyin: 'zhù nǐ hǎo yùn', english: 'Good luck!', category: 'daily' },
  { id: 48, chinese: '生日快乐', pinyin: 'shēng rì kuài lè', english: 'Happy birthday', category: 'daily' },
  { id: 49, chinese: '新年快乐', pinyin: 'xīn nián kuài lè', english: 'Happy New Year', category: 'daily' },
  { id: 50, chinese: '加油', pinyin: 'jiā yóu', english: 'Come on! / You can do it!', category: 'daily' },
]

export default phrases
