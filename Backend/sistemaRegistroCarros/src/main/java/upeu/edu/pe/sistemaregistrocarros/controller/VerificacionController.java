package upeu.edu.pe.sistemaregistrocarros.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/verificacion")
public class VerificacionController {
    private String mensajeActual;

    @PostMapping("/enviar")
    public ResponseEntity<String> recibirMensaje(@RequestBody String mensaje) {
        if (mensaje == null || mensaje.isEmpty()) {
            return ResponseEntity.badRequest().body("El mensaje no puede ser nulo o vacío");
        }
        this.mensajeActual = mensaje;
        return ResponseEntity.ok("Mensaje recibido correctamente");
    }

    @GetMapping("/obtener")
    public ResponseEntity<String> obtenerMensaje() {
        return ResponseEntity.ok(mensajeActual != null ? mensajeActual : "No hay mensajes recibidos");
    }
}
