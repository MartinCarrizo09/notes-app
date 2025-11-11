package com.ensolvers.notes.controller;

import com.ensolvers.notes.config.jwt.JwtUtil;
import com.ensolvers.notes.model.User;
import com.ensolvers.notes.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * Handles authentication-related REST endpoints.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(UserService userService, JwtUtil jwtUtil, BCryptPasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> payload) {
        try {
            String username = payload.get("username");
            String password = payload.get("password");

            if (username == null || username.isEmpty() || password == null || password.isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Username and password are required");
                return ResponseEntity.badRequest().body(error);
            }

            User user = userService.registerUser(username, password);

            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("username", user.getUsername());
            response.put("message", "User registered successfully");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> payload) {
        try {
            String username = payload.get("username");
            String password = payload.get("password");

            if (username == null || username.isEmpty() || password == null || password.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Username and password are required"));
            }

            Optional<User> userOpt = userService.findByUsername(username);
            if (userOpt.isEmpty() || !passwordEncoder.matches(password, userOpt.get().getPassword())) {
                return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
            }

            String token = jwtUtil.generateToken(username);
            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "username", userOpt.get().getUsername()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
