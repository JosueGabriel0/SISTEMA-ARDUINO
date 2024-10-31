package upeu.edu.pe.sistemaregistrocarros.service;

import upeu.edu.pe.sistemaregistrocarros.entity.Tarjeta;

import java.util.List;
import java.util.Optional;

public interface TarjetaService {

    public Optional<Tarjeta> verificarTarjeta(String uid);

    public Tarjeta registrarTarjeta(Tarjeta tarjeta);

    public List<Tarjeta> listarTarjetas();

    public Tarjeta listarTarjetaPorId(Long idTarjeta);

    public Tarjeta editarTarjeta(Tarjeta tarjeta);

    public void eliminarTarjeta(Long idTarjeta);

    public void eliminarTarjetaConVehiculo(Long idTarjeta);
}
