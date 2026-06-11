package com.pastelaria.controller;

import com.pastelaria.model.Cliente;
import com.pastelaria.model.ItemCarrinho;
import com.pastelaria.model.Produto;
import com.pastelaria.repository.ClienteRepository;
import com.pastelaria.repository.ItemCarrinhoRepository;
import com.pastelaria.repository.ProdutoRepository;
import com.pastelaria.service.EmailService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/carrinho")
@CrossOrigin(origins = "http://localhost:4200")
public class CarrinhoController {

    @Autowired
    private ItemCarrinhoRepository itemCarrinhoRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private EmailService emailService;

    // GET 
    @GetMapping
    public ResponseEntity<?> listar(@RequestParam String email) {
        List<Map<String, Object>> itens = itemCarrinhoRepository
                .findByEmailCliente(email)
                .stream()
                .map(this::toMap)
                .collect(Collectors.toList());
        return ResponseEntity.ok(itens);
    }

    // POST /api/carrinho
    // Body: { "email": "joao@email.com", "produtoId": 1, "quantidade": 2 }
    @PostMapping
    public ResponseEntity<?> adicionar(@RequestBody Map<String, Object> body) {
        String email    = (String) body.get("email");
        Long produtoId  = Long.valueOf(body.get("produtoId").toString());
        int quantidade  = Integer.parseInt(body.get("quantidade").toString());

        Optional<Produto> optProduto = produtoRepository.findById(produtoId);
        if (optProduto.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("erro", "Produto não encontrado."));
        }

        Optional<ItemCarrinho> existente =
                itemCarrinhoRepository.findByEmailClienteAndProdutoId(email, produtoId);

        ItemCarrinho item;
        if (existente.isPresent()) {
            item = existente.get();
            item.setQuantidade(item.getQuantidade() + quantidade);
        } else {
            item = new ItemCarrinho();
            item.setEmailCliente(email);
            item.setProduto(optProduto.get());
            item.setQuantidade(quantidade);
        }

        return ResponseEntity.ok(toMap(itemCarrinhoRepository.save(item)));
    }

    // PUT /api/carrinho/{id}
    // Body: { "quantidade": 3 }
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        int quantidade = Integer.parseInt(body.get("quantidade").toString());

        return itemCarrinhoRepository.findById(id).map(item -> {
            item.setQuantidade(quantidade);
            return ResponseEntity.ok((Object) toMap(itemCarrinhoRepository.save(item)));
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("erro", "Item não encontrado.")));
    }

    // DELETE /api/carrinho/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<?> remover(@PathVariable Long id) {
        if (!itemCarrinhoRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("erro", "Item não encontrado."));
        }
        itemCarrinhoRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("mensagem", "Item removido."));
    }
 
    /*
    // POST /api/carrinho/finalizar
    // Body: { "email": "joao@email.com" }
    @PostMapping("/finalizar")
    @Transactional
    public ResponseEntity<?> finalizar(@RequestBody Map<String, String> body) {
        String email = body.get("email");

        List<ItemCarrinho> itens = itemCarrinhoRepository.findByEmailCliente(email);
        if (itens.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("erro", "O carrinho está vazio."));
        }

        double total = itens.stream()
                .mapToDouble(i -> i.getProduto().getValor() * i.getQuantidade())
                .sum();

        // Busca o nome do cliente para o e-mail
        String nome = clienteRepository.findByEmail(email)
                .map(Cliente::getNome)
                .orElse("Cliente");

        itemCarrinhoRepository.deleteByEmailCliente(email);

        emailService.enviarEmailCompra(email, nome, total);

        return ResponseEntity.ok(Map.of(
            "mensagem", "Compra realizada com sucesso! 🎉",
            "total", total
        ));
    }
*/
    // ---- Helper ----
    private Map<String, Object> toMap(ItemCarrinho item) {
        return Map.of(
            "id",            item.getId(),
            "produtoId",     item.getProduto().getId(),
            "nomeProduto",   item.getProduto().getNome(),
            "imagemProduto", item.getProduto().getImagem() != null ? item.getProduto().getImagem() : "",
            "valorUnitario", item.getProduto().getValor(),
            "quantidade",    item.getQuantidade(),
            "subtotal",      item.getProduto().getValor() * item.getQuantidade()
        );
    } 
   @PostMapping("/finalizar")
@Transactional
public ResponseEntity<?> finalizar(@RequestBody Map<String, String> body) {
    String email = body.get("email");

    List<ItemCarrinho> itens = itemCarrinhoRepository.findByEmailCliente(email);

    if (itens.isEmpty()) {
        return ResponseEntity.badRequest()
                .body(Map.of("erro", "O carrinho está vazio."));
    }

    // Atualiza o estoque dos produtos
    for (ItemCarrinho item : itens) {
        Produto produto = item.getProduto();

        int novoEstoque = produto.getEstoque() - item.getQuantidade();

        if (novoEstoque < 0) {
            return ResponseEntity.badRequest().body(
                    Map.of("erro",
                            "Estoque insuficiente para o produto: " + produto.getNome())
            );
        }

        produto.setEstoque(novoEstoque);
        produtoRepository.save(produto);
    }

    double total = itens.stream()
            .mapToDouble(i -> i.getProduto().getValor() * i.getQuantidade())
            .sum();

    // Busca o nome do cliente para o e-mail
    String nome = clienteRepository.findByEmail(email)
            .map(Cliente::getNome)
            .orElse("Cliente");

    // Limpa o carrinho
    itemCarrinhoRepository.deleteByEmailCliente(email);

    // Envia o e-mail de confirmação
    emailService.enviarEmailCompra(email, nome, total);

    return ResponseEntity.ok(Map.of(
            "mensagem", "Compra realizada com sucesso! 🎉",
            "total", total
    ));
}
}
