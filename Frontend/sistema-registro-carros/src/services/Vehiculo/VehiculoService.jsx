import axios from "axios";

const VEHICULO_BASE_REST_API_URL = "http://localhost:8082/api/vehiculo";

class VehiculoService {
    getAllvehiculos(){
        return axios.get(VEHICULO_BASE_REST_API_URL + "/listar"); // Devolver la promesa
    }

    getVehiculoById(id){
        return axios.get(VEHICULO_BASE_REST_API_URL + "/listarPorId/" + id); // Devolver la promesa
    }

    postvehiculo(vehiculo){
        return axios.post(VEHICULO_BASE_REST_API_URL + "/registrar", vehiculo); // Devolver la promesa
    }

    putvehiculo(id, vehiculo){
        return axios.put(VEHICULO_BASE_REST_API_URL + "/actualizar/" + id, vehiculo); // Devolver la promesa
    }

    deletevehiculo(id){
        return axios.delete(VEHICULO_BASE_REST_API_URL + "/eliminar/" + id); // Devolver la promesa
    }
}

export default new VehiculoService();
