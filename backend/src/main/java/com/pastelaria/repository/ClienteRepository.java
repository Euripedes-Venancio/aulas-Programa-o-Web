package com.pastelaria.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.pastelaria.model.Cliente;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    Optional<Cliente> findByEmail(String email);
    boolean existsByEmail(String email);
}