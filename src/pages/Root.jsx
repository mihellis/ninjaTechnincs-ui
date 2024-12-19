import { Outlet } from "react-router-dom";

import Header from "../componets/Header/Header";
import NavBar from "../componets/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/user-actions";

function RootLayout() {
  const usersteat = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Header />

      <main>
        {usersteat ? (
          <NavBar user={usersteat.id} onLogout={() => handleLogout()}></NavBar>
        ) : null}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
