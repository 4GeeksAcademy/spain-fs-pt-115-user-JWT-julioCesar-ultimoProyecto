import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token); 
                alert(data.msg);
                navigate("/private"); 
            } else {
                alert(data.msg);
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert("Hubo un problema al conectar con el servidor.");
        }
    };

    return (
        <div className="container d-flex justify-content-center">
            <form className="col-md-6" onSubmit={handleSubmit}>
                <h1 className="text-center">Iniciar sesión</h1>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Correo Electronico</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3 form-check">
                    ¿Aún no te has registrado? <Link to="/signup">Registrar</Link>
                </div>
                <button type="submit" className="btn btn-dark">Enviar</button>
            </form>
        </div>
    );
};