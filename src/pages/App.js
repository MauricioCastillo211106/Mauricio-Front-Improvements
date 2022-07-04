
import '../assets/stylesheets/App.css';
import {Link} from "react-router-dom";
import Principal from "./Principal";
import Menu from  "../Components/Father/menu"
import Hijo from "../Components/son/Hijo";
import Users from "../Components/Users/Users";


function App() {
  return (
      <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-primary">
              <a className="navbar-brand" href="#">Front</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                      aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                  <ul className="navbar-nav">
                      <li className="nav-item active">
                          <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link" href="#">Features</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link" href="../Components/Father/menu.js">Pricing</a>
                      </li>
                  </ul>
              </div>
          </nav>
          <body>
          <div>
              <h2>Usuarios</h2>
              <Users/>
          </div>
          <div>
              <h2>Padres</h2>
              <Menu/>
          </div>
          <div>
              <h2>Hijos</h2>
              <Hijo/>
          </div>

          </body>
      </div>
     );
}

export default App;
