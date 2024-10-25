import { Link } from "react-router-dom";
function GeneralInicioComponent(){
    return(
        <div className="container">
            <h1>Inicio</h1>
            <Link to="/tarjetas" className="btn btn-secondary mb-3">Tarjetas</Link>
            <Link to="/vehiculos" className="btn btn-secondary mb-3">Vehiculos</Link>
            <Link to="/tarjetasYvehiculos" className="btn btn-secondary mb-3">Tarjetas y Vehiculos</Link>
        </div>
    )
}

export default GeneralInicioComponent;