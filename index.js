require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { getRandomQuote } = require('./quoteService');

const token = process.env.token;
const bot = new TelegramBot(token, { polling: true });

// Command: /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome! Send /quote to get a motivational quote.');
});

// Command: /quote
bot.onText(/\/quote/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const { quote, author } = await getRandomQuote();
    const message = `"${quote}"
— ${author}`;
    bot.sendMessage(chatId, message);
  } catch (error) {
    bot.sendMessage(chatId, 'Sorry, could not fetch a quote at this time.');
  }
});

// Command: /help
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Send /quote to receive a random motivational quote.');
}); 