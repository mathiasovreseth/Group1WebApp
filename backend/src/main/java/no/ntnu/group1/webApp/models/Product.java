package no.ntnu.group1.webApp.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Getter
@ToString
@Setter
@Entity
@Table(name = "products")
public class Product {
    private @Id @GeneratedValue
    Long id;
    String title;
    String description;
    @OneToMany(targetEntity = Review.class)
    List<Review> reviews;

    public Product(){}

    public Product(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public void addReview(Review reviewToBeAdded) {
        this.reviews.add(reviewToBeAdded);
    }
}
