package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(requests -> requests
                        .requestMatchers("/api/usuarios/**").permitAll()  // Permite acesso a todos os endpoints de usuário
                        .requestMatchers("/api/produtos/**").permitAll()  // Permite acesso a todos os endpoints de produtos
                        .requestMatchers("/api/pedidos/**").permitAll()
                        .requestMatchers("/api/login/**").permitAll()
                        .anyRequest().authenticated());  // Bloqueia todos os outros endpoints
        return http.build();
    }
}
