package com.example.demo;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.stereotype.Component;


import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;


@Component
public class JwtUtil {
    private final String SECRET_KEY = "Nskf@A9z!2k!mfXZ9#ok!pq*le9aLrzR#m#&KfnmZ"; // Use uma chave mais segura para produção
    private final long EXPIRATION_TIME = 86400000; // 24 horas em milissegundos

      private Instant generateExpirationDate() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.ofHours(-3));
    }

    public String generateToken(String email) {
        Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);
        return JWT.create()
        .withIssuer("ijb")
        .withSubject(email)
        .withExpiresAt(this.generateExpirationDate())
        .sign(algorithm);
    }

  //  public boolean validateToken(String token, String email) {
   //     String emailFromToken = extractEmail(token);
  //      return emailFromToken.equals(email) && !isTokenExpired(token);
  //  }

    
   
}
