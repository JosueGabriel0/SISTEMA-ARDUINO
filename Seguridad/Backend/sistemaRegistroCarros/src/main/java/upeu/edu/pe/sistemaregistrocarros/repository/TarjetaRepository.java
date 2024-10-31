package upeu.edu.pe.sistemaregistrocarros.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import upeu.edu.pe.sistemaregistrocarros.entity.Tarjeta;

import java.util.Optional;

@Repository

public interface TarjetaRepository extends JpaRepository<Tarjeta, Long> {
    Optional<Tarjeta> findByUid(String uid);
}