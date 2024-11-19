import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import TarjetaService from "../../services/Tarjeta/TarjetaService";
import VehiculoService from "../../services/Vehiculo/VehiculoService";

function AddTarjetaComponent() {
    const [uid, setUid] = useState("");
    const [vehiculo, setVehiculo] = useState({
        idVehiculo: "",
        numeroPlaca: "",
        revisionTecnica: "",
        nombrePropietario: "",
        otrosDatos: ""
    });

    const navigate = useNavigate();
    const { id } = useParams();

    function saveOrUpdateTarjeta(e) {
        e.preventDefault();

        const { idVehiculo, ...vehiculoSinId } = vehiculo;
        const tarjeta = {
            uid,
            vehiculo: vehiculoSinId
        };

        if (id) {
            TarjetaService.putTarjeta(id, tarjeta)
                .then(response => {
                    console.log(response.data);
                    navigate("/tarjetasYvehiculos");
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            TarjetaService.postTarjeta(tarjeta)
                .then(response => {
                    console.log(response.data);
                    navigate("/tarjetasYvehiculos");
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    useEffect(() => {
        if (id) {
            TarjetaService.getTarjetaById(id)
                .then(response => {
                    setUid(response.data.uid);
                    setVehiculo({
                        idVehiculo: response.data.vehiculo.idVehiculo,
                        numeroPlaca: response.data.vehiculo.numeroPlaca,
                        revisionTecnica: response.data.vehiculo.revisionTecnica,
                        nombrePropietario: response.data.vehiculo.nombrePropietario,
                        otrosDatos: response.data.vehiculo.otrosDatos
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [id]);

    function title() {
        return id ? "Actualizar Tarjeta" : "Agregar Tarjeta";
    }

    function botonAgregarOActualizar() {
        return id ? "Actualizar" : "Agregar";
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">{title()}</h2>
            <form>
                <div className="mb-3">
                    <label className="form-label">UID</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese el UID"
                        name="uid"
                        value={uid}
                        onChange={(e) => setUid(e.target.value)}
                    />
                </div>

                <h4 className="mt-4">Datos del Vehículo</h4>
                <div className="mb-3">
                    <label className="form-label">Placa</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese el número de placa"
                        name="numeroPlaca"
                        value={vehiculo.numeroPlaca}
                        onChange={(e) => setVehiculo({ ...vehiculo, numeroPlaca: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Revisión Técnica</label>
                    <input
                        type="date"
                        className="form-control"
                        placeholder="Ingrese la fecha de revisión técnica"
                        name="revisionTecnica"
                        value={vehiculo.revisionTecnica}
                        onChange={(e) => setVehiculo({ ...vehiculo, revisionTecnica: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nombre del Propietario</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese el nombre del propietario"
                        name="nombrePropietario"
                        value={vehiculo.nombrePropietario}
                        onChange={(e) => setVehiculo({ ...vehiculo, nombrePropietario: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Otros Datos</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese otros datos"
                        name="otrosDatos"
                        value={vehiculo.otrosDatos}
                        onChange={(e) => setVehiculo({ ...vehiculo, otrosDatos: e.target.value })}
                    />
                </div>

                <div className="d-flex justify-content-between mt-4">
                    <button
                        className="btn btn-primary"
                        onClick={(e) => saveOrUpdateTarjeta(e)}
                    >
                        {botonAgregarOActualizar()}
                    </button>
                    <Link to="/tarjetasYvehiculos" className="btn btn-secondary">
                        Cancelar
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default AddTarjetaComponent;
