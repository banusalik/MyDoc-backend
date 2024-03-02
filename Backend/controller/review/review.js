
// Review Controller
const Review = require('../../model/review/review');

exports.createReview = async (req, res) => {
  try {
    // Extract required fields from req.body
    const { patientId, rating, comment, doctorId } = req.body;

    if(!patientId|| !rating|| !comment|| !doctorId){
      res.status(403).json({ status: false, message: 'Provide all details.'});
      return;
    }

    const newReview = new Review({
      Patient_ID: parseInt(patientId),
      Rating: parseFloat(rating),
      Comment: comment,
      Doctor_ID: parseInt(doctorId),
    });

    await Review.create(newReview);
    res.json({
      status: true,
      message: 'Review created successfully!',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: 'Error creating review.', error: err.message });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const review = await Review.findById(reviewId);

    if (!review) {
      res.status(404).json({ status: false, message: 'Review not found with the provided ID.' });
      return;
    }

    res.json({
      status: true,
      message: 'Review retrieved successfully!',
      review: review,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Error retrieving review.', error: err.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const updatedReviewData = req.body;

    const existingReview = await Review.findById(reviewId);

    if (!existingReview) {
      res.status(404).json({ status: false, message: 'Review not found with the provided ID.' });
      return;
    }

    const updatedReview = await Review.update({
      Review_ID: reviewId,
      ...updatedReviewData,
    });

    res.json({
      status: true,
      message: 'Review updated successfully!',
      review: updatedReview,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Error updating review.', error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const deletedReview = await Review.delete(reviewId);

    if (!deletedReview) {
      res.status(404).json({ status: false, message: 'Review not found with the provided ID.' });
      return;
    }

    res.json({
      status: true,
      message: 'Review deleted successfully!',
      review: deletedReview,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Error deleting review.', error: err.message });
  }
};