import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.resolve(__dirname, '..', '..', 'build')));

app.all('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on localhost ${PORT}`);
});
