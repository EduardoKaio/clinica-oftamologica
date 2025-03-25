package com.example.clinicaoftamologica.controller.admin;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PrivateController {

    @GetMapping("/private")
    @PreAuthorize("hasRole('ADMIN')")
    public String privatePage() {
        return "Bem-vindo à página privada!";
    }

    @GetMapping("/public")
    @PreAuthorize("hasRole('USER')")
    public String publicPage() {
        return "Bem-vindo à página publica!";
    }
}
