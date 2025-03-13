package com.example.clinicaoftamologica.config;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KeycloakConfig {

    @Bean
    public Keycloak keycloak() {
        return KeycloakBuilder.builder()
                .serverUrl("http://localhost:8080") // URL do Keycloak
                .realm("clinica-oftamologica") // Realm administrativo
                .grantType(OAuth2Constants.PASSWORD) // Tipo de autenticação
                .clientId("admin-cli") // Cliente administrativo do Keycloak
                .username("admin") // Usuário administrador do Keycloak
                .password("admin123") // Senha do administrador
                .build();
    }
}
