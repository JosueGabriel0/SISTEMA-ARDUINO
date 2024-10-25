package upeu.edu.pe.sistemaregistrocarros.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import upeu.edu.pe.sistemaregistrocarros.entity.Tarjeta;
import upeu.edu.pe.sistemaregistrocarros.entity.Vehiculo;
import upeu.edu.pe.sistemaregistrocarros.repository.TarjetaRepository;
import upeu.edu.pe.sistemaregistrocarros.repository.VehiculoRepository;
import upeu.edu.pe.sistemaregistrocarros.service.VehiculoService;

import java.util.List;
import java.util.Optional;

@Service
public class VehiculoServiceImpl implements VehiculoService {

    @Autowired
    private VehiculoRepository vehiculoRepository;

    @Override
    public Vehiculo registrarVehiculo(Vehiculo Vehiculo) {
        return vehiculoRepository.save(Vehiculo);
    }

    @Override
    public List<Vehiculo> listarVehiculos() {
        return vehiculoRepository.findAll();
    }

    @Override
    public Vehiculo listarVehiculoPorId(Long idVehiculo) {
        return vehiculoRepository.findById(idVehiculo).get();
    }

    @Override
    public Vehiculo editarVehiculo(Vehiculo vehiculo) {
        return vehiculoRepository.save(vehiculo);
    }

    @Override
    public void eliminarVehiculo(Long idVehiculo) {
        vehiculoRepository.deleteById(idVehiculo);
    }
}