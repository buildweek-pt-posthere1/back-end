const cors = require('cors');
const server = require('./server.js');
server.use(cors());
const port = process.env.PORT || 3666;


server.listen(port,()=>{
    console.log(`romeo is listening on ${port} `)
});

