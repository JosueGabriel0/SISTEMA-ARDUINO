package upeu.edu.pe.sistemaregistrocarros.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Tarjeta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String uid;  // UID de la tarjeta RFID

    @ManyToOne
    @JoinColumn(name = "vehiculo_id")
    private Vehiculo vehiculo;
}