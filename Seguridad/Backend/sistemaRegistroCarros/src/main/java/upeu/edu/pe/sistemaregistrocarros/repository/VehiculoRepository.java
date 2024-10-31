package upeu.edu.pe.sistemaregistrocarros.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import upeu.edu.pe.sistemaregistrocarros.entity.Vehiculo;

@Repository

public interface VehiculoRepository extends JpaRepository<Vehiculo, Long> {
    // Métodos de consulta personalizados si es necesario
}