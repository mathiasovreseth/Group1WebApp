package no.ntnu.group1.webApp.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

@Getter
@ToString
@Setter
@Entity
@Table(name = "products")
public class Product {
    String title;
    String description;
    @OneToMany(targetEntity = Review.class)
    List<Review> reviews;
    private @Id
    @GeneratedValue
    Long id;

    public Product() {
    }

    public Product(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public void addReview(Review reviewToBeAdded) {
        this.reviews.add(reviewToBeAdded);
    }
}
