import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello ~TypeScript~ World!');
});

app.listen(port, () => {
  console.log(`The server is listening at http://localhost:${port}`);
});
