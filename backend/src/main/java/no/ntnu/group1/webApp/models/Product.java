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

/**
 * Represents a product.
 */
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

    /**
     * Instantiates a new Product.
     */
    public Product() {
    }

    /**
     * Instantiates a new Product.
     *
     * @param title       the title of the product
     * @param description the description of the product
     */
    public Product(String title, String description) {
        this.checkForNullAndBlank(title);
        this.checkForNullAndBlank(description);

        this.title = title;
        this.description = description;
    }

    /**
     * Add review.
     *
     * @param reviewToBeAdded the review to be added
     */
    public void addReview(Review reviewToBeAdded) {
        this.reviews.add(reviewToBeAdded);
    }

    /**
     * Checks the parameter against {@code null} and blank string.
     * Throws IllegalArgumentException if the argument is null or blank.
     *
     * @param text the text to be checked
     */
    private void checkForNullAndBlank(String text) {
        if (text == null) {
            throw new IllegalArgumentException("Parameter can not be null");
        }

        if (text.isBlank()) {
            throw new IllegalArgumentException("Parameter can not be empty");
        }
    }
}
