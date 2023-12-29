import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import adm from "../../assets/adm.jpg";
import logo from "../../assets/logo.png";
import { useAuth } from "../../contexts/AuthContext";
// import Searchbar from "../SearchBar/SearchBar";

function NavBar() {
  const { isAdmin } = useAuth();
  const { user } = useAuth();
  return (
    <div className="nav-container">
      <NavLink to="/">
        <img className="logo" src={logo} alt="Logo TSN Game" />
      </NavLink>
      {isAdmin && (
        <div>
          <NavLink to="/adminpage">
            <img className="admin-dash-link" src={adm} alt="Logo Admin" />
          </NavLink>
        </div>
      )}
      <div className="link">
        {/* <Searchbar /> */}
        {user ? (
          <span className="username-home">{user.username}</span>
        ) : (
          <span />
        )}
        <ProfileMenu />
      </div>
    </div>
  );
}

export default NavBar;
