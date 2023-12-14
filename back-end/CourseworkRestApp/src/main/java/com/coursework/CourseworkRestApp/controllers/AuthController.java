package com.coursework.CourseworkRestApp.controllers;

import com.coursework.CourseworkRestApp.models.AuthLogEntry;
import com.coursework.CourseworkRestApp.models.User;

import com.coursework.CourseworkRestApp.services.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;
    private final RedisTemplate<String, String> redisTemplate;
    private static final String LOG_KEY = "auth_logs";

    public AuthController(UserService userService, RedisTemplate<String, String> redisTemplate) {
        this.userService = userService;
        this.redisTemplate = redisTemplate;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) throws JsonProcessingException {
        String email = credentials.get("email");
        String password = credentials.get("password");

        User user = userService.getUserByEmail(email);

        if (user != null && user.getPassword().equals(password)) {
            // Успешная аутентификация
            Map<String, Object> response = new HashMap<>();
            response.put("user", user);

            // Добавляем запись в лог
            AuthLogEntry logEntry = new AuthLogEntry();
            logEntry.setUserId(String.valueOf(user.getId()));
            logEntry.setTimestamp(LocalDateTime.now().toString());

            String logJson = logEntry.toJson();
            redisTemplate.opsForList().leftPush(LOG_KEY, logJson);
            redisTemplate.opsForList().trim(LOG_KEY, 0, 9);

            return ResponseEntity.ok(response);
        } else {
            // Ошибка аутентификации
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Authentication failed");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @GetMapping("/logs")
    public ResponseEntity<List<AuthLogEntry>> getAuthLogs() {
        List<String> logStrings = redisTemplate.opsForList().range(LOG_KEY, 0, -1);

        ObjectMapper objectMapper = new ObjectMapper();
        List<AuthLogEntry> authLogs = logStrings.stream()
                .map(logString -> {
                    try {
                        return objectMapper.readValue(logString, AuthLogEntry.class);
                    } catch (JsonProcessingException e) {
                        // Handle exception or log an error, depending on your requirements
                        e.printStackTrace();
                        return null;
                    }
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(authLogs);
    }
}

