import { useRouteLoaderData, json, redirect } from "react-router-dom";

import RepairItem from "../componets/Repairs/RepairItem";
import { fetchRepairDeatails } from "../network/fetchFunctions/fetchFunctions";

function RepairDetailPage() {
  const data = useRouteLoaderData("repair-detail");

  return <RepairItem repair={data.repair} />;
}

export default RepairDetailPage;

export async function loader({ request, params }) {
  const id = params.repairID;
  console.warn("params", params);
  console.warn("id", id);

  const response = await fetchRepairDeatails(id);

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
