import { useRouteLoaderData } from "react-router-dom";

import RepairForm from "../componets/Repairs/RepairsForm";

function EditRepairPage() {
  const data = useRouteLoaderData("repair-detail");

  console.warn("data", data);
  return <RepairForm method="PUT" event={data} />;
}

export default EditRepairPage;
