import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VehiculoService from "../../services/Vehiculo/VehiculoService";

function ListVehiculoComponent() {
    const [vehiculos, setVehiculos] = useState([]);
    const [mensaje, setMensaje] = useState(""); // Estado para almacenar el mensaje

    useEffect(() => {
        listarVehiculos();
    }, []);

    function listarVehiculos() {
        VehiculoService.getAllvehiculos()
            .then(response => {
                setVehiculos(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function eliminarVehiculo(id) {
        VehiculoService.deletevehiculo(id)
            .then(response => {
                listarVehiculos();
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="container mt-5">
            <Link to="/" className="btn btn-secondary mb-3">Retroceder</Link>
            <h1 className="mb-4">Gestión de Vehiculos</h1>
            <Link to="/add-Vehiculo" className="btn btn-primary mb-3">Agregar Vehiculo</Link>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Numero de Placa</th>
                        <th>Revision Tecnica</th>
                        <th>Nombre del Propietario</th>
                        <th>Otros Datos</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        vehiculos.map(vehiculo => (
                            <tr key={vehiculo.idVehiculo}>
                                <td>{vehiculo.idVehiculo}</td>
                                <td>{vehiculo.numeroPlaca}</td>
                                <td>{vehiculo.revisionTecnica}</td>
                                <td>{vehiculo.nombrePropietario}</td>
                                <td>{vehiculo.otrosDatos}</td>
                                <td>
                                    <Link to={`/edit-vehiculo/${vehiculo.idVehiculo}`} className="btn btn-warning btn-sm me-2">Actualizar</Link>
                                    <button 
                                        className="btn btn-danger btn-sm"
                                        onClick={() => eliminarVehiculo(vehiculo.idVehiculo)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ListVehiculoComponent;
