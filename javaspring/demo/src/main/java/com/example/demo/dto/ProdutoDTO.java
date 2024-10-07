package com.example.demo.dto;

import lombok.Data;

@Data
public class ProdutoDTO {
    private Long id;
    private String descricao;
    private String nome;
    private String urlImagem;
    private Double preco;
}