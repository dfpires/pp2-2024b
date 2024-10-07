package com.example.demo.controller;

import com.example.demo.dto.UsuarioDTO;
import com.example.demo.entity.Usuario;
import com.example.demo.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // Endpoint para listar todos os usuários
    @GetMapping
    public ResponseEntity<List<Usuario>> listarTodos() {
        List<Usuario> usuarios = usuarioService.listarTodos();
        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }

    // Endpoint para buscar um usuário pelo ID
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        Optional<Usuario> usuario = usuarioService.buscarPorId(id);
        return usuario.isPresent()
            ? new ResponseEntity<>(usuario.get(), HttpStatus.OK)
            : new ResponseEntity<>("Usuário não encontrado", HttpStatus.NOT_FOUND);
    }

    // Endpoint para buscar um usuário pelo email
    @GetMapping("/email")
    public ResponseEntity<?> buscarPorEmail(@RequestParam String email) {
        Optional<Usuario> usuario = usuarioService.buscarPorEmail(email);
        return usuario.isPresent()
            ? new ResponseEntity<>(usuario.get(), HttpStatus.OK)
            : new ResponseEntity<>("Usuário não encontrado", HttpStatus.NOT_FOUND);
    }

    // Endpoint para salvar ou atualizar um usuário
    @PostMapping
    public ResponseEntity<Usuario> salvarOuAtualizar(@RequestBody UsuarioDTO usuarioDTO) {
        Usuario usuario = usuarioService.salvarOuAtualizar(usuarioDTO);
        return new ResponseEntity<>(usuario, HttpStatus.CREATED);
    }

    // Endpoint para excluir um usuário pelo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluir(@PathVariable Long id) {
        try {
            usuarioService.excluir(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>("Erro ao excluir: " + e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
