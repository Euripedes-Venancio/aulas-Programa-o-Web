package com.pastelaria.repository;
import com.pastelaria.model.ItemCarrinho;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ItemCarrinhoRepository extends JpaRepository<ItemCarrinho, Long> {
    List<ItemCarrinho> findByEmailCliente(String emailCliente);
    Optional<ItemCarrinho> findByEmailClienteAndProdutoId(String emailCliente, Long produtoId);
    void deleteByEmailCliente(String emailCliente);
}
