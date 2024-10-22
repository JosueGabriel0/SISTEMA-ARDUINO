package upeu.edu.pe.sistemaregistrocarros.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upeu.edu.pe.sistemaregistrocarros.entity.Tarjeta;
import upeu.edu.pe.sistemaregistrocarros.service.TarjetaService;

@RestController
@RequestMapping("/api/rfid")
public class RFIDController {
    @Autowired
    private TarjetaService tarjetaService;

    @GetMapping("/verificar/{uid}")
    public ResponseEntity<?> verificarTarjeta(@PathVariable String uid) {
        return tarjetaService.verificarTarjeta(uid)
                .map(tarjeta -> ResponseEntity.ok("Acceso permitido para el vehículo con placa: " + tarjeta.getVehiculo().getNumeroPlaca()))
                .orElse(ResponseEntity.status(HttpStatus.FORBIDDEN).body("Acceso denegado: Tarjeta no registrada"));
    }

    @PostMapping("/registrar")
    public ResponseEntity<?> registrarTarjeta(@RequestBody Tarjeta tarjeta) {
        Tarjeta nuevaTarjeta = tarjetaService.registrarTarjeta(tarjeta);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaTarjeta);
    }
}