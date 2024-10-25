package upeu.edu.pe.sistemaregistrocarros.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upeu.edu.pe.sistemaregistrocarros.entity.Vehiculo;
import upeu.edu.pe.sistemaregistrocarros.service.VehiculoService;

@RestController
@RequestMapping("/api/vehiculo")
public class VehiculoController {
    @Autowired
    private VehiculoService VehiculoService;

    @PostMapping("/registrar")
    public ResponseEntity<?> registrarVehiculo(@RequestBody Vehiculo vehiculo) {
        Vehiculo nuevoVehiculo = VehiculoService.registrarVehiculo(vehiculo);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoVehiculo);
    }

    @GetMapping("/listar")
    public ResponseEntity<?> listarVehiculos() {
        return ResponseEntity.ok(VehiculoService.listarVehiculos());
    }

    @GetMapping("/listarPorId/{id}")
    public ResponseEntity<Vehiculo> listarVehiculosPorId(@PathVariable(required = true) Long id) {
        return ResponseEntity.ok(VehiculoService.listarVehiculoPorId(id));
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<?> actualizarVehiculo(@PathVariable(required = true) Long id, @RequestBody Vehiculo vehiculo) {
        vehiculo.setIdVehiculo(id);
        return ResponseEntity.ok(VehiculoService.editarVehiculo(vehiculo));
    }

    @DeleteMapping("/eliminar/{id}")
    public String eliminarVehiculo(@PathVariable(required = true) Long id) {
        VehiculoService.eliminarVehiculo(id);
        return "Vehiculo eliminada correctamente";
    }
}