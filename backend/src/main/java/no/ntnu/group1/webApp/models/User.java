package no.ntnu.group1.webApp.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.boot.configurationprocessor.json.JSONObject;


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

    public enum Roles {
        USER,
        ADMIN
    }
    private @Id @GeneratedValue Long id;
    private String name;
    private String email;
    private String password;
    private String userRole;
    private String token;
    private boolean enabled;
    private Date accountCreated;
    @OneToMany(targetEntity = Review.class)
    List<Review> reviews;


    public User(String name, String email, String password, String userRole) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.userRole = "ADMIN";
        this.enabled = false;
        this.accountCreated = new Date();
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
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + userRole));
        return authorities;
    }

    public static User fromJSONObject(JSONObject jsonObject) throws JSONException{

        String username = jsonObject.getString("username");
        String email = jsonObject.getString("email");
        String password = jsonObject.getString("password");
        String userRole = jsonObject.getString("role");

        return new User(username, email, password, userRole);

    }

//    public boolean isEnabled(){
//        return enabled;
//    }
//    @Override
//    public boolean isAccountNonExpired() {
//        return enabled;
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        return enabled;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return enabled;
//    }

}
