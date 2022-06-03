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

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
//    @Autowired
//    private UserDetailsService userDetailsService;
    @Autowired
    private JwtRequestFilter jwtRequestFilter;

//    /**
//     * This method will be called automatically by the framework to find out what authentication to use.
//     * Here we tell that we want to load users from a database
//     *
//     * @param auth Authentication builder
//     * @throws Exception
//     */
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.userDetailsService(userDetailsService);
//    }
    @CrossOrigin
    @Override
    protected void configure(HttpSecurity security) throws Exception{
        security.cors().and().csrf().disable()
                .authorizeRequests()
                //permit logins and registrations
                .antMatchers(HttpMethod.POST, "/api/users/addUser").permitAll()
                .antMatchers(HttpMethod.POST, "/api/auth/register").permitAll()
                .antMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
                .antMatchers(HttpMethod.GET, "/api/users/getAll").permitAll()
                .antMatchers(HttpMethod.GET, "/api/orders/getAll").permitAll()
                .antMatchers(HttpMethod.GET, "/api/products/getAll").permitAll()
                .antMatchers(HttpMethod.POST, "/api/orders/add").permitAll()
                .antMatchers(HttpMethod.GET, "/api/reviews/getReviewByUser").permitAll()
                .anyRequest().authenticated()
                .and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        security.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

    }


//    /**
//     * This is needed since Spring Boot 2.0, see
//     * https://stackoverflow.com/questions/52243774/consider-defining-a-bean-of-type-org-springframework-security-authentication-au
//     *
//     * @return
//     * @throws Exception
//     */
//    @Bean
//    @Override
//    public AuthenticationManager authenticationManagerBean() throws Exception {
//        return super.authenticationManagerBean();
//    }
//    @Bean
//    public PasswordEncoder getPasswordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//
}
