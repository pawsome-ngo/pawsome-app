package in.org.pawsome.pawsome_server.dto;

import lombok.Data;

@Data
public class SignUpRequest {
    private String firstName;
    private String lastName;
    private String phoneNumber;
    // Email is no longer needed for signup, as username is generated
    private String password;
}
