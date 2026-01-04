import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import contentItemsRouter from './routes/contentItems.js';
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION FULL:', err);
  console.error('TYPE:', typeof err);
  console.error('STRINGIFIED:', JSON.stringify(err, null, 2));
});

process.on('unhandledRejection', (reason) => {
  console.error('UNHANDLED REJECTION FULL:', reason);
  console.error('TYPE:', typeof reason);
  console.error('STRINGIFIED:', JSON.stringify(reason, null, 2));
});

const app = express();
app.use(cors());
app.use(express.json());

app.use('/content-items', contentItemsRouter);

app.listen(4000, () => {
  console.log('Server running');
});
