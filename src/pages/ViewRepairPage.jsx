import { useRouteLoaderData } from "react-router-dom";

import RepairForm from "../componets/Repairs/RepairsForm";

function ViewRepairPage() {
  const data = useRouteLoaderData("repair-detail");

  console.warn("data", data);
  return <RepairForm method="view" event={data} />;
}

export default ViewRepairPage;
