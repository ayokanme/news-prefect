import express, { Request, Response } from 'express';
import path from 'path';

import topStories from './helpers/external';

const app = express();
const port = 3333;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/api/top-stories/:topic', (req: Request, res: Response) => {
  const topic = req.params.topic;
  topStories(topic)
    .then((data) => {
      console.log('the data returned is: ', data);
      res.status(200).send(data).end();
    })
    .catch((error) => {
      console.log('the error returned is: ', error);
      res.status(400).json(error).end();
    });
});

app.listen(port, () => {
  console.log(`The server is listening at http://localhost:${port}`);
});
