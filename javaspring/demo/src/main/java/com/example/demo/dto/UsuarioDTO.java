package com.example.demo.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class UsuarioDTO {
    private Long id;
    private String email;
    private String nome;
    private String telefone;
    private String senha;
    private LocalDate dataAniversario;
}
