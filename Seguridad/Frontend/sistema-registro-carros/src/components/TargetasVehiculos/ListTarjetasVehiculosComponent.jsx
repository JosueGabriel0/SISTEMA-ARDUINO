import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TarjetaService from "../../services/Tarjeta/TarjetaService";
import VerificacionService from "../../services/Verificacion/VerificacionService"; // Asegúrate de que esta ruta sea correcta

function ListTarjetasVehiculosComponent() {
    const [tarjetasVehiculos, setTarjetasVehiculos] = useState([]);
    const [mensaje, setMensaje] = useState(""); // Estado para almacenar el mensaje

    // Determina la clase CSS basada en el mensaje
    const mensajeClase = mensaje.toLowerCase().includes("no") ? "alert alert-danger mt-4" : "alert alert-info mt-4";

    useEffect(() => {
        listarTarjetasVehiculos();
        
        // Intervalo para obtener el mensaje cada 5 segundos
        const intervaloMensaje = setInterval(() => {
            obtenerMensaje();
        }, 2000);

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(intervaloMensaje);
    }, []);

    function obtenerMensaje() {
        VerificacionService.obtenerMensaje()
            .then(response => {
                setMensaje(response.data); // Guarda el mensaje obtenido
            })
            .catch(error => {
                console.error("Error al obtener el mensaje:", error);
            });
    }

    function listarTarjetasVehiculos() {
        TarjetaService.getAllTarjetas() // Llama al servicio que retorna las tarjetas con los datos del vehículo
            .then(response => {
                setTarjetasVehiculos(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function eliminarTarjetaConVehiculo(idTarjeta){
        TarjetaService.deleteTarjetaConVehiculo(idTarjeta).then(response => {
            listarTarjetasVehiculos();
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="container mt-5">
            <Link to="/" className="btn btn-secondary mb-3">Retroceder</Link>
            <h1 className="mb-4">Gestión de Tarjetas y Vehículos</h1>
            <Link to="/add-tarjetasYvehiculos" className="btn btn-primary mb-3">Agregar Tarjeta</Link>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>ID Tarjeta</th>
                        <th>UID</th>
                        <th>ID Vehículo</th>
                        <th>Placa</th>
                        <th>Revisión Técnica</th>
                        <th>Propietario</th>
                        <th>Otros Datos</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tarjetasVehiculos.map(tv => (
                            <tr key={tv.idTarjeta}>
                                <td>{tv.idTarjeta}</td>
                                <td>{tv.uid}</td>
                                <td>{tv.vehiculo ? tv.vehiculo.idVehiculo: 'Sin vehiculo'}</td>
                                <td>{tv.vehiculo ? tv.vehiculo.numeroPlaca: 'Sin vehiculo'}</td>
                                <td>{tv.vehiculo ? new Date(tv.vehiculo.revisionTecnica).toLocaleDateString() : 'Sin revisión técnica'}</td>
                                <td>{tv.vehiculo ? tv.vehiculo.nombrePropietario: 'Sin vehiculo'}</td>
                                <td>{tv.vehiculo ? tv.vehiculo.otrosDatos: 'Sin vehiculo'}</td>
                                <td>
                                    <Link to={`/edit-tarjetasYvehiculos/${tv.idTarjeta}`} className="btn btn-warning btn-sm me-2">Actualizar</Link>
                                    <button 
                                        className="btn btn-danger btn-sm"
                                        onClick={() => eliminarTarjetaConVehiculo(tv.idTarjeta)}
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

export default ListTarjetasVehiculosComponent;