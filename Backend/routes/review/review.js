const express=require('express');
const router=express.Router();
const review=require('../../controller/review/review');


router.post('/review',review.createReview);

module.exports= router;
