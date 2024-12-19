import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./componets/Login/Login";
import Properties from "./componets/Properties/Properties";
import RootLayout from "./pages/Root";
import SignUp from "./componets/Signup/SignUp";
import ErrorPage from "./pages/Error";
import EditUserPage, {
  loader as userDetailsLoader,
} from "./pages/EditUserPage";
import EditRapairPage from "./pages/EditRepairPage";
import RepairDetailPage, {
  loader as repairDetailLoader,
} from "./pages/RepairsDetail";
import { action as manipulateRepairAction } from "./componets/Repairs/RepairsForm";
import { action as manipulateUserAction } from "./componets/User/UserForm";
import NewRepairPage from "./pages/NewRepair";
import NewUserPage from "./pages/NewUser";
import RepairsPage from "./pages/Repairs";
import ViewRepairPage from "./pages/ViewRepairPage";
// import { checkAuthLoader } from "./util/auth";
import HomePage from "./pages/Home";
import ProtectedRoute from "./componets/Route/ProtectedRoute";
import UsersPage from "./pages/Users";

function App() {
  const user = useSelector((state) => state.user.user);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,

      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/home",
          element: (
            <ProtectedRoute>
              <HomePage user={user} />
            </ProtectedRoute>
          ),
        },
        {
          path: "/sign-up",
          element: <SignUp />,
        },
        {
          path: "/properties",
          element: (
            <ProtectedRoute>
              <Properties user={user} />
            </ProtectedRoute>
          ),
          children: [],
        },
        {
          path: ":propertyId",
          element: <RepairsPage />,
          errorElement: <ErrorPage />,

          children: [
            {
              path: ":repairID",
              id: "repair-detail",
              loader: repairDetailLoader,
              children: [
                {
                  index: true,
                  element: <RepairDetailPage />,
                },
                {
                  path: "edit",
                  element: <EditRapairPage />,
                  action: manipulateRepairAction,
                },
                { path: "view", element: <ViewRepairPage /> },
              ],
            },
            {
              path: "new",
              element: <NewRepairPage />,
              action: manipulateRepairAction,
            },
          ],
        },
        {
          path: "/user",
          element: <UsersPage />,
          errorElement: <ErrorPage />,

          children: [
            {
              path: ":userID",
              id: "user-detail",
              loader: userDetailsLoader,
              children: [
                {
                  index: true,
                  element: <RepairDetailPage />,
                },
                {
                  path: "edit",
                  element: <EditUserPage />,
                  action: manipulateUserAction,
                },
                {
                  path: "view",
                  element: <EditUserPage />,
                  action: manipulateUserAction,
                },
              ],
            },
            {
              path: "new",
              element: <NewUserPage />,
              action: manipulateUserAction,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
