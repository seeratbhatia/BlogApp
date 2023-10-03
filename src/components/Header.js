import { NavLink, withRouter } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/userContext";

function Header(props) {
  let userData = useContext(UserContext);
  let { isLoggedIn } = userData.data;
  let { handleLogout } = userData;

  // handle logout
  function logout() {
    localStorage.clear();
    handleLogout();
    props.history.push("/");
  }

  return (
    <header className="flex flex-col items-center py-6  sm:py-4 sm:items-center lg:flex-row lg:justify-between  bg-gray-100 sm:px-12 lg:px-20">
      <NavLink to="/">
        <h1 className="text-3xl py-4 md:text-4xl font-bold text-green-500 font-tertiary">
          Blog App
        </h1>
      </NavLink>
      <nav>
        <ul className="flex flex-col text-xs sm:flex-row">
          {isLoggedIn ? (
            <Authenticated handleLogout={logout} />
          ) : (
            <Unauthenticated />
          )}
        </ul>
      </nav>
    </header>
  );
}

//This function takes care of elements to display when the user is logged in
function Authenticated(props) {
  let userData = useContext(UserContext);
  let { user } = userData.data;
  let { handleLogout } = props;
  return (
    <>
      <NavLink activeClassName="active" to={`/profiles/${user.username}`}>
        <li className="flex items-center text-xl mx-3 ">
          <i className="fas fa-user mr-2"></i>
          <span className="">{user.username}</span>
        </li>
      </NavLink>

      <NavLink activeClassName="active" to="/settings">
        <li className="text-xl mx-3">
          <i className="fas fa-cog mr-2"></i>
          <span className="">Setings</span>
        </li>
      </NavLink>

      <NavLink activeClassName="active" to="/addArticle">
        <li className="text-xl mx-3">
          <i className="fas fa-newspaper mr-2"></i>
          <span className="">New Article</span>
        </li>
      </NavLink>

      <li className="text-xl mx-3">
        <span className="cursor-pointer" onClick={handleLogout}>
          Logout
        </span>
      </li>
    </>
  );
}

//This function takes care of elements to display when the user is not loggeg in
function Unauthenticated(props) {
  return (
    <>
      <NavLink activeClassName="active" to="/register">
        <li className="text-xl mr-6">Sign up</li>
      </NavLink>
      <NavLink activeClassName="active" to="/login">
        <li className="text-xl mr-6">Log in</li>
      </NavLink>
    </>
  );
}

export default withRouter(Header);