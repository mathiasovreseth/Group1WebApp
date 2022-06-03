package no.ntnu.group1.webApp.service;

import no.ntnu.group1.webApp.models.Review;
import no.ntnu.group1.webApp.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

  @Autowired
  private ReviewRepository reviewRepository;

  public Optional<Review> findReviewById(Long id) {
    return reviewRepository.findById(id);

  }
  public List<Object[]> getAll() {
    return (List<Object[]>) reviewRepository.getCommentAndUser();
  }
}
