
const jwt = require('jsonwebtoken');
const Doctor = require('../model/doctors/doctors');
const Patient = require('../model/patients/patients');


const loginAuthentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
          return res.status(401).json({ 
            status:false,
            massage: 'Authorization token missing' });
        }
    
        // Remove 'Bearer ' from the beginning of the token string
        const tokenWithoutBearer = token.replace('Bearer ', '');
    
        // Verify the token using the secret key (process.env.ACCESS_TOKEN_SECRET)
        const decodedToken = jwt.verify(tokenWithoutBearer, "accesstoken");
    
        const user= await Doctor.findById(decodedToken.id);
    
        console.log=user.role;
    
        if(!user){
            res.status(401).send({ message: 'The user with the given token does not exit!' });
            return;
        }
        // Attach the user ID from the decoded token to the request object for future use
        req.user = user;
    
        
        next();
      } catch (error) {
        return res.status(401).json({ msg: 'Invalid token' });
      }
};

module.exports=loginAuthentication;