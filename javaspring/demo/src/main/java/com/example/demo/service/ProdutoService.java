package com.example.demo.service;

import com.example.demo.dto.ProdutoDTO;
import com.example.demo.entity.Produto;
import com.example.demo.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    public Optional<Produto> buscarPorId(Long id) {
        return produtoRepository.findById(id);
    }

    public Produto salvar(ProdutoDTO produtoDTO) {
        Produto produto = new Produto();
        produto.setNome(produtoDTO.getNome());
        produto.setDescricao(produtoDTO.getDescricao());
        produto.setUrlImagem(produtoDTO.getUrlImagem());
        produto.setPreco(produtoDTO.getPreco());
        return produtoRepository.save(produto);
    }

    public void excluir(Long id) {
        if (produtoRepository.existsById(id)) {
            produtoRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Produto não encontrado.");
        }
    }
}
