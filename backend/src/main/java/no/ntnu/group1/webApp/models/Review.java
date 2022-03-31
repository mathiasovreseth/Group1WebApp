package no.ntnu.group1.webApp.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Getter
@ToString
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
