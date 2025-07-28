package in.org.pawsome.pawsome_server.service;

import in.org.pawsome.pawsome_server.dto.JwtAuthenticationResponse;
import in.org.pawsome.pawsome_server.dto.LoginRequest;
import in.org.pawsome.pawsome_server.dto.SignUpRequest;
import in.org.pawsome.pawsome_server.entity.Credential;
import in.org.pawsome.pawsome_server.entity.Role;
import in.org.pawsome.pawsome_server.entity.User;
import in.org.pawsome.pawsome_server.repository.CredentialRepository;
import in.org.pawsome.pawsome_server.repository.RoleRepository;
import in.org.pawsome.pawsome_server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final CredentialRepository credentialRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public User signup(SignUpRequest signUpRequest) {
        User user = new User();
        user.setFirstName(signUpRequest.getFirstName());
        user.setLastName(signUpRequest.getLastName());
        user.setPhoneNumber(signUpRequest.getPhoneNumber());

        Role userRole = roleRepository.findByName(Role.RoleName.VOLUNTEER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        Set<Role> roles = new HashSet<>();
        roles.add(userRole);
        user.setRoles(roles);

        User savedUser = userRepository.save(user);

        Credential credential = new Credential();
        credential.setUser(savedUser);
        // Generate username from first name.
        // A more robust implementation would check for duplicates and append a number.
        credential.setUsername(signUpRequest.getFirstName().toLowerCase());
        credential.setPasswordHash(passwordEncoder.encode(signUpRequest.getPassword()));

        credentialRepository.save(credential);

        return savedUser;
    }

    public JwtAuthenticationResponse signin(LoginRequest loginRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        var credential = credentialRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Invalid username or password."));
        var jwt = jwtService.generateToken(credential);
        var refreshToken = jwtService.generateRefreshToken(new HashMap<>(), credential);

        JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
        jwtAuthenticationResponse.setToken(jwt);
        jwtAuthenticationResponse.setRefreshToken(refreshToken);
        return jwtAuthenticationResponse;
    }
}
