package no.ntnu.group1.webApp.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Getter
@ToString
@Setter
@Entity(name = "product")
public class Product {
    private @Id @GeneratedValue
    Long id;
    String description;
    @OneToMany(targetEntity = Review.class)
    List<Review> reviews;

    public Product(){}

    public Product(String description) {
        this.description = description;
    }

    public void addReview(Review reviewToBeAdded) {
        this.reviews.add(reviewToBeAdded);
    }
}
