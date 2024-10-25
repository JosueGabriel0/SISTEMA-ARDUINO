import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TarjetaService from "../../services/Tarjeta/TarjetaService";

function ListTarjetasVehiculosComponent() {
    const [tarjetasVehiculos, setTarjetasVehiculos] = useState([]);

    useEffect(() => {
        listarTarjetasVehiculos();
    }, []);

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

    function eliminarTarjeta(idTarjeta){
        TarjetaService.deleteTarjeta(idTarjeta).then(response => {
            listarTarjetasVehiculos();
        }).catch(error => {
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

    function eliminarTarjeta(idTarjeta){
        TarjetaService.deleteTarjeta(idTarjeta).then(response => {
            listarTarjetasVehiculos();
        }).catch(error => {
            console.log(error);
        })
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
        </div>
    );
}

export default ListTarjetasVehiculosComponent;
