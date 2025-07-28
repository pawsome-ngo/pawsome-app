package in.org.pawsome.pawsome_server.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String username; // Changed from email
    private String password;
}
