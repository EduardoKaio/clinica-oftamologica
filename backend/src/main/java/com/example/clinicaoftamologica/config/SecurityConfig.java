package com.example.clinicaoftamologica.config;

import org.keycloak.adapters.springsecurity.KeycloakConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@KeycloakConfiguration
public class SecurityConfig {

    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(requests -> requests
                .requestMatchers("/private").authenticated()  // Protege apenas /private
                .anyRequest().permitAll()  // Permite o acesso sem autenticação para outras URLs
            )
            .oauth2Login(withDefaults());  // Configuração de login com OAuth2 (via Keycloak)

        return http.build();
    }
    
}