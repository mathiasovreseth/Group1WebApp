package no.ntnu.group1.webApp.controller;

import no.ntnu.group1.webApp.models.Product;
import no.ntnu.group1.webApp.models.Review;
import no.ntnu.group1.webApp.models.User;
import no.ntnu.group1.webApp.repositories.ReviewRepository;
import no.ntnu.group1.webApp.repositories.UserRepository;
import no.ntnu.group1.webApp.security.JwtUtil;
import no.ntnu.group1.webApp.service.ProductService;
import no.ntnu.group1.webApp.service.ReviewService;
import no.ntnu.group1.webApp.service.UserService;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Represents the review controller of the application.
 */
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;
    private final UserService userService;
    private final ProductService productService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ReviewRepository reviewRepository;


    /**
     * Instantiates a new Review controller.
     *
     * @param reviewService  the review service
     * @param userService    the user service
     * @param productService the product service
     */
    public ReviewController(ReviewService reviewService, UserService userService, ProductService productService) {
        this.reviewService = reviewService;
        this.userService = userService;
        this.productService = productService;
    }

    /**
     * Gets review by id.
     *
     * @param id the id of the review
     * @return the review by id
     */
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Review>> getReviewById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(reviewService.findReviewById(id));
    }

    /**
     * Adds a review to a product.
     *
     * @param http the http data
     * @return the response entity
     */
    @CrossOrigin
    @PostMapping("/add")
    public ResponseEntity<?> addReview(HttpEntity<String> http) {
        try {
            JSONObject json = new JSONObject(http.getBody());
            Long productId = json.getLong("productId");
            String email = json.getString("email");
            String comment = json.getString("comment");
            Optional<User> userOptional = userService.findUserByEmail(email);
            Optional<Product> productOptional = productService.findById(productId);
            if (userOptional.isPresent() && productOptional.isPresent()) {
                User user = userOptional.get();
                Product product = productOptional.get();
                Review review = new Review(comment);
                reviewService.add(review);
                product.addReview(review);
                productService.save(product);
                user.addReview(review);
                userRepository.save(user);
                return ResponseEntity.ok(reviewService.findReviewById(review.getId()));
            } else {
                return new ResponseEntity("User/Product not found", HttpStatus.NOT_FOUND);

            }
        } catch (JSONException e) {
            return new ResponseEntity("Field(s) missing or null", HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    /**
     * Update review for a product.
     *
     * @param http the http data
     * @return the response entity
     */
    @CrossOrigin
    @PutMapping("/update")
    public ResponseEntity<?> updateReview(HttpEntity<String> http, HttpServletRequest request) {
        try {
            JSONObject json = new JSONObject(http.getBody());
            Long reviewId = json.getLong("reviewId");
            String comment = json.getString("comment");
            final String authorizationHeader = request.getHeader("Authorization");

            if (authorizationHeader != null) {
                String permissionResponse = reviewService.checkPermission(authorizationHeader, reviewId);
                if(permissionResponse.equals("200")) {
                    Optional<Review> reviewOptional = reviewService.findReviewById(reviewId);
                    if(reviewOptional.isPresent()) {
                        Review review = reviewOptional.get();
                        review.setComment(comment);
                        reviewRepository.save(review);
                    }
                } else if(permissionResponse.equals("403")) {
                    return new ResponseEntity("User does not have permission to edit this review", HttpStatus.FORBIDDEN);

                } else if(permissionResponse.equals("404")) {
                    return new ResponseEntity("Could not find the owner of the review", HttpStatus.FORBIDDEN);
                }
                return new ResponseEntity("Review updated", HttpStatus.OK);
            } else {
                return new ResponseEntity("Token missing in header", HttpStatus.BAD_REQUEST);
            }
        } catch (JSONException e) {
            return new ResponseEntity("Field(s) missing or null", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * disables review for a product.
     *
     * @param http the http data
     * @return the response entity
     */
    @CrossOrigin
    @PutMapping("/delete")
    public ResponseEntity<?> deleteReview(HttpEntity<String> http, HttpServletRequest request) {
        try {
            JSONObject json = new JSONObject(http.getBody());
            Long reviewId = json.getLong("reviewId");
            final String authorizationHeader = request.getHeader("Authorization");
            if(authorizationHeader != null) {
                String permissionResponse = reviewService.checkPermission(authorizationHeader, reviewId);
                if(permissionResponse.equals("200")) {
                    Optional<Review> reviewOptional = reviewService.findReviewById(reviewId);
                    if(reviewOptional.isPresent()) {
                        Review review = reviewOptional.get();
                        review.setEnabled(false);
                        reviewRepository.save(review);
                    }
                } else if(permissionResponse.equals("403")) {
                    return new ResponseEntity("User does not have permission to edit this review", HttpStatus.FORBIDDEN);

                } else if(permissionResponse.equals("404")) {
                    return new ResponseEntity("Could not find the owner of the review", HttpStatus.FORBIDDEN);
                }
                return new ResponseEntity("Review deleted", HttpStatus.OK);
            } else {
                return new ResponseEntity("Token missing in header", HttpStatus.BAD_REQUEST);
            }

        } catch (JSONException e) {
            return new ResponseEntity("Field(s) missing or null", HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }


    @CrossOrigin
    /**
     * Gets review by user.
     *
     * @return the review by user
     */
    @GetMapping("/getReviewByUser")
    public ResponseEntity<List<Object>> getReviewByUser() {
        return ResponseEntity.ok((reviewService.getAll()));
    }
}
