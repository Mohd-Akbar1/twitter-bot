import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

import { generateCreativeContent } from './tweet.js';
import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
dotenv.config();
import cron from 'node-cron';

// Twitter client setup
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_APP_KEY,
  appSecret: process.env.TWITTER_APP_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

const rwClient = twitterClient.readWrite;

// Pick a random category
const categories = ['coding', 'humor', 'motivational', 'social'];
const randomCategory = categories[Math.floor(Math.random() * categories.length)];

async function postRandomTweet() {
  console.log(`Generating ${randomCategory} content...`);
  const content = await generateCreativeContent(randomCategory);

  if (!content) {
    console.error("Failed to generate content");
    return;
  }

  try {
    const tweet = await rwClient.v2.tweet(content);
    console.log("Tweet posted successfully:", tweet.data.text);
  } catch (err) {
    console.error("Tweet failed:", err);
  }
}


// Run every 6 hours
// cron.schedule('0 */6 * * *', () => {
//   console.log("Scheduled tweet attempt at:", new Date().toLocaleString());
//   postRandomTweet();
// });

postRandomTweet();



app.get('/', (req, res) => {
  res.send('Twitter bot is running...');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});