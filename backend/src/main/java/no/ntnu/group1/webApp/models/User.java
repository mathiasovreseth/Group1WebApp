package no.ntnu.group1.webApp.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Objects;


/**
 * Represents a user.
 */
@Getter
@ToString
@Setter
@Entity
@Table(name = "users")
public class User {
    @OneToMany(targetEntity = Review.class, fetch = FetchType.EAGER)
    List<Review> reviews;
    private @Id
    @GeneratedValue
    Long id;
    private String name;
    private String email;
    private String password;
    private String role;
    private boolean enabled;
    private Date accountCreated;

    /**
     * Instantiates a new User.
     */
    public User() {
    }

    /**
     * Instantiates a new User.
     *
     * @param name     the name of the user
     * @param email    the email of the user
     * @param password the password of the user
     */
    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.enabled = true;
        this.accountCreated = new Date();

        if (this.name.equalsIgnoreCase("admin")) {
            this.role = "ADMIN";
        } else {
            this.role = "USER";
        }
    }


    /**
     * Add review.
     *
     * @param review the review to be added
     */
    public void addReview(Review review) {
        this.reviews.add(review);
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User employee = (User) o;
        return Objects.equals(id, employee.id) &&
                Objects.equals(name, employee.name) &&
                Objects.equals(email, employee.email) &&
                Objects.equals(password, employee.password);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, name);
    }

    /**
     * Gets user role.
     *
     * @return the role of the user
     */
    public String getUserRole() {
        return this.role;
    }

    /**
     * Gets authorities.
     *
     * @return the authorities of the user
     */
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(getUserRole()));
        return authorities;
    }
}
