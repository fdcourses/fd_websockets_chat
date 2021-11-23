const express = require('express');
const cors = require('cors');

const { Message } = require('./models');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', async (req, res, next) => {
  try {
    Message.find()
    .populate('user')
    .exec((err, message) => {
      if(err) {
        throw new Error('bad populate');
      }


      res.send(message);
    });

  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err); // ОЧЕНЬ ПЛОХО
});

module.exports = app;
