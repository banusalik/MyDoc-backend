const express=require('express');
const router=express.Router();
const department=require('../../controller/department/department');

router.post('/department',department.createDepartment);

module.exports=router;