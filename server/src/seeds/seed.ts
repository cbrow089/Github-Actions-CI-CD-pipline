import db from "../config/connection.js";
import Question from "../models/Question.js";
import cleanDB from "./cleanDb.js";
import {promises as fs} from 'fs';

async function loadJson() {
  const data = await fs.readFile('./seeds/pythonQuestions.json', 'utf-8');
  return JSON.parse(data);
}
const pythonQuestions = await loadJson();

db.once('open', async () => {
  await cleanDB('Question', 'questions');

  await Question.insertMany(pythonQuestions);

  console.log('Questions seeded!');
  process.exit(0);
});
