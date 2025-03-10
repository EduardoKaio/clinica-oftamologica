package com.example.clinicaoftamologica.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PrivateController {
    @GetMapping("/private")
    public String privatePage() {
        return "Bem-vindo à página privada!";
    }
}
