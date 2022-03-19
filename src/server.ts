import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';

import { getNewswireSectionArticles, getNewswireSectionList, getTopStories } from './helpers/external';
import { deleteAccount, login, logout, signup } from './helpers/auth';

const app = express();
const port = 3333;

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/build')));

// AUTH ROUTES
app.post('/auth/signup', signup);

app.get('/auth/login', login);

app.get('/auth/logout', logout);


// DELETE ACCOUNT
app.delete('/delete-user-account', deleteAccount);


// EXTERNAL API ROUTES
app.get('/api/top-stories/:topic', getTopStories);

app.get('/api/newswire/section-list', getNewswireSectionList);

app.get('/api/newswire/:section/articles', getNewswireSectionArticles);


app.listen(port, () => {
  console.log(`The server is listening at http://localhost:${port}`);
});
