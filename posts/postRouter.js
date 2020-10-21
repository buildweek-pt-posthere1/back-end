const express = require('express');
const router = express.Router();
const Posts = require('./post-helper');

router.post('/',(req,res)=>{
    const newpost = req.body;
    Posts.insert(newpost)
    .then(p => {
        res.status(201).json(p);
      })
      .catch (err => {
        res.status(500).json({ message: 'Failed to create new post' });
      });
})

router.get('/', (req, res) => {
   
    Posts.get()
    .then(posts=>res.status(200).json(posts))
    .catch(err=>res.status(500).json(err))
  });
  
router.get('/:id', validatePostId,(req, res) => {
   
    Posts.getById(req.params.id)
    .then(post=>res.status(200).json(post))
    .catch(err=>res.status(500).json(err))
  });
  
router.delete('/:id', validatePostId,(req, res) => {
    
    Posts.remove(req.params.id)
    .then(removePost=>res.status(200).json(removePost))
    .catch(err=>res.status(500).json(err))
  });
  
router.put('/:id', validatePostId,(req, res) => {
    
    Posts.update(req.post.id,req.body)
    .then(count=>{
      if (count = 1){
        res.status(201).json({message:'post was successfully updated'})
      }else{res.status(400).json({error:"there is error updating"})}
    })
    .catch(err=>res.status(500).json({err:err.message}))
  });

  //not working with DS
  router.post("/:id", validatePostId, (req, res) => {
    const sendDs = {
        title: req.body.title,
        text: req.body.text,
        results: req.body.results
    }

    axios.post("https://bw3-posthere.herokuapp.com/predict", sendDs)
        .then(sug => {
            const sugg = sug.data
            const userId = req.params.id;

            const newPost = {
                user: userId, title: req.body.title,
                text: req.body.text
            }
            return Posts.insert(newPost)
                .then(data => {

                    res.status(201).json({ data, sugg })
                }).catch(err => {
                    res.status(500).json({ err, message: "Couldn't create post" })
                })
        })

})
  
  // custom middleware
  
  function validatePostId(req, res, next) {
   
    Posts.getById(req.params.id)
    .then(post => {
      if(post && post.id) {
        req.post = post;
        
        next();
      } else {
        res.status(400).json({  message: "Invalid post id." });
      }
    })
    .catch(err => {
      res.status(500).json({error: err.message})
    })
  }
  
  module.exports = router;
  