package no.ntnu.group1.webApp.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Getter
@Setter
@Entity
public class Product {
    private @Id @GeneratedValue
    Long id;
    String description;

    public Product(){}

    public Product(Long id, String description) {
        this.id = id;
        this.description = description;
    }
}
