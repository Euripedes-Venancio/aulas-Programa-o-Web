package com.pastelaria.controller;

import com.pastelaria.model.Produto;
import com.pastelaria.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "http://localhost:4200")
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    // GET /api/produtos
    @GetMapping
    public List<Produto> listar() {
        return produtoRepository.findAll();
    }

    // GET /api/produtos/{id}
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        return produtoRepository.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("erro", "Produto não encontrado.")));
    }

    // GET /api/produtos/buscar?termo=pastel
    @GetMapping("/buscar")
    public List<Produto> buscar(@RequestParam String termo) {
        return produtoRepository.findByNomeContainingIgnoreCaseOrKeywordsContainingIgnoreCase(termo, termo);
    }

    // POST /api/produtos
    // Body: { "nome": "...", "imagem": "...", "descritivo": "...", "valor": 10.0, "estoque": 20, "keywords": "..." }
    @PostMapping
    public ResponseEntity<Produto> criar(@RequestBody Produto produto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(produtoRepository.save(produto));
    }

    // PUT /api/produtos/{id}
        @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody Produto dados) {
        return produtoRepository.findById(id)
            .<ResponseEntity<?>>map(p -> {
                p.setNome(dados.getNome());
                p.setImagem(dados.getImagem());
                p.setDescritivo(dados.getDescritivo());
                p.setValor(dados.getValor());
                p.setEstoque(dados.getEstoque());
                p.setKeywords(dados.getKeywords());

                Produto produtoAtualizado = produtoRepository.save(p);
                return ResponseEntity.ok(produtoAtualizado);
            })
            .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("erro", "Produto não encontrado.")));
    }

    // DELETE /api/produtos/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        if (!produtoRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("erro", "Produto não encontrado."));
        }
        produtoRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("mensagem", "Produto removido."));
    }
}
