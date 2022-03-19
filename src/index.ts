import express, { Request, Response } from 'express';
import path from 'path';

import { getTopStories } from './helpers/external';

const app = express();
const port = 3333;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

/* app.post('/auth/signup', (req, res) => {
  check if user exists
    success (true) - respond to userExists
    failure (false) - enter signup flow
      create salt
        success - hash password
          success - create user in DB
            success - enter login flow
            failure - respond to hashPassword
        failure - respond to createSalt
}); */

/* app.get('/auth/login', (req, res) => {
  check if user exists
    success (true) - comparePasswords
      success - log user in
    failure (false) - respond to userExists
}); */

/* app.get('/auth/logout', (req, res) => {
  log user out
  redirect user to auth page
}); */

app.get('/api/top-stories/:topic', getTopStories);

app.listen(port, () => {
  console.log(`The server is listening at http://localhost:${port}`);
});


// app.get('/api/top-stories/:topic', (req: Request, res: Response) => {
//   const topic :string = req.params.topic;
//   topStories(topic)
//     .then((data) => {
//       res.status(200).json(data).end();
//     })
//     .catch((error) => {
//       res.status(error.response.status)
//         .json({
//           error: error.message,
//           message: error.response.data
//         })
//         .end();
//     });
// });