package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "td_item_pedido")
public class ItemPedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_pedido")
    @JsonBackReference  // Define o lado "filho" da relação
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "id_produto")
    private Produto produto;

    private Integer qtde;
    private Double preco;
}
