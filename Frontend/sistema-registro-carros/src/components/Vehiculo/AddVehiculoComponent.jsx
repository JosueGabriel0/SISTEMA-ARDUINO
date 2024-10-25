import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import VehiculoService from "../../services/Vehiculo/VehiculoService";

function AddVehiculoComponent(){
    const[numeroPlaca, setNumeroPlaca] = useState("");
    const[revisionTecnica, setRevisionTecnica] = useState("");
    const[nombrePropietario, setNombrePropietario] = useState("");
    const[otrosDatos, setOtrosDatos] = useState("");

    const navigate = useNavigate();
    const {id} = useParams();

    function saveOrUpdateVehiculo(e){
        e.preventDefault();
        const vehiculo = {numeroPlaca, revisionTecnica, nombrePropietario, otrosDatos}
        if(id){
            VehiculoService.putvehiculo(id, vehiculo).then(response => {
                console.log(response.data);
                navigate("/vehiculos");
            })
        }else{
            VehiculoService.postvehiculo(vehiculo).then(response => {
                console.log(response.data);
                navigate("/vehiculos");
            })
        }
    }

    useEffect(() => {
        if(id){
            VehiculoService.getVehiculoById(id).then(response => {
                setNumeroPlaca(response.data.numeroPlaca);
                setRevisionTecnica(response.data.revisionTecnica);
                setNombrePropietario(response.data.nombrePropietario);
                setOtrosDatos(response.data.otrosDatos);
            }).catch(error => {
                console.log(error);
            })
        }
    }, [id]);

    function title(){
        if(id){
            return <div>Actualizar Vehiculo</div>
        }else{
            return <div>Agregar Vehiculo</div>
        }
    }

    function botonAgregarOActualizar(){
        if(id){
            return <div>Actualizar</div>
        }else{
            return <div>Agregar</div>
        }
    }

    return(
        <div className="container">
            <h1>{title()}</h1>
            <form>
                <div>
                    <label>Numero de Placa</label>
                    <input type="text" placeholder="Ingrese el numero de Placa" name="numeroPlaca" value={numeroPlaca} onChange={(e) => setNumeroPlaca(e.target.value)} />
                </div>

                <div>
                    <label>Revision Tecnica</label>
                    <input type="date" placeholder="Ingrese la Fecha de la Revision Tecnica" name="revisionTecnica" value={revisionTecnica} onChange={(e) => setRevisionTecnica(e.target.value)}/>
                </div>

                <div>
                    <label>Nombre del Propietario</label>
                    <input type="text" placeholder="Ingrese el Nombre del Propietario" name="nombrePropietario" value={nombrePropietario} onChange={(e) => setNombrePropietario(e.target.value)}/>
                </div>

                <div>
                    <label>Otros Datos</label>
                    <input type="text" placeholder="Ingrese Otros Datos" name="otrosDatos" value={otrosDatos} onChange={(e) => setOtrosDatos(e.target.value)}/>
                </div>
                <div>
                    <button onClick={(e) => saveOrUpdateVehiculo(e)}>{botonAgregarOActualizar()}</button>
                    &nbsp;
                    &nbsp;
                    <Link to="/vehiculos">Cancelar</Link>
                </div>
            </form>
        </div>
    )
}

export default AddVehiculoComponent;