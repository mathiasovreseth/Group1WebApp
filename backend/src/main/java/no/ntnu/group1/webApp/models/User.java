package no.ntnu.group1.webApp.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Objects;


@Getter
@ToString
@Setter
@Entity(name = "users")
public class User {
    public enum Roles {
        USER,
        ADMIN
    }
    private @Id @GeneratedValue Long id;
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

        return Objects.hash(id, username);
    }

    public Roles getUserRole() {
        return userRole;
    }

    public void setUserRole(Roles userRole) {
        this.userRole = userRole;
    }
}
