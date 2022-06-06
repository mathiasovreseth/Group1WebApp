package no.ntnu.group1.webApp.service;

import no.ntnu.group1.webApp.models.Product;
import no.ntnu.group1.webApp.models.Review;
import no.ntnu.group1.webApp.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Represents the review service of the application.
 */
@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    /**
     * Find review by id.
     *
     * @param id the id of the review
     * @return the review if present
     */
    public Optional<Review> findReviewById(Long id) {
        return reviewRepository.findById(id);
    }

    public void add(Review review) {
         reviewRepository.save(review);


    }

    /**
     * Gets all reviews.
     *
     * @return all reviews
     */
    public List<Object> getAll() {
        
        return reviewRepository.getCommentAndUser();}
}
