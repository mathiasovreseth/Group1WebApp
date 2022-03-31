package no.ntnu.group1.webApp.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@ConfigurationProperties(prefix = "jwt.properties")
@Configuration
@Setter
@Getter
public class JwtProperties {

    private String secretCode;
    private int expirationTime;
    private String tokenPrefix;
    private String headerString;
}