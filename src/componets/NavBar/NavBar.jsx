import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
export default function NavBar({ onLogout }) {
  const usersteat = useSelector((state) => state.user.user);

  return (
    <nav className="flex justify-between items-center max-w-3xl mx-auto p-4 my-4 rounded shadow-md bg-gradient-to-b from-stone-700 to-stone-800">
      {/* <h1 className="text-lg font-bold text-amber-400">User Properties App</h1> */}
      <NavLink className="text-lg font-bold text-amber-400" to="/Home">
        Home
      </NavLink>
      <NavLink className="text-lg font-bold text-amber-400" to="/properties">
        Properties
      </NavLink>
      <NavLink
        className="text-lg font-bold text-amber-400"
        to={usersteat?.id ? `/user/${usersteat.id}/view` : "/login"}
      >
        User
      </NavLink>
      <button
        onClick={onLogout}
        className="px-4 py-2 text-stone-900 bg-amber-400 rounded hover:bg-amber-500"
      >
        Logout
      </button>
    </nav>
  );
}
