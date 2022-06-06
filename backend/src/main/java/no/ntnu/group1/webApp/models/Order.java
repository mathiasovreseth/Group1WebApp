package no.ntnu.group1.webApp.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.util.Date;

/**
 * Represents an order.
 */
@Getter
@ToString
@Setter
@Entity
@Table(name = "orders")
public class Order {
    private @Id
    @GeneratedValue
    Long id;
    @ManyToOne
    private User costumer;
    @OneToOne
    private Product product;
    private Date orderDate;
    private Date startDate;
    private Date endDate;
    private int attendees;
    private boolean processed;
    private String language;


    /**
     * Instantiates a new Order.
     */
    public Order() {
    }

    /**
     * Instantiates a new Order.
     *
     * @param costumer  the costumer
     * @param product   the product
     * @param orderDate the order date
     * @param startDate the start date of the course
     * @param endDate   the end date of the course
     * @param attendees the number of attendees
     * @param language  the language the course will be presented in
     */
    public Order(User costumer, Product product, Date orderDate, Date startDate, Date endDate, int attendees, String language) {
        this.costumer = costumer;
        this.product = product;
        this.orderDate = orderDate;
        this.startDate = startDate;
        this.endDate = endDate;
        this.processed = false;
        this.attendees = attendees;
        this.language = language;
    }
}