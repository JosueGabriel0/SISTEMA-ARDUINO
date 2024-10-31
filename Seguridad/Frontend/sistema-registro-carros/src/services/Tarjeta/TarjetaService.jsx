import axios from "axios";

const TARJETA_BASE_REST_API_URL = "http://localhost:8082/api/rfid";

class TarjetaService {
    getAllTarjetas(){
        return axios.get(TARJETA_BASE_REST_API_URL + "/listar"); // Devolver la promesa
    }

    getTarjetaById(id){
        return axios.get(TARJETA_BASE_REST_API_URL + "/listarPorId/" + id); // Devolver la promesa
    }

    postTarjeta(tarjeta){
        return axios.post(TARJETA_BASE_REST_API_URL + "/registrar", tarjeta); // Devolver la promesa
    }

    putTarjeta(id, tarjeta){
        return axios.put(TARJETA_BASE_REST_API_URL + "/actualizar/" + id, tarjeta); // Devolver la promesa
    }

    deleteTarjeta(id){
        return axios.delete(TARJETA_BASE_REST_API_URL + "/eliminarTarjeta/" + id); // Devolver la promesa
    }

    deleteTarjetaConVehiculo(id){
        return axios.delete(TARJETA_BASE_REST_API_URL + "/eliminarTarjetaConVehiculo/" + id); // Devolver la promesa
    }
}

export default new TarjetaService();
