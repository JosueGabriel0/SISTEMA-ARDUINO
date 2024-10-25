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

        const tarjeta = {
            uid,
            vehiculo
        };

        if (id) {
            console.log("Este es el id "+id+", Y este es la tarjeta: "+ JSON.stringify(tarjeta))
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
        return id ? <div>Actualizar Tarjeta</div> : <div>Agregar Tarjeta</div>;
    }

    function botonAgregarOActualizar() {
        return id ? <div>Actualizar</div> : <div>Agregar</div>;
    }

    return (
        <div className="container">
            <h1>{title()}</h1>
            <form>
                <div>
                    <label>UID</label>
                    <input
                        type="text"
                        placeholder="Ingrese el UID"
                        name="uid"
                        value={uid}
                        onChange={(e) => setUid(e.target.value)}
                    />
                </div>
                
                <h3>Datos del Vehículo</h3>
                <div>
                    <label>Placa</label>
                    <input
                        type="text"
                        placeholder="Ingrese el número de placa"
                        name="numeroPlaca"
                        value={vehiculo.numeroPlaca}
                        onChange={(e) => setVehiculo({ ...vehiculo, numeroPlaca: e.target.value })}
                    />
                </div>
                <div>
                    <label>Revisión Técnica</label>
                    <input
                        type="date"
                        placeholder="Ingrese la fecha de revisión técnica"
                        name="revisionTecnica"
                        value={vehiculo.revisionTecnica}
                        onChange={(e) => setVehiculo({ ...vehiculo, revisionTecnica: e.target.value })}
                    />
                </div>
                <div>
                    <label>Nombre del Propietario</label>
                    <input
                        type="text"
                        placeholder="Ingrese el nombre del propietario"
                        name="nombrePropietario"
                        value={vehiculo.nombrePropietario}
                        onChange={(e) => setVehiculo({ ...vehiculo, nombrePropietario: e.target.value })}
                    />
                </div>
                <div>
                    <label>Otros Datos</label>
                    <input
                        type="text"
                        placeholder="Ingrese otros datos"
                        name="otrosDatos"
                        value={vehiculo.otrosDatos}
                        onChange={(e) => setVehiculo({ ...vehiculo, otrosDatos: e.target.value })}
                    />
                </div>

                <div>
                    <button onClick={(e) => saveOrUpdateTarjeta(e)}>
                        {botonAgregarOActualizar()}
                    </button>
                    &nbsp;&nbsp;
                    <Link to="/tarjetas">Cancelar</Link>
                </div>
            </form>
        </div>
    );
}

export default AddTarjetaComponent;
