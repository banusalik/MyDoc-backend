const express=require('express');
const router=express.Router();
const user_controller=require('../../controller/patients/patients_controller');
const multer = require('multer');
const path = require('path');


//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './assets/images/');     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
  
  var upload = multer({
    storage: storage,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    },
  });


router.post('/register',user_controller.registerPatient);
router.post('/login',user_controller.login);
router.post('/profile/:id',user_controller.registerPatient);


module.exports= router;