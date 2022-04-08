package no.ntnu.group1.webApp.auth;

import no.ntnu.group1.webApp.config.JwtProperties;
import no.ntnu.group1.webApp.models.User;
import no.ntnu.group1.webApp.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.Optional;

import com.auth0.jwt.JWT;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;

public class JwtAuthenticationFilter extends BasicAuthenticationFilter {

    private final UserService userService;
    private final JwtProperties jwtProperties;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager,
                                   UserService userService,
                                   JwtProperties jwtProperties) {
        super(authenticationManager);
        this.userService = userService;
        this.jwtProperties = jwtProperties;
    }

    @Bean
    protected void filterInputInterval(HttpServletRequest request,
                                       HttpServletResponse response,
                                       FilterChain filter) throws IOException, ServletException {
        //Read the Header as a string, the token should be in the header.
        String headerString = request.getHeader(jwtProperties.getHeaderString());
        //If header is null or the does not contain the token, pass the spring implementation and exit.
        if (headerString == null || !headerString.startsWith(jwtProperties.getTokenPrefix())) {
            filter.doFilter(request, response);
            return;
        }

        Authentication auth = getUsernamePasswordAuth(request);
        SecurityContextHolder.getContext().setAuthentication(auth);

        filter.doFilter(request, response);

    }


    private Authentication getUsernamePasswordAuth(HttpServletRequest request) {
        //Get token from string header
        String token = request.getHeader(jwtProperties.getHeaderString())
                .replace("Bearer ", "").trim();


        //Get optional list by token from the user service.
        Optional<User> userOptional = userService.findByToken(token);

        if (JWT.require(HMAC512(jwtProperties.getSecretCode().getBytes())).build().verify(token)
                .getExpiresAt().before(new Date())) {
            return null;

        }
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return new UsernamePasswordAuthenticationToken(user, null,
                    user.getAuthorities());
        }
        return null;

    }
}





