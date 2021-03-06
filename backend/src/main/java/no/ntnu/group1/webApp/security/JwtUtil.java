package no.ntnu.group1.webApp.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import no.ntnu.group1.webApp.models.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.function.Function;

/**
 * Utility class for handling JWT tokens
 * Code from https://youtu.be/X80nJ5T7YpE
 */
@Component
public class JwtUtil {
    /**
     * Key inside JWT token where roles are stored
     */
    private static final String JWT_AUTH_KEY = "roles";
    @Value("${jwt_secret_key}")
    private String SECRET_KEY;

    /**
     * Generate a JWT token for an authenticated user
     *
     * @param userDetails Object containing user details
     * @return JWT token string
     */
    public String generateToken(User userDetails) {
        final long TIME_NOW = System.currentTimeMillis();
        final long MILLISECONDS_IN_HOUR = 60 * 60 * 1000;
        final long TIME_AFTER_ONE_HOUR = TIME_NOW + MILLISECONDS_IN_HOUR;

        return Jwts.builder()
                .setSubject(userDetails.getEmail())
                .claim(JWT_AUTH_KEY, userDetails.getAuthorities())
                .claim("userID", userDetails.getId())
                .claim("userName", userDetails.getName())
                .setIssuedAt(new Date(TIME_NOW))
                .setExpiration(new Date(TIME_AFTER_ONE_HOUR))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    /**
     * Find username from a JWT token
     *
     * @param token JWT token
     * @return Username
     */
    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Check if a token is valid for a given user
     *
     * @param token       Token to validate
     * @param userDetails Object containing user details
     * @return True if the token matches the current user and is still valid
     */
    public Boolean validateToken(String token, User userDetails) {
        final String email = extractEmail(token);
        return email.equals(userDetails.getEmail()) && !isTokenExpired(token);
    }


    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
}

