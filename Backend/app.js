
const app=require('./configure/index');
require('dotenv').config();

const PORT = process.env.PORT || 8081;
const http = require('http');


const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });