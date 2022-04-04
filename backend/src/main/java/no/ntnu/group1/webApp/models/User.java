package no.ntnu.group1.webApp.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.boot.configurationprocessor.json.JSONObject;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.*;


@Getter
@ToString
@Setter
@Entity(name = "users")
public class User {


    public User() {
    }

    public enum Roles {
        USER,
        ADMIN
    }
    private @Id @GeneratedValue Long id;
    private String username;
    private String email;
    private String password;
    private Roles userRole;


    public User(String userName, String email, String password, Roles userRole) {
        this.username = userName;
        this.email = email;
        this.password = password;
        this.userRole = userRole;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User employee = (User) o;
        return Objects.equals(id, employee.id) &&
                Objects.equals(username, employee.username) &&
                Objects.equals(email, employee.email) &&
                Objects.equals(password, employee.password);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, username);
    }

    public Roles getUserRole() {
        return userRole;
    }

    public void setUserRole(Roles userRole) {
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
        Roles userRole = Roles.valueOf(jsonObject.getString(Arrays.toString(Roles.values())));

        return new User(username, email, password, userRole);

    }

}