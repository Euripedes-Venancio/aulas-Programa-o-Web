package com.pastelaria.controller;

import com.pastelaria.model.Cliente;
import com.pastelaria.repository.ClienteRepository;
import com.pastelaria.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private EmailService emailService;

    // POST /api/auth/cadastro
    // Body: { "nome": "João", "email": "joao@email.com", "senha": "123456" }
    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrar(@RequestBody Map<String, String> body) {
        String nome  = body.get("nome");
        String email = body.get("email");
        String senha = body.get("senha");

        if (nome == null || email == null || senha == null) {
            return ResponseEntity.badRequest().body(Map.of("erro", "Preencha todos os campos."));
        }

        if (clienteRepository.existsByEmail(email)) {
            return ResponseEntity.badRequest().body(Map.of("erro", "Email já cadastrado."));
        }

        Cliente cliente = new Cliente();
        cliente.setNome(nome);
        cliente.setEmail(email);
        cliente.setSenha(senha); // sem criptografia, fins acadêmicos

        clienteRepository.save(cliente);
        emailService.enviarEmailCadastro(email, nome);

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
            "mensagem", "Cadastro realizado com sucesso!",
            "nome", cliente.getNome(),
            "email", cliente.getEmail()
        ));
    }

    // POST /api/auth/login
    // Body: { "email": "joao@email.com", "senha": "123456" }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String senha = body.get("senha");

        Optional<Cliente> opt = clienteRepository.findByEmail(email);

        if (opt.isEmpty() || !opt.get().getSenha().equals(senha)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("erro", "Email ou senha incorretos."));
        }

        Cliente cliente = opt.get();
        return ResponseEntity.ok(Map.of(
            "mensagem", "Login realizado com sucesso!",
            "nome", cliente.getNome(),
            "email", cliente.getEmail()
        ));
    }

    // POST /api/auth/logout
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok(Map.of("mensagem", "Logout realizado com sucesso."));
    }
}
