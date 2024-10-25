package upeu.edu.pe.sistemaregistrocarros.service.impl;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import upeu.edu.pe.sistemaregistrocarros.entity.Tarjeta;
import upeu.edu.pe.sistemaregistrocarros.entity.Vehiculo;
import upeu.edu.pe.sistemaregistrocarros.repository.TarjetaRepository;
import upeu.edu.pe.sistemaregistrocarros.repository.VehiculoRepository;
import upeu.edu.pe.sistemaregistrocarros.service.TarjetaService;

import java.util.List;
import java.util.Optional;

@Service
public class TarjetaServiceImpl implements TarjetaService {

    @Autowired
    private TarjetaRepository tarjetaRepository;

    @Autowired
    private VehiculoRepository vehiculoRepository;

    @Override
    public Optional<Tarjeta> verificarTarjeta(String uid) {
        return tarjetaRepository.findByUid(uid);
    }

    @Override
    public Tarjeta registrarTarjeta(Tarjeta tarjeta) {
        // Verificar si el vehículo ya está guardado en la base de datos
        Vehiculo vehiculo = tarjeta.getVehiculo();
        if (vehiculo != null && vehiculo.getIdVehiculo() == null) {
            // Si el vehículo no está persistido, guardarlo primero
            vehiculo = vehiculoRepository.save(vehiculo);
            tarjeta.setVehiculo(vehiculo);
        }

        // Ahora guardar la tarjeta con el vehículo persistido
        return tarjetaRepository.save(tarjeta);
    }

    @Override
    public List<Tarjeta> listarTarjetas(){
        return tarjetaRepository.findAll();
    }

    @Override
    public Tarjeta listarTarjetaPorId(Long idTarjeta){
        return tarjetaRepository.findById(idTarjeta).get();
    }

    @Override
    public Tarjeta editarTarjeta(Tarjeta tarjeta){
        // Verificar si el vehículo ya está guardado en la base de datos
        Vehiculo vehiculo = tarjeta.getVehiculo();
        if (vehiculo != null && vehiculo.getIdVehiculo() == null) {
            // Si el vehículo no está persistido, guardarlo primero
            vehiculo = vehiculoRepository.save(vehiculo);
            tarjeta.setVehiculo(vehiculo);
        }

        // Ahora guardar la tarjeta con el vehículo persistido
        return tarjetaRepository.save(tarjeta);
    }

    @Override
    public void eliminarTarjeta(Long idTarjeta){
        tarjetaRepository.deleteById(idTarjeta);
    }

    @Override
    public void eliminarTarjetaConVehiculo(Long idTarjeta) {
        // Encuentra la tarjeta por su ID
        Tarjeta tarjeta = tarjetaRepository.findById(idTarjeta)
                .orElseThrow(() -> new EntityNotFoundException("Tarjeta no encontrada"));

        // Almacena una referencia al vehículo asociado si existe
        Vehiculo vehiculo = tarjeta.getVehiculo();

        // Elimina la tarjeta primero
        tarjetaRepository.delete(tarjeta);

        // Después, si el vehículo existe, elimínalo
        if (vehiculo != null) {
            vehiculoRepository.delete(vehiculo);
        }
    }

}