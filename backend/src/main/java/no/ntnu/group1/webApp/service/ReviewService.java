package no.ntnu.group1.webApp.service;

import no.ntnu.group1.webApp.models.Product;
import no.ntnu.group1.webApp.models.Review;
import no.ntnu.group1.webApp.models.User;
import no.ntnu.group1.webApp.repositories.ReviewRepository;
import no.ntnu.group1.webApp.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Represents the review service of the application.
 */
@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserService userService;

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
        return reviewRepository.getCommentAndUser();
    }

    /**
     * Checks if the user that sent the request is the owner of the review or admin
     * @param authorizationHeader header data from the request
     * @param reviewId id of the review
     * @return
     */
    public String checkPermission(String authorizationHeader, Long reviewId) {
        String jwt = authorizationHeader.substring(7);
        String email = jwtUtil.extractEmail(jwt);
        Optional<User> userOptional = userService.findUserByEmail(email);
        if(userOptional.isPresent()) {
            User user = userOptional.get();
            List<Review> review = user.getReviews().stream().filter(u -> u.getId().equals(reviewId)).collect(Collectors.toList());
            if(review.size() != 0 || user.getRole().equals("ADMIN")) {
                return "200";
            } else {
                return "403";
            }
        } else {
            return "404";
        }
    }
}
