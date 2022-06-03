package no.ntnu.group1.webApp.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Getter
@ToString
@Setter
@Entity
@Table(name = "orders")
public class Order {
    private @Id @GeneratedValue
    Long id;
    @ManyToOne
    private User costumer;

    @OneToOne
    private Product product;
    private Date orderDate;
    private Date startDate;
    private Date endDate;

    public Order(){}

    public Order(User costumer, Product product, Date orderDate,Date startDate, Date endDate) {
        this.costumer = costumer;
        this.product = product;
        this.orderDate = orderDate;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}