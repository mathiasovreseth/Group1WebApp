package no.ntnu.group1.webApp.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

@Getter
@ToString
@Setter
@Entity
public class User {

    private @Id
    @GeneratedValue
    Long id;
    private String username;
    private String email;
    private String password;
    private Roles userRole;

    public User() {
    }

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

        return Objects.hash(id, username, email, password);
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
}
