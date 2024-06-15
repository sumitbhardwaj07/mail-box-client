import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authReducer";
import classes from "./Header.module.css";

const Header = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const logoutHandler = () => {
    dispatch(logout());
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
