import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TarjetaService from "../../services/Tarjeta/TarjetaService";
import VerificacionService from "../../services/Verificacion/VerificacionService"; // Asegúrate de que esta ruta sea correcta
import VehiculoService from "../../services/Vehiculo/VehiculoService";

function ListTarjetaComponent() {
    const [tarjetas, setTarjetas] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);
    const [mensaje, setMensaje] = useState(""); // Estado para almacenar el mensaje

    useEffect(() => {
        listarTarjetas();
        obtenerMensaje(); // Llama a la función para obtener el mensaje
    }, []);

    function listarVehiculos(){
        VehiculoService.getAllvehiculos().then(response => {
            setVehiculos(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    function encontrarPlacaVehiculo(){
        const vehiculoEncontrado = vehiculos.find(vehiculo => vehiculo.idVehiculo)
    }

    function listarTarjetas() {
        TarjetaService.getAllTarjetas()
            .then(response => {
                setTarjetas(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function obtenerMensaje() {
        VerificacionService.obtenerMensaje()
            .then(response => {
                setMensaje(response.data); // Guarda el mensaje obtenido
            })
            .catch(error => {
                console.error("Error al obtener el mensaje:", error);
            });
    }

    function eliminarTarjeta(id) {
        TarjetaService.deleteTarjeta(id)
            .then(response => {
                listarTarjetas();
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Determina la clase CSS basada en el mensaje
    const mensajeClase = mensaje.toLowerCase().includes("no") ? "alert alert-danger mt-4" : "alert alert-info mt-4";

    return (
        <div className="container mt-5">
            <Link to="/" className="btn btn-secondary mb-3">Retroceder</Link>
            <h1 className="mb-4">Gestión de Tarjetas</h1>
            <Link to="/add-tarjeta" className="btn btn-primary mb-3">Agregar Tarjeta</Link>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>UID</th>
                        <th>Placa del vehiculo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tarjetas.map(tarjeta => (
                            <tr key={tarjeta.idTarjeta}>
                                <td>{tarjeta.idTarjeta}</td>
                                <td>{tarjeta.uid}</td>
                                <td>{tarjeta.vehiculo ? tarjeta.vehiculo.idVehiculo: 'Sin IdVehiculo'}</td>
                                <td>
                                    <Link to={`/edit-tarjeta/${tarjeta.idTarjeta}`} className="btn btn-warning btn-sm me-2">Actualizar</Link>
                                    <button 
                                        className="btn btn-danger btn-sm"
                                        onClick={() => eliminarTarjeta(tarjeta.idTarjeta)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {/* Mostrar el mensaje recibido con el color adecuado */}
            <div className={mensajeClase}>
                <strong>Mensaje del servidor:</strong> {mensaje || "No hay mensajes recibidos."}
            </div>
        </div>
    );
}

export default ListTarjetaComponent;
