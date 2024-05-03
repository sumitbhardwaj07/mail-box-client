import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authReducer";
import classes from "./MainNavigation.module.css";
//import VerifyEmailButton from "../Auth/VerifyEmail";

const MainNavigation = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const logoutHandler = () => {
    dispatch(logout());
  };
  
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/">Home</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/inbox">Inbox</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
          {/* {isLoggedIn && <VerifyEmailButton />} */}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
