import db from "../config/connection.js";
import Question from "../models/Question.js";
import cleanDB from "./cleanDb.js";
import {promises as fs} from 'fs';
import path from 'path';


async function loadJson() {
  const filePath = path.join(__dirname, 'pythonQuestions.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}
const pythonQuestions = await loadJson();

db.once('open', async () => {
  await cleanDB('Question', 'questions');

  await Question.insertMany(pythonQuestions);

  console.log('Questions seeded!');
  process.exit(0);
});
