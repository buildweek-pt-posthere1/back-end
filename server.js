const express = require('express');
const server = express();
const cookieParser = require("cookie-parser")
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');
server.use(express.json());
server.use(cookieParser());

server.use((err,req,res,next)=>{
  res.status(500).json({
      message:'sth went wrong'
  })
})
server.use('/api/users',userRouter);
server.use('/api/post', postRouter);
server.get('/', (req, res) => {
    res.send(`<h2>Let's do buildweek together with Romeo!</h2>`);
  });

module.exports = server