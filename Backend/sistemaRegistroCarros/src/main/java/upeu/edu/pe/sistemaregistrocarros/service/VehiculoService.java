package upeu.edu.pe.sistemaregistrocarros.service;

import upeu.edu.pe.sistemaregistrocarros.entity.Vehiculo;

import java.util.List;
import java.util.Optional;

public interface VehiculoService {

    public Vehiculo registrarVehiculo(Vehiculo Vehiculo);

    public List<Vehiculo> listarVehiculos();

    public Vehiculo listarVehiculoPorId(Long idVehiculo);

    public Vehiculo editarVehiculo(Vehiculo vehiculo);

    public void eliminarVehiculo(Long idVehiculo);
}
