package com.example.demo.controller;

import com.example.demo.dto.PedidoDTO;
import com.example.demo.entity.Pedido;
import com.example.demo.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @GetMapping
    public ResponseEntity<List<Pedido>> listarTodos() {
        return new ResponseEntity<>(pedidoService.listarTodos(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        Optional<Pedido> pedido = pedidoService.buscarPorId(id);
        return pedido.isPresent()
            ? new ResponseEntity<>(pedido.get(), HttpStatus.OK)
            : new ResponseEntity<>("Pedido não encontrado", HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Pedido> salvar(@RequestBody PedidoDTO pedidoDTO) {
        return new ResponseEntity<>(pedidoService.salvar(pedidoDTO), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluir(@PathVariable Long id) {
        try {
            pedidoService.excluir(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>("Erro ao excluir: " + e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
