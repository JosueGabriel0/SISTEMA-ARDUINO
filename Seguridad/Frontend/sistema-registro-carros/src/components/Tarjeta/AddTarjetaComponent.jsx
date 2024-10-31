import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom";
import TarjetaService from "../../services/Tarjeta/TarjetaService";


function AddTarjetaComponent(){
    const [uid, setUid] = useState("");

    const navigate = useNavigate();
    const {id} = useParams();

    function saveOrUpdateTarjeta(e){
        e.preventDefault();
        const tarjeta = {uid}
        if(id){
            TarjetaService.putTarjeta(id, tarjeta).then(response => {
                console.log(response.data);
                navigate("/tarjetasYvehiculos");
            }).catch(error => {
                console.log(error);
            })
        }else{
            TarjetaService.postTarjeta(tarjeta).then(response => {
                console.log(response.data);
                navigate("/tarjetasYvehiculos");
            }).catch(error => {
                console.log(error);
            })
        }
    }

    useEffect(() => {
        if(id){
            TarjetaService.getTarjetaById(id).then(response => {
                setUid(response.data.uid);
            }).catch(error => {
                console.log(error);
            })
        }
    }, [id])

    function title(){
        if(id){
            return <div>Actualizar Tarjeta</div>
        }else{
            return <div>Agregar Tarjeta</div>
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
            <form action="">
                <div>
                    <label>UID</label>
                    <input type="text" placeholder="Ingrese el UID" name="uid" value={uid} onChange={(e) => setUid(e.target.value)}/>
                </div>
                <div>
                    <button onClick={(e) => saveOrUpdateTarjeta(e)}>{botonAgregarOActualizar()}</button>
                    &nbsp;
                    &nbsp;
                    <Link to="/tarjetasYvehiculos">Cancelar</Link>
                </div>
            </form>
        </div>
    )
}

export default AddTarjetaComponent;