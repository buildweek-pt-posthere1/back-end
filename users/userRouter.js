const express = require('express');
const router = express.Router();
const Users = require('./user-helper');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const restrict = require('../restrict');


router.post('/register',async (req,res,next)=>{
    try{
        const {username,password} = req.body
        const user = await Users.findBy({username}).first()
        if(user){
          res.status(409).json({
              message:'user name already taken'
          })  
        }
      const newUser = await Users.add({
          username,
          password:await bcrypt.hash(password,10)
          
      })
      res.status(201).json(newUser)
    }catch(err){
        next(err)
    }
  })

router.post('/login',async (req,res,next)=>{
    try{
      const {username,password}= req.body
      const user = await Users.findBy({username}).first()
     if(!user){
         return res.status(401).json({
             message:'invalid user'
         })
     }
     const passWordValid = await bcrypt.compare(password,user.password)
     if (!passWordValid){
        return res.status(401).json({
            message:'invalid user'
        })
     }
    //  req.session.user = user
    const token = jwt.sign({
        userID: user.id,
        userRole:"basic",
    },process.env.JWT_SECRET)
    res.cookie("token", token)
    res.json({
         message:`welcome back backend ${user.username}`,
         token:token
     })
    }catch(err){
     next(err)
    }
    

})

router.get('/allusers',restrict('basic'),async (req,res,next)=>{
    try{
        res.status(201).json( await Users.find())}
    catch(err){
        next(err)
    }
   })

router.get('/',(req,res)=>{
    res.send('hello new user ,you got me')
})

// router.get("/logout", async (req, res, next) => {
// 	try {
// 		req.session.destroy((err) => {
// 			if (err) {
// 				next(err)
// 			} else {
// 				res.status(204).end()
// 			}
// 		})
// 	} catch (err) {
// 		next(err)
// 	}
// })

module.exports = router;