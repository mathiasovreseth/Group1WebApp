package no.ntnu.group1.webApp.controller;

import no.ntnu.group1.webApp.models.Review;
import no.ntnu.group1.webApp.service.ReviewService;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

  private final ReviewService reviewService;


  public ReviewController(ReviewService reviewService) {
    this.reviewService = reviewService;
  }

  @GetMapping("/{id}")
  public ResponseEntity<Optional<Review>> getReviewById(@PathVariable("id") Long id) {
    return ResponseEntity.ok(reviewService.findReviewById(id));
  }

  @GetMapping("/getReviewByUser")
  public ResponseEntity<List<String>> getReviewByUser() {
    return ResponseEntity.ok((reviewService.getAll()));
  }
}
