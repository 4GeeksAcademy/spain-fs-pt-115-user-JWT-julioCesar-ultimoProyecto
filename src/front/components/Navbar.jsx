import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				
				<div className="ml-auto">
					<Link to="/" className="m-3">
						<button className="btn btn-dark">Home</button>
					</Link>
					<Link to="/login">
						<button className="btn btn-dark">Iniciar Sesion</button>
					</Link>
					
				</div>
			</div>
		</nav>
	);
};