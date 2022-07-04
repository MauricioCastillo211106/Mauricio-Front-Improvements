import {Link} from "react-router-dom";

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="navbar-brand" href="#">Front</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>

            <Link to="/menu" class="text-white" type="button" id="button-addon1">Padres</Link>
            <Link to="/son"  class="text-white" type="button" id="button-addon1">Hijos</Link>
            <Link to="/Users" class="text-white" type="button" id="button-addon1" >Usuarios</Link>


        </nav>
    );
}

export default NavBar;
