import React, { useContext } from "react";
import starLogo from "../../img/Star-Wars-Logo.png"
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Navbar = () => {
	const { store, actions } = useContext(Context)


	return (

		<nav className="navbar navbar-light bg-light mb-3">
			<div className="container">
				<Link to="/">

					<img src={starLogo} alt="" width="60" height="40" />

				</Link>
				<div className="ml-auto">
					{store.token?.length > 0 ?
						(<div className="container d-flex">
							<div className="dropdown">

								<button type="button" className="btn btn-primary dropdown-toggle" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
									Favorites <span className="badge bg-secondary">{store.favorites.length}</span>
								</button>

								<ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">

									{store.favorites == ""? (<li>(empty)</li>):
										(store.favorites.map((item) => {
											return (
												<li key={item.id} className="d-flex justify-content-between">
													{item.name}
													<button className="ms-1" type="button" onClick={() => actions.deleteFavorite(item.nature, item.nature_id)}><i className="fas fa-trash"></i></button>
												</li>

											)
										}))

									}

								</ul>
							</div>
							<button type="button" className="btn btn-secondary ms-3" onClick={()=>actions.handleLogout()}>Log out</button>
						</div>)
						: (
							<div className="container">
								<Link to="/register">
									<button type="button" className="btn btn-secondary me-3">Register</button>
								</Link>
								<Link to="/login">
									<button type="button" className="btn btn-secondary">Log in</button>
								</Link>
							</div>
						)}
				</div>
			</div>
		</nav>

	);
};
