package com.example.demo.service;

import com.example.demo.dto.UsuarioDTO;
import com.example.demo.entity.Usuario;
import com.example.demo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Listar todos os usuários
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    // Buscar um usuário por ID
    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }

     // Buscar um usuário por email
     public Optional<Usuario> buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    // Salvar ou atualizar um usuário
    public Usuario salvarOuAtualizar(UsuarioDTO usuarioDTO) {
        Usuario usuario = new Usuario();
        usuario.setNome(usuarioDTO.getNome());
        usuario.setEmail(usuarioDTO.getEmail());
        usuario.setSenha(usuarioDTO.getSenha());
        usuario.setTelefone(usuarioDTO.getTelefone());
        usuario.setDataAniversario(usuarioDTO.getDataAniversario());
        
        return usuarioRepository.save(usuario);
    }

    // Excluir um usuário por ID
    public void excluir(Long id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Usuário não encontrado.");
        }
    }
}
