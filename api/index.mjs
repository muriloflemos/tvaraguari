import * as api from './api.mjs';
import express from 'express';
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  res.send('API TV Araguari');
});

app.get('/programacao', async (req, res) => {
  const data = await api.handler();
  res.send(data);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});
