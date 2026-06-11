package com.pastelaria.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String remetente;

    public void enviarEmailCadastro(String destinatario, String nome) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setFrom(remetente);
            msg.setTo(destinatario);
            msg.setSubject("Bem-vindo à Pastelaria Iogi! 🥟");
            msg.setText(
                "Olá, " + nome + "!\n\n" +
                "Seu cadastro na Pastelaria Iogi foi realizado com sucesso.\n\n" +
                "Agora você pode fazer login e aproveitar nossos pastéis malucos.\n\n" +
                "Coma por sua conta e risco 😈\n\n" +
                "Equipe Pastelaria Iogi"
            );
            mailSender.send(msg);
        } catch (Exception e) {
            System.err.println("Falha ao enviar e-mail de cadastro: " + e.getMessage());
        }
    }

    public void enviarEmailCompra(String destinatario, String nome, double total) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setFrom(remetente);
            msg.setTo(destinatario);
            msg.setSubject("Compra confirmada na Pastelaria Iogi! 🎉");
            msg.setText(
                "Olá, " + nome + "!\n\n" +
                "Sua compra foi realizada com sucesso!\n\n" +
                "Total: R$ " + String.format("%.2f", total) + "\n\n" +
                "Em breve seu pedido estará pronto.\n" +
                "Obrigado por escolher a Pastelaria Iogi!\n\n" +
                "Equipe Pastelaria Iogi"
            );
            mailSender.send(msg);
        } catch (Exception e) {
            System.err.println("Falha ao enviar e-mail de compra: " + e.getMessage());
        }
    }
}
