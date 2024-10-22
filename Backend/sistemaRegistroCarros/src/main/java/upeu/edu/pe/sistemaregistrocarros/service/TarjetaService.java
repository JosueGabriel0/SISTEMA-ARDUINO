package upeu.edu.pe.sistemaregistrocarros.service;

import upeu.edu.pe.sistemaregistrocarros.entity.Tarjeta;

import java.util.Optional;

public interface TarjetaService {

    public Optional<Tarjeta> verificarTarjeta(String uid);

    public Tarjeta registrarTarjeta(Tarjeta tarjeta);
}
