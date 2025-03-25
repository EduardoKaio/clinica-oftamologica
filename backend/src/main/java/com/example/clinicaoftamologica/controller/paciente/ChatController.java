package com.example.clinicaoftamologica.controller.paciente;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/paciente/chat")
public class ChatController {

    @Value("${openai.api.key}") // Coloque sua chave no application.properties
    private String apiKey;

    @PostMapping
    @PreAuthorize("hasRole('PACIENTE')")
    public ResponseEntity<String> chatWithAI(@RequestBody Map<String, String> request) {
        String userMessage = request.get("message");
        String openaiUrl = "https://api.openai.com/v1/chat/completions";

        RestTemplate restTemplate = new RestTemplate();
        Map<String, Object> requestBody = Map.of(
            "model", "gpt-3.5-turbo", // Use um modelo disponível
            "messages", new Object[]{ Map.of("role", "user", "content", userMessage) },
            "max_tokens", 100
        );

        ResponseEntity<Map> response = restTemplate.postForEntity(
            openaiUrl,
            new org.springframework.http.HttpEntity<>(requestBody, createHeaders()),
            Map.class
        );

        return ResponseEntity.ok(response.getBody().get("choices").toString());
    }
    @PreAuthorize("hasRole('PACIENTE')")
    private org.springframework.http.HttpHeaders createHeaders() {
        org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.set("Content-Type", "application/json");
        return headers;
    }
}