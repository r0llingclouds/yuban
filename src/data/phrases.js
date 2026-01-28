// HSK1 Phrases - Simple phrases using only HSK1 vocabulary
// Each phrase includes Chinese characters, pinyin, English meaning, and category

export const phrases = [
  // Basic Greetings (1-10)
  { id: 1, chinese: '你好', pinyin: 'nǐ hǎo', english: 'hello', category: 'greetings' },
  { id: 2, chinese: '你好吗？', pinyin: 'nǐ hǎo ma?', english: 'How are you?', category: 'greetings' },
  { id: 3, chinese: '我很好', pinyin: 'wǒ hěn hǎo', english: 'I am very good', category: 'greetings' },
  { id: 4, chinese: '谢谢', pinyin: 'xiè xie', english: 'thank you', category: 'greetings' },
  { id: 5, chinese: '不客气', pinyin: 'bú kè qi', english: "you're welcome", category: 'greetings' },
  { id: 6, chinese: '对不起', pinyin: 'duì bu qǐ', english: 'sorry, excuse me', category: 'greetings' },
  { id: 7, chinese: '没关系', pinyin: 'méi guān xi', english: "it's okay", category: 'greetings' },
  { id: 8, chinese: '再见', pinyin: 'zài jiàn', english: 'goodbye', category: 'greetings' },
  { id: 9, chinese: '明天见', pinyin: 'míng tiān jiàn', english: 'see you tomorrow', category: 'greetings' },
  { id: 10, chinese: '请', pinyin: 'qǐng', english: 'please', category: 'greetings' },

  // Introductions (11-20)
  { id: 11, chinese: '我叫...', pinyin: 'wǒ jiào...', english: 'My name is...', category: 'introduction' },
  { id: 12, chinese: '你叫什么名字？', pinyin: 'nǐ jiào shén me míng zi?', english: 'What is your name?', category: 'introduction' },
  { id: 13, chinese: '我是学生', pinyin: 'wǒ shì xué sheng', english: 'I am a student', category: 'introduction' },
  { id: 14, chinese: '我是老师', pinyin: 'wǒ shì lǎo shī', english: 'I am a teacher', category: 'introduction' },
  { id: 15, chinese: '我是中国人', pinyin: 'wǒ shì zhōng guó rén', english: 'I am Chinese', category: 'introduction' },
  { id: 16, chinese: '我认识你', pinyin: 'wǒ rèn shi nǐ', english: 'I know you', category: 'introduction' },
  { id: 17, chinese: '很高兴认识你', pinyin: 'hěn gāo xìng rèn shi nǐ', english: 'Nice to meet you', category: 'introduction' },
  { id: 18, chinese: '他是我的朋友', pinyin: 'tā shì wǒ de péng you', english: 'He is my friend', category: 'introduction' },
  { id: 19, chinese: '这是我的家', pinyin: 'zhè shì wǒ de jiā', english: 'This is my home', category: 'introduction' },
  { id: 20, chinese: '我在北京', pinyin: 'wǒ zài běi jīng', english: 'I am in Beijing', category: 'introduction' },

  // Questions (21-30)
  { id: 21, chinese: '你是谁？', pinyin: 'nǐ shì shéi?', english: 'Who are you?', category: 'questions' },
  { id: 22, chinese: '这是什么？', pinyin: 'zhè shì shén me?', english: 'What is this?', category: 'questions' },
  { id: 23, chinese: '你在做什么？', pinyin: 'nǐ zài zuò shén me?', english: 'What are you doing?', category: 'questions' },
  { id: 24, chinese: '你在哪儿？', pinyin: 'nǐ zài nǎ er?', english: 'Where are you?', category: 'questions' },
  { id: 25, chinese: '你去哪儿？', pinyin: 'nǐ qù nǎ er?', english: 'Where are you going?', category: 'questions' },
  { id: 26, chinese: '现在几点了？', pinyin: 'xiàn zài jǐ diǎn le?', english: 'What time is it now?', category: 'questions' },
  { id: 27, chinese: '多少钱？', pinyin: 'duō shǎo qián?', english: 'How much money?', category: 'questions' },
  { id: 28, chinese: '怎么样？', pinyin: 'zěn me yàng?', english: 'How is it?', category: 'questions' },
  { id: 29, chinese: '你有几个朋友？', pinyin: 'nǐ yǒu jǐ ge péng you?', english: 'How many friends do you have?', category: 'questions' },
  { id: 30, chinese: '你会说汉语吗？', pinyin: 'nǐ huì shuō hàn yǔ ma?', english: 'Can you speak Chinese?', category: 'questions' },

  // Daily Activities (31-40)
  { id: 31, chinese: '我学习汉语', pinyin: 'wǒ xué xí hàn yǔ', english: 'I study Chinese', category: 'daily' },
  { id: 32, chinese: '我去学校', pinyin: 'wǒ qù xué xiào', english: 'I go to school', category: 'daily' },
  { id: 33, chinese: '我回家', pinyin: 'wǒ huí jiā', english: 'I go home', category: 'daily' },
  { id: 34, chinese: '我吃饭', pinyin: 'wǒ chī fàn', english: 'I eat', category: 'daily' },
  { id: 35, chinese: '我喝水', pinyin: 'wǒ hē shuǐ', english: 'I drink water', category: 'daily' },
  { id: 36, chinese: '我看书', pinyin: 'wǒ kàn shū', english: 'I read books', category: 'daily' },
  { id: 37, chinese: '我写汉字', pinyin: 'wǒ xiě hàn zì', english: 'I write Chinese characters', category: 'daily' },
  { id: 38, chinese: '我听', pinyin: 'wǒ tīng', english: 'I listen', category: 'daily' },
  { id: 39, chinese: '我睡觉', pinyin: 'wǒ shuì jiào', english: 'I sleep', category: 'daily' },
  { id: 40, chinese: '我工作', pinyin: 'wǒ gōng zuò', english: 'I work', category: 'daily' },

  // Time Expressions (41-50)
  { id: 41, chinese: '今天', pinyin: 'jīn tiān', english: 'today', category: 'time' },
  { id: 42, chinese: '明天', pinyin: 'míng tiān', english: 'tomorrow', category: 'time' },
  { id: 43, chinese: '昨天', pinyin: 'zuó tiān', english: 'yesterday', category: 'time' },
  { id: 44, chinese: '现在', pinyin: 'xiàn zài', english: 'now', category: 'time' },
  { id: 45, chinese: '今天天气很好', pinyin: 'jīn tiān tiān qì hěn hǎo', english: 'The weather is very good today', category: 'time' },
  { id: 46, chinese: '今天下雨', pinyin: 'jīn tiān xià yǔ', english: 'It is raining today', category: 'time' },
  { id: 47, chinese: '上午', pinyin: 'shàng wǔ', english: 'morning', category: 'time' },
  { id: 48, chinese: '下午', pinyin: 'xià wǔ', english: 'afternoon', category: 'time' },
  { id: 49, chinese: '中午', pinyin: 'zhōng wǔ', english: 'noon', category: 'time' },
  { id: 50, chinese: '这个星期', pinyin: 'zhè ge xīng qī', english: 'this week', category: 'time' },

  // Family & People (51-60)
  { id: 51, chinese: '这是我爸爸', pinyin: 'zhè shì wǒ bà ba', english: 'This is my father', category: 'family' },
  { id: 52, chinese: '这是我妈妈', pinyin: 'zhè shì wǒ mā ma', english: 'This is my mother', category: 'family' },
  { id: 53, chinese: '我有很多朋友', pinyin: 'wǒ yǒu hěn duō péng you', english: 'I have many friends', category: 'people' },
  { id: 54, chinese: '他是我的同学', pinyin: 'tā shì wǒ de tóng xué', english: 'He is my classmate', category: 'people' },
  { id: 55, chinese: '她是我的老师', pinyin: 'tā shì wǒ de lǎo shī', english: 'She is my teacher', category: 'people' },
  { id: 56, chinese: '我认识他', pinyin: 'wǒ rèn shi tā', english: 'I know him', category: 'people' },
  { id: 57, chinese: '我们一起去', pinyin: 'wǒ men yī qǐ qù', english: 'We go together', category: 'people' },
  { id: 58, chinese: '我住在北京', pinyin: 'wǒ zhù zài běi jīng', english: 'I live in Beijing', category: 'people' },
  { id: 59, chinese: '他是医生', pinyin: 'tā shì yī shēng', english: 'He is a doctor', category: 'people' },
  { id: 60, chinese: '我去医院', pinyin: 'wǒ qù yī yuàn', english: 'I go to the hospital', category: 'people' },

  // Food & Shopping (61-70)
  { id: 61, chinese: '我想吃苹果', pinyin: 'wǒ xiǎng chī píng guǒ', english: 'I want to eat an apple', category: 'food' },
  { id: 62, chinese: '我要喝水', pinyin: 'wǒ yào hē shuǐ', english: 'I want to drink water', category: 'food' },
  { id: 63, chinese: '我喜欢吃水果', pinyin: 'wǒ xǐ huan chī shuǐguǒ', english: 'I like to eat fruit', category: 'food' },
  { id: 64, chinese: '我买书', pinyin: 'wǒ mǎi shū', english: 'I buy books', category: 'shopping' },
  { id: 65, chinese: '我去商店', pinyin: 'wǒ qù shāng diàn', english: 'I go to the store', category: 'shopping' },
  { id: 66, chinese: '我去饭店', pinyin: 'wǒ qù fàn diàn', english: 'I go to the restaurant', category: 'food' },
  { id: 67, chinese: '我吃米饭', pinyin: 'wǒ chī mǐ fàn', english: 'I eat rice', category: 'food' },
  { id: 68, chinese: '我喝茶', pinyin: 'wǒ hē chá', english: 'I drink tea', category: 'food' },
  { id: 69, chinese: '这个多少钱？', pinyin: 'zhè ge duō shǎo qián?', english: 'How much is this?', category: 'shopping' },
  { id: 70, chinese: '我要这个', pinyin: 'wǒ yào zhè ge', english: 'I want this one', category: 'shopping' },

  // Feelings & Descriptions (71-80)
  { id: 71, chinese: '我很高兴', pinyin: 'wǒ hěn gāo xìng', english: 'I am very happy', category: 'feelings' },
  { id: 72, chinese: '她很漂亮', pinyin: 'tā hěn piào liang', english: 'She is very pretty', category: 'descriptions' },
  { id: 73, chinese: '这个很大', pinyin: 'zhè ge hěn dà', english: 'This is very big', category: 'descriptions' },
  { id: 74, chinese: '这个很小', pinyin: 'zhè ge hěn xiǎo', english: 'This is very small', category: 'descriptions' },
  { id: 75, chinese: '我很喜欢', pinyin: 'wǒ hěn xǐ huan', english: 'I like it very much', category: 'feelings' },
  { id: 76, chinese: '我爱我的家', pinyin: 'wǒ ài wǒ de jiā', english: 'I love my home', category: 'feelings' },
  { id: 77, chinese: '今天很冷', pinyin: 'jīn tiān hěn lěng', english: 'Today is very cold', category: 'weather' },
  { id: 78, chinese: '今天很热', pinyin: 'jīn tiān hěn rè', english: 'Today is very hot', category: 'weather' },
  { id: 79, chinese: '天气很好', pinyin: 'tiān qì hěn hǎo', english: 'The weather is very good', category: 'weather' },
  { id: 80, chinese: '我有很多书', pinyin: 'wǒ yǒu hěn duō shū', english: 'I have many books', category: 'descriptions' },

  // Simple Statements (81-90)
  { id: 81, chinese: '我会说汉语', pinyin: 'wǒ huì shuō hàn yǔ', english: 'I can speak Chinese', category: 'abilities' },
  { id: 82, chinese: '我能来', pinyin: 'wǒ néng lái', english: 'I can come', category: 'abilities' },
  { id: 83, chinese: '我想去', pinyin: 'wǒ xiǎng qù', english: 'I want to go', category: 'desires' },
  { id: 84, chinese: '我没有', pinyin: 'wǒ méi yǒu', english: 'I don\'t have', category: 'negation' },
  { id: 85, chinese: '我不是学生', pinyin: 'wǒ bú shì xué sheng', english: 'I am not a student', category: 'negation' },
  { id: 86, chinese: '我不去', pinyin: 'wǒ bú qù', english: 'I am not going', category: 'negation' },
  { id: 87, chinese: '这个是我的', pinyin: 'zhè ge shì wǒ de', english: 'This is mine', category: 'possession' },
  { id: 88, chinese: '那是他的', pinyin: 'nà shì tā de', english: 'That is his', category: 'possession' },
  { id: 89, chinese: '我和我的朋友', pinyin: 'wǒ hé wǒ de péng you', english: 'I and my friend', category: 'conjunction' },
  { id: 90, chinese: '我坐出租车', pinyin: 'wǒ zuò chū zū chē', english: 'I take a taxi', category: 'transportation' },

  // Technology & Media (91-100)
  { id: 91, chinese: '我看电视', pinyin: 'wǒ kàn diàn shì', english: 'I watch TV', category: 'technology' },
  { id: 92, chinese: '我看电影', pinyin: 'wǒ kàn diàn yǐng', english: 'I watch movies', category: 'technology' },
  { id: 93, chinese: '我看电脑', pinyin: 'wǒ kàn diàn nǎo', english: 'I look at the computer', category: 'technology' },
  { id: 94, chinese: '我打电话', pinyin: 'wǒ dǎ diàn huà', english: 'I make a phone call', category: 'technology' },
  { id: 95, chinese: '喂，你好', pinyin: 'wèi, nǐ hǎo', english: 'Hello (on phone)', category: 'technology' },
  { id: 96, chinese: '我写汉字', pinyin: 'wǒ xiě hàn zì', english: 'I write Chinese characters', category: 'language' },
  { id: 97, chinese: '我学习汉语', pinyin: 'wǒ xué xí hàn yǔ', english: 'I study Chinese', category: 'language' },
  { id: 98, chinese: '我会说一点儿汉语', pinyin: 'wǒ huì shuō yī diǎn er hàn yǔ', english: 'I can speak a little Chinese', category: 'language' },
  { id: 99, chinese: '这个字怎么写？', pinyin: 'zhè ge zì zěn me xiě?', english: 'How do you write this character?', category: 'language' },
  { id: 100, chinese: '我读这本书', pinyin: 'wǒ dú zhè běn shū', english: 'I read this book', category: 'reading' },
]

export default phrases
