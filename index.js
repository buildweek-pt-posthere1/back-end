
const server = require('./server.js');

const port = process.env.PORT || 3666;


server.listen(port,()=>{
    console.log(`romeo is listening on ${port} `)
});

