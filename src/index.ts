import express from 'express';
import path from 'path';

const app = express();
const port = 3333;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/newroute', (req, res) => {
  res.status(200).json('Hello ~TypeScript~ World!').end();
});

app.listen(port, () => {
  console.log(`The server is listening at http://localhost:${port}`);
});
