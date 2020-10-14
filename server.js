const express = require('express');
const server = express();
const userRouter = require('./users/userRouter');
server.use(express.json());
server.use('/api/users',userRouter);
server.get('/', (req, res) => {
    res.send(`<h2>Let's do buildweek together with Romeo!</h2>`);
  });

module.exports = server