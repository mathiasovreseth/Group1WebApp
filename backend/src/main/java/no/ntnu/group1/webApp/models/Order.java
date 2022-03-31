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
@Entity(name="order")
public class Order {
    private @Id @GeneratedValue
    Long id;
    @ManyToOne
    private User costumer;
    @OneToMany(targetEntity = Product.class)
    private List product;
    private Date orderDate;

    public Order(){}

    public Order(Long id, User costumer, List product, Date orderDate) {
        this.id = id;
        this.costumer = costumer;
        this.product = product;
        this.orderDate = orderDate;
    }
}