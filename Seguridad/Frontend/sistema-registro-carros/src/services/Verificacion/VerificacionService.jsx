import axios from "axios";

const VERIFICACION_BASE_REST_API_URL = "http://localhost:8082/api/verificacion"; // Cambia esto según tu configuración

class VerificacionService {
    // Función para obtener el mensaje
    obtenerMensaje() {
        return axios.get(`${VERIFICACION_BASE_REST_API_URL}/obtener`);
    }
}

export default new VerificacionService();
