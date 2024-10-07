package com.example.demo.controller;

import com.example.demo.dto.ProdutoDTO;
import com.example.demo.entity.Produto;
import com.example.demo.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @GetMapping
    public ResponseEntity<List<Produto>> listarTodos() {
        return new ResponseEntity<>(produtoService.listarTodos(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        Optional<Produto> produto = produtoService.buscarPorId(id);
        return produto.isPresent() 
            ? new ResponseEntity<>(produto.get(), HttpStatus.OK) 
            : new ResponseEntity<>("Produto não encontrado", HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Produto> salvar(@RequestBody ProdutoDTO produtoDTO) {
        return new ResponseEntity<>(produtoService.salvar(produtoDTO), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluir(@PathVariable Long id) {
        try {
            produtoService.excluir(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>("Erro ao excluir: " + e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
