package com.example.clinicaoftamologica.security;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

public class JWTConverter implements Converter<Jwt, AbstractAuthenticationToken> {
    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {
        // Verificando as claims no JWT para garantir que estamos extraindo as roles corretamente
        // System.out.println("JWT Claims in Converter: " + jwt.getClaims());

        Map<String, Collection<String>> realmAccess = jwt.getClaim("realm_access");
        if (realmAccess == null) {
            return new JwtAuthenticationToken(jwt, List.of());
        }

        Collection<String> roles = realmAccess.get("roles");
        if (roles == null) {
            return new JwtAuthenticationToken(jwt, List.of());
        }

        var grants = roles.stream()
            .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
            .toList();

        return new JwtAuthenticationToken(jwt, grants);
    }
}

