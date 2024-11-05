package com.example.demo.service;

import com.example.demo.JwtUtil;
import com.example.demo.dto.UsuarioDTO;
import com.example.demo.entity.Usuario;
import com.example.demo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

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
        // Criptografa a senha
        String senhaCriptografada = passwordEncoder.encode(usuarioDTO.getSenha());
        usuario.setSenha(senhaCriptografada);

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

    public String autentica(String email, String senha) {
        // Buscar o usuário pelo email
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Email/Senha não encontradas"));

        // Verificar a senha usando BCrypt
        if (passwordEncoder.matches(senha, usuario.getSenha())) {
            // Gerar o token JWT se a senha for válida
            // uma das informações do token é o payload (email)
            return jwtUtil.generateToken(email);
        } else {
            throw new IllegalArgumentException("Email/Senha inválidas");
        }
    }
}
