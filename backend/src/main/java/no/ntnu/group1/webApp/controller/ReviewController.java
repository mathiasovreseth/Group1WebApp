package no.ntnu.group1.webApp.controller;

import no.ntnu.group1.webApp.models.Review;
import no.ntnu.group1.webApp.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

/**
 * Represents the review controller of the application.
 */
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;


    /**
     * Instantiates a new Review controller.
     *
     * @param reviewService the review service
     */
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    /**
     * Gets review by id.
     *
     * @param id the id
     * @return the review by id
     */
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Review>> getReviewById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(reviewService.findReviewById(id));
    }

    /**
     * Gets review by user.
     *
     * @return the review by user
     */
    @GetMapping("/getReviewByUser")
    public ResponseEntity<List<Object[]>> getReviewByUser() {
        return ResponseEntity.ok((reviewService.getAll()));
    }
}
