package no.ntnu.group1.webApp.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class User {

    private @Id @GeneratedValue
    Long id;
    private String username;
    private String email;
    private String password;
    private Roles userRole;

    public User() {}

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return username;
    }

    public void setUserName(String firstName) {
        this.username = firstName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String lastName) {
        this.email = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String description) {
        this.password = description;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", firstName='" + username + '\'' +
                ", lastName='" + email + '\'' +
                ", description='" + password + '\'' +
                '}';
    }
}
