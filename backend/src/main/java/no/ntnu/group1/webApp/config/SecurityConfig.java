package no.ntnu.group1.webApp.config;


import no.ntnu.group1.webApp.auth.JwtAuthenticationFilter;
import no.ntnu.group1.webApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    UserService userService;
    @Autowired
    JwtProperties jwtProperties;

    @Override
    protected void configure(HttpSecurity security) throws Exception{
        security.csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilter(new JwtAuthenticationFilter(authenticationManager(),userService, jwtProperties))
                .authorizeHttpRequests()
                //permit logins and registrations
                .antMatchers(HttpMethod.POST, "/api/login").permitAll()
                .antMatchers(HttpMethod.POST, "/api/register").permitAll()
                .antMatchers(HttpMethod.POST, "/api/users/addUser").permitAll()
                .antMatchers(HttpMethod.GET, "/users/getAll").authenticated()
                .antMatchers(HttpMethod.GET, "/orders/getAll").permitAll()
                .antMatchers(HttpMethod.GET, "/products/getAll").hasRole("ADMIN")
                .anyRequest()
                .authenticated()
                .and().httpBasic();
    }


    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
