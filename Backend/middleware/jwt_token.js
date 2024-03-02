// jwt.utils.js

const jwt = require('jsonwebtoken');

const getJwtToken = (userId) => {
  return jwt.sign({ userId: userId },
    process.env.JWT_SECRET,
    { expiresIn: '365d' } // Adjust the expiration as needed
  );
};

module.exports=getJwtToken;