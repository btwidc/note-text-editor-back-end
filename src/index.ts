import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import express from 'express';

import cors from 'cors';
import bodyParser from 'body-parser';

import router from './routes';
import errorHandlingMiddleware from './middleware/errorHandlingMiddleware';

const port = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: '*',
    methods: '*',
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router);
app.use(errorHandlingMiddleware);

const start = async () => {
  try {
    await server.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
