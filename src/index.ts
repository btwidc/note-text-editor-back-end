import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
const port = process.env.PORT || 4000;

const app = express();

const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const start = async () => {
  try {
    await server.listen(port, () => {
      console.error(`App listening on port ${port}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();
