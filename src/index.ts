import express, { Request, Response } from 'express';
import path from 'path';

import topStories from './helpers/external';

const app = express();
const port = 3333;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/api/top-stories/:topic', (req: Request, res: Response) => {
  const topic :string = req.params.topic;
  topStories(topic)
    .then((data) => {
      res.status(200).json(data).end();
    })
    .catch((error) => {
      res.status(error.response.status)
        .json({
          error: error.message,
          message: error.response.data
        })
        .end();
    });
});

app.listen(port, () => {
  console.log(`The server is listening at http://localhost:${port}`);
});
