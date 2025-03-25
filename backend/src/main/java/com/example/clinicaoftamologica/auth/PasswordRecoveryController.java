package com.example.clinicaoftamologica.auth;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class PasswordRecoveryController {

    @Autowired
    private Keycloak keycloak;

    @PostMapping("/recover-password")
    public ResponseEntity<String> recoverPassword(@RequestBody String email) {
        // Remover aspas e espaços extras
        final String processedEmail = email.replaceAll("\"", "").trim();
        if (processedEmail == null || processedEmail.isEmpty()) {
            return ResponseEntity.badRequest().body("E-mail inválido.");
        }

        UsersResource usersResource = keycloak.realm("clinica-oftamologica").users();
        // Tenta buscar com correspondência não exata
        var users = usersResource.searchByEmail(processedEmail, false);

        // Se não encontrar, tenta buscar filtrando manualmente a listagem completa
        if (users.isEmpty()) {
            var allUsers = usersResource.list();
            users = allUsers.stream()
                    .filter(u -> processedEmail.equalsIgnoreCase(u.getEmail()))
                    .collect(Collectors.toList());
        }

        System.out.println("Usuários encontrados: " + users.size());
        for (var user : users) {
            System.out.println("ID: " + user.getId() + " | Email: " + user.getEmail());
        }
        if (users.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("E-mail não encontrado.");
        }

        String userId = users.get(0).getId();
        UserResource userResource = usersResource.get(userId);
        try {
            userResource.executeActionsEmail(List.of("UPDATE_PASSWORD"));
        } catch (Exception e) {
            e.printStackTrace();
            // Sugere verificar a configuração SMTP no Keycloak
            String errorMsg = "Erro ao enviar e-mail. Verifique a configuração do SMTP no Keycloak. Detalhes: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMsg);
        }

        return ResponseEntity.ok("E-mail de recuperação de senha enviado.");
    }
}
