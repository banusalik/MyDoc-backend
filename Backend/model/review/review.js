const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
class Review {
    constructor(review) {
      this.Review_ID = review.Review_ID;
      this.Patient_ID = review.Patient_ID;
      this.Rating = review.Rating;
      this.Comment = review.Comment;
      this.Doctor_ID = review.Doctor_ID;
    }
  
    static async create(newReview) {
      try {
        const createdReview = await prisma.review.create({
          data: {
            Patient_ID: newReview.Patient_ID,
            Rating: newReview.Rating,
            Comment: newReview.Comment,
            Doctor_ID: newReview.Doctor_ID,
          },
        });
        return createdReview;
      } catch (err) {
        console.log('error: ', err);
        throw err;
      }
    }
  
    static async findById(id) {
      try {
        const review = await prisma.review.findUnique({
          where: {
            Review_ID: parseInt(id),
          },
        });
        return review;
      } catch (err) {
        console.log('error: ', err);
        throw err;
      }
    }
  
    static async update(updatedReview) {
      try {
        const review = await prisma.review.update({
          where: {
            Review_ID: parseInt(updatedReview.Review_ID),
          },
          data: {
            Patient_ID: updatedReview.Patient_ID,
            Rating: updatedReview.Rating,
            Comment: updatedReview.Comment,
            Doctor_ID: updatedReview.Doctor_ID,
          },
        });
        return review;
      } catch (err) {
        console.log('error: ', err);
        throw err;
      }
    }
  }
  module.exports= Review;