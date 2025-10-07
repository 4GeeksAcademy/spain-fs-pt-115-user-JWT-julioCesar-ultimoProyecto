import { useNavigate } from "react-router-dom";

export const Private = () => {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token"); // elimina el token
        navigate("/"); // redirige a la página pública
    };
    return (

        <div className="row justify-content-center">
            <div className="col-md-3 mt-3 d-flex justify-content-center">
                <img src="https://cdn.memegenerator.es/imagenes/memes/full/31/71/31711211.jpg" alt="profile"
                    className="rounded-circle  mb-3" style={{ width: "250px", height: "250px" }} />
            </div>

            <div className="d-flex justify-content-center">
                <button className="btn btn-danger" onClick={handleLogout}>
                    Cerrar sesión
                </button>
            </div>

        </div>
    )
}