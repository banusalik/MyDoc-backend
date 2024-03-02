const express=require('express');
const router=express.Router();
const doctors=require('../../controller/doctors/doctors');


router.post('/register',doctors.createDoctor);
router.get('/',doctors.getAllDoctorDetails);
router.post('/search',doctors.searchDoctorByName);
router.post('/login',doctors.login);

module.exports= router;
