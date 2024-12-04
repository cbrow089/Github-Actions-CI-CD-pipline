import db from "../config/connection.js";
import Question from "../models/Question.js";
import cleanDB from "./cleanDb.js";
import { promises as fs } from 'fs';
import path from 'path';
import url from 'url';
// Get the directory name from the current module's URL
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
