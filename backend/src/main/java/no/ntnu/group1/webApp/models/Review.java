package no.ntnu.group1.webApp.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Getter
@Setter
@Entity
public class Review {

  @Id
  @GeneratedValue
  private Long id;
  private String comment;

  public Review() {}

  public Review(String comment) {
    this.comment = comment;
  }
}
