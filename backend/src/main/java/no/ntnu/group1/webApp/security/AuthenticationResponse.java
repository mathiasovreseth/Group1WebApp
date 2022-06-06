package no.ntnu.group1.webApp.security;

/**
 * Represents an authentication response.
 */
public class AuthenticationResponse {
    private final String jwt;

    /**
     * Instantiates a new Authentication response.
     *
     * @param jwt the JSON web token
     */
    public AuthenticationResponse(String jwt) {
        this.jwt = jwt;
    }
}
