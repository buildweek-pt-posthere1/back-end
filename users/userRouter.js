const express = require('express');
const router = express.Router();

router.post('/register',(req,res)=>{
    res.send('hello new user')
})
router.get('/',(req,res)=>{
    res.send('hello new user ,you got me')
})

module.exports = router;