import { json, useRouteLoaderData } from "react-router-dom";

import UserForm from "../componets/User/UserForm";
import { fetchUserDeatails } from "../network/fetchFunctions/fetchFunctions";

function EditUserPage() {
  const data = useRouteLoaderData("user-detail");

  console.warn("data", data);
  return <UserForm method="PUT" event={data} />;
}

export async function loader({ request, params }) {
  const id = params.userID;
  console.warn("params", params);
  console.warn("id", id);

  const response = await fetchUserDeatails(id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected repair." },
      {
        status: 500,
      }
    );
  } else {
    const data = await response.json();

    return data;
  }
} //

export default EditUserPage;
