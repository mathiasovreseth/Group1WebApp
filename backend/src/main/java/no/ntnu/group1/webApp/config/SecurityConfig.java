package no.ntnu.group1.webApp.config;


import no.ntnu.group1.webApp.security.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 * Represents the security config of the application.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtRequestFilter jwtRequestFilter;


    /**
     * Defines the security config for the different mappings used by the application.
     *
     * @param security the HttpSecurity
     * @throws Exception
     */
    @CrossOrigin
    @Override
    protected void configure(HttpSecurity security) throws Exception {
        security.cors().and().csrf().disable()
                .authorizeRequests()
                //permit logins and registrations
                .antMatchers(HttpMethod.POST, "/api/users/addUser").permitAll()
                .antMatchers(HttpMethod.POST, "/api/auth/register").permitAll()
                .antMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
                .antMatchers(HttpMethod.GET, "/api/orders/getAll").permitAll()
                .antMatchers(HttpMethod.GET, "/api/products/getAll").permitAll()
                .antMatchers(HttpMethod.GET, "/api/reviews/getReviewByUser").permitAll()
                .antMatchers(HttpMethod.GET, "/api/users/getAll").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.POST, "/api/users/delete").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.PUT, "/api/users/update").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/api/products/remove").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.PUT, "/api/products/update").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.POST, "/api/products/add").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.PUT, "/api/orders/process-order").hasAuthority("ADMIN")
                .anyRequest().authenticated()
                .and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        security.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
