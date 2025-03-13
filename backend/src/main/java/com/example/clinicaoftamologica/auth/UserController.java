package com.example.clinicaoftamologica.auth;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping
    public Map<String, Object> getUserInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // Adicionando log para verificação
        if (authentication == null) {
            System.out.println("Authentication is null");
            return Map.of("error", "Usuário não autenticado");
        }

        System.out.println("Authentication: " + authentication);  // Log para verificação

        // Verificando se o principal é uma instância de JwtAuthenticationToken
        if (authentication.getPrincipal() instanceof Jwt) {
            Jwt jwt = (Jwt) authentication.getPrincipal();
            Map<String, Object> claims = jwt.getClaims();

            // Log para verificar as claims do JWT
            // System.out.println("JWT Claims in Controller: " + claims);

            return Map.of(
                "name", claims.get("name"),
                "email", claims.get("email"),
                "preferred_username", claims.get("preferred_username"),
                "roles", claims.get("realm_access")
            );
        }

        return Map.of("error", "Usuário não autenticado");
    }
}



