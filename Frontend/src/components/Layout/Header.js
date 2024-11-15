import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authReducer";
import classes from "./Header.module.css";
import { Base_URL } from "../../UI/Helper";
import fetchWithRefreshToken from "../../UI/RefreshUtils";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const logoutHandler = async () => {
    try {
      await fetchWithRefreshToken(`${Base_URL}/api/v1/users/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }, dispatch, navigate);

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate("/auth");
      dispatch(logout());
    } catch (error) {
      console.error("Logout error:", error);
      // Optionally show error to the user
    }
  };

  
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>@E-mail</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/">Home</Link>
            </li>
          )}
          
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
          
        </ul>
      </nav>
    </header>
  );
};

export default Header;
