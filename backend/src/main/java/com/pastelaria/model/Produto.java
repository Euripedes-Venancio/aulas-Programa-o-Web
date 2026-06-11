package com.pastelaria.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "produtos")
@Data
@NoArgsConstructor
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    private String imagem;

    @Column(columnDefinition = "TEXT")
    private String descritivo;

    @Column(nullable = false)
    private Double valor;

    private Integer estoque = 0;

    private String keywords;
}
