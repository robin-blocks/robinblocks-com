const { GoogleGenerativeAI } = require('@google/generative-ai');
const { Octokit } = require('@octokit/rest');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

const GITHUB_REPO_OWNER = process.env.GITHUB_REPO_OWNER;
const GITHUB_REPO_NAME = process.env.GITHUB_REPO_NAME;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const octokit = new Octokit({ auth: GITHUB_TOKEN });

const CODE_FILES = [
  'components/EmailSignup.jsx',
  'hooks/useEmailSubscription.js',
  'pages/api/subscribe.js',
];

async function getCodeContext() {
  let context = '';
  for (const file of CODE_FILES) {
    const filePath = path.join(__dirname, '..', file);
    context += `--- ${file} ---\n`;
    context += await fs.readFile(filePath, 'utf-8');
    context += '\n\n';
  }
  return context;
}

async function getImprovementSuggestion(codeContext) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const prompt = `
    Analyze the following Next.js codebase for an email signup form and suggest a single, small, actionable improvement to increase signups. The improvement can be a UI/UX change, a performance optimization, or a new feature.

    ${codeContext}

    Provide the suggestion in the following format:
    **Suggestion:** A brief title for the improvement.
    **Description:** A detailed description of the improvement and why it would be beneficial.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

async function createGitHubIssue(suggestion) {
  const [titleLine, ...descriptionLines] = suggestion.split('\n');
  const title = titleLine.replace('**Suggestion:**', '').trim();
  const body = descriptionLines.join('\n').replace('**Description:**', '').trim();

  await octokit.issues.create({
    owner: GITHUB_REPO_OWNER,
    repo: GITHUB_REPO_NAME,
    title,
    body,
  });

  console.log(`Successfully created GitHub issue: "${title}"`);
}

async function main() {
  if (!GITHUB_REPO_OWNER || !GITHUB_REPO_NAME || !GEMINI_API_KEY || !GITHUB_TOKEN) {
    console.error('Please set GITHUB_REPO_OWNER, GITHUB_REPO_NAME, GEMINI_API_KEY, and GITHUB_TOKEN in your .env file.');
    return;
  }

  try {
    const codeContext = await getCodeContext();
    const suggestion = await getImprovementSuggestion(codeContext);
    await createGitHubIssue(suggestion);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();