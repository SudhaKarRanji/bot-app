const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Set up your Telegram bot token
const token = TELEGRAM_TOKEN;

// Create a new instance of the Telegram bot
const bot = new TelegramBot(token, { polling: true });
const menuCommand = '/menu';
// Menu options
const menuOptions = [
  {
    text: 'News',
    command: '/news'
  },
  {
    text: 'Songs',
    command: '/song'
  },
  {
    text: 'Weather',
    command: '/weather'
  },
  {
    text:'Schedule',
    command: '/schedule'
  }
];
bot.onText(new RegExp(menuCommand), (msg) => {
  const chatId = msg.chat.id;

  // Create the menu keyboard
  const keyboard = {
    reply_markup: {
      keyboard: menuOptions.map(option => [{ text: option.text }]),
      resize_keyboard: true
    }
  };

  bot.sendMessage(chatId, 'Choose an option:', keyboard);
});

menuOptions.forEach(option => {
  bot.onText(new RegExp(option.command), (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `You selected ${option.text}`);
  });
});
// Listen to incoming messages
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const message = msg.text;

  // Check the incoming message for specific commands
  if (message === '/start') {
    // Send a welcome message
    bot.sendMessage(chatId, 'Welcome to your Personal Assistant Bot! How can I assist you today?');
    sendGreeting(chatId);
    bot.sendMessage(chatId,'Type /menu for all menu');
  } 
   else if (message === '/news') {
    // Get the latest news
    getNews(chatId);
  } else if (message === '/weather') {
    // Get the current weather
    getWeather(chatId);
  } else if (message === '/song') {
    // Get a random song recommendation
    getSong(chatId);
  } else if (message === '/schedule') {
    // Get the user's schedule
    getSchedule(chatId);
  } 
});

// Function to send a daily greeting
function sendGreeting(chatId) {
  const greetings = ['Good morning!', 'Hello!', 'Greetings!', 'Hi there!'];
  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
  bot.sendMessage(chatId, randomGreeting);
}

// Function to get the latest news
function getNews(chatId) {
  // Add your logic to retrieve the latest news from an API or source
  const news = 'Here are the latest news headlines:\n\n1. News headline 1\n2. News headline 2\n3. News headline 3';
  bot.sendMessage(chatId, news);
}

// Function to get the current weather
function getWeather(chatId) {
  // Add your logic to retrieve the current weather from an API or source
  const weather = 'The current weather is sunny with a temperature of 25°C.';
  bot.sendMessage(chatId, weather);
}

// Function to get a random song recommendation
function getSong(chatId) {
  // Add your logic to retrieve a random song recommendation from an API or source
  const song = 'I recommend listening to this song: Artist - Song Title';
  bot.sendMessage(chatId, song);
}

// Function to get the user's schedule
function getSchedule(chatId) {
  // Add your logic to retrieve the user's schedule from a database or source
  const schedule = 'Here is your schedule for today:\n\n- 9:00 AM: Meeting\n- 12:00 PM: Lunch\n- 3:00 PM: Appointment';
  bot.sendMessage(chatId, schedule);
}

// Start the bot
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  
});

// Set up the server for Heroku deployment
const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function (request, response) {
  response.send('Telegram bot is running.');
});

app.listen(app.get('port'), function () {
  console.log('Telegram bot is running on port', app.get('port'));
});
