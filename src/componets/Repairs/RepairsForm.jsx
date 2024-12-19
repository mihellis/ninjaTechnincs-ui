import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  redirect,
} from "react-router-dom";
import Input from "../Input/Input";
import Textarea from "../Input/Textarea";
import Dropdown from "../Input/Dropdown";
import Button from "../Button/Button";

const repairTypes = [
  { label: "Plumbing", value: 0 },
  { label: "Electrical", value: 1 },
  { label: "Painting", value: 2 },
];
const currentStatuses = [
  { label: "Pending", value: 0 },
  { label: "InProgress", value: 1 },
  { label: "Complete", value: 2 },
];

// eslint-disable-next-line react/prop-types
function RepairForm({ method, event }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  const defaultDate =
    event && event.scheduledDate
      ? new Date(event.scheduledDate).toISOString().slice(0, 10)
      : "";

  function cancelHandler() {
    navigate("/properties");
  }

  return (
    <Form method={method} className="flex flex-col gap-2 mb-6">
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <Dropdown
        id="type"
        label="Repair Type"
        options={repairTypes}
        invalid={false}
        name="type"
        defaultValue={event ? event.type : 0}
        disabled={method === "view" ? true : false}
      />
      <p>
        <Input
          id="cost"
          label="Cost"
          type="number"
          name="cost"
          required
          defaultValue={event ? event.cost : ""}
          disabled={method === "view" ? true : false}
        />
      </p>
      <p>
        <Input
          id="address"
          label="Address"
          type="text"
          name="address"
          required
          defaultValue={event ? event.address : ""}
          disabled={method === "view" ? true : false}
        />
      </p>
      <Dropdown
        id="currentStatus"
        label="Current Status"
        options={currentStatuses}
        invalid={false}
        name="currentStatus"
        defaultValue={event ? event.currentStatus : 0}
        disabled={method === "view" ? true : false}
      />
      <p>
        <Input
          id="scheduledDate"
          label="Scheduled Date"
          type="date"
          name="scheduledDate"
          required
          defaultValue={defaultDate}
          disabled={method === "view" ? true : false}
        />
      </p>
      <p>
        <Textarea
          id="description"
          label="Description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ""}
          disabled={method === "view" ? true : false}
        />
      </p>
      <div className="flex gap-4">
        <Button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button disabled={isSubmitting || method === "view" ? true : false}>
          {isSubmitting ? "Submitting..." : "Save"}
        </Button>
      </div>
    </Form>
  );
}

export default RepairForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  console.warn(data.get("type"));
  const eventData = {
    propertyId: params.propertyId,
    cost: data.get("cost"),
    address: data.get("address"),
    description: data.get("description"),
    currentStatus: parseInt(data.get("currentStatus"), 10),
    type: parseInt(data.get("type"), 10), // Convert to number,
    scheduledDate: data.get("scheduledDate"),
  };

  let url = "https://localhost:7166/api/Repair";

  if (method === "PUT") {
    const eventId = params.repairID;

    url = "https://localhost:7166/api/Repair/" + eventId;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not save event." }), {
      status: 500,
    });
  }

  return redirect("/properties");
}
