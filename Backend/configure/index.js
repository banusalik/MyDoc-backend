const express=require('express');
const app=express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();
var corOptions={
    origin:'http://localhost:8081'
};


const useRoute=require('../routes/patients/patients_routes');
const transactionRoute=require('../routes/transaction/transaction');
const appointmentRoute=require('../routes/appointment/appointment');
const doctorRoute=require('../routes/doctors/doctors');
const departmentRoute=require('../routes/department/department');
const reviewRoute=require('../routes/review/review');

app.use;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:false}));
app.use(express.static('public'));
app.use(cookieParser());

app.use('/image', express.static('assets/images'));

app.use('/patients',useRoute);
app.use('/patients',appointmentRoute);
app.use('/doctor',doctorRoute);
app.use('/doctor',reviewRoute);
app.use('/',transactionRoute);
app.use('/',departmentRoute);

module.exports=app;