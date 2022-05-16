package no.ntnu.group1.webApp.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.json.JSONException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.json.JSONObject;


import javax.persistence.*;
import java.util.*;


@Getter
@ToString
@Setter
@Entity
@Table(name = "users")
public class User {


    public User() {
    }

    //TODO: Remove enum when admin privileges is implemented
    public enum Roles {
        USER,
        ADMIN
    }

    private @Id
    @GeneratedValue
    Long id;
    private String name;
    private String email;
    private String password;
    private String role;
    private String token;
    private boolean enabled;
    private Date accountCreated;
    @OneToMany(targetEntity = Review.class)
    List<Review> reviews;


    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.enabled = false;
        this.accountCreated = new Date();

        if (this.name.equalsIgnoreCase("admin")) {
            this.role = "ADMIN";
        } else {
            this.role = "USER";
        }
    }

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

    public String getUserRole() {
        return this.role;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(getUserRole()));
        return authorities;
    }

    public static User fromJSONObject(JSONObject jsonObject) throws JSONException {

        String username = jsonObject.getString("username");
        String email = jsonObject.getString("email");
        String password = jsonObject.getString("password");


        return new User(username, email, password);

    }
}
