import express from 'express';
import bodyParser from 'body-parser';
import { initDatabase } from './service/db.js';
import { addRoutes } from './routes/index.js';

const app = express();

// parse application/json
app.use(bodyParser.json());

initDatabase((error, { db, todoModel }) => {
  if (error) {
    return console.error(error);
  }
  addRoutes(app, db, todoModel);
  app.listen(6000, function () {
    console.log('Running on :6000');
  });
});
