package in.org.pawsome.pawsome_server.controller;

import in.org.pawsome.pawsome_server.dto.JwtAuthenticationResponse;
import in.org.pawsome.pawsome_server.dto.LoginRequest;
import in.org.pawsome.pawsome_server.dto.SignUpRequest;
import in.org.pawsome.pawsome_server.entity.User;
import in.org.pawsome.pawsome_server.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody SignUpRequest signUpRequest) {
        return ResponseEntity.ok(authenticationService.signup(signUpRequest));
    }

    @PostMapping("/signin")
    public ResponseEntity<JwtAuthenticationResponse> signin(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authenticationService.signin(loginRequest));
    }
}
