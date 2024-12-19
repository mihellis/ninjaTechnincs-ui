import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  redirect,
} from "react-router-dom";
import Input from "../Input/Input";
import Dropdown from "../Input/Dropdown";
import Button from "../Button/Button";

const userTypes = [
  { label: "Client", value: 0 },
  { label: "Admin", value: 1 },
];

// eslint-disable-next-line react/prop-types
function UserForm({ method, event }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  // const defaultDate =
  //   event && event.scheduledDate
  //     ? new Date(event.scheduledDate).toISOString().slice(0, 10)
  //     : "";

  function cancelHandler() {
    navigate("/home");
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
      <p>
        <Input
          id="vatNumber"
          label="VatNumber"
          type="number"
          name="vatNumber"
          required
          defaultValue={event ? event.vatNumber : ""}
          disabled={method === "view" ? true : false}
        />
      </p>
      <p>
        <Input
          id="name"
          label="Name"
          type="text"
          name="name"
          required
          defaultValue={event ? event.name : ""}
          disabled={method === "view" ? true : false}
        />
      </p>
      <Dropdown
        id="type"
        label="Repair Type"
        options={userTypes}
        invalid={false}
        name="type"
        defaultValue={event ? event.role : 0}
        disabled={method === "view" ? true : false}
      />
      <p>
        <Input
          id="phoneNumber"
          label="PhoneNumber"
          type="number"
          name="phoneNumber"
          required
          defaultValue={event ? event.phoneNumber : ""}
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
      <p>
        <Input
          id="email"
          label="Email"
          type="email"
          name="email"
          required
          defaultValue={event ? event.email : ""}
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

export default UserForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  console.warn(data.get("type"));
  const eventData = {
    vatNumber: data.get("vatNumber"),
    name: data.get("name"),
    role: parseInt(data.get("type"), 10), // Convert to number,
    address: data.get("address"),
    phoneNumber: data.get("phoneNumber"),
    email: data.get("email"),
  };

  let url = "https://localhost:7166/api/Repair";

  if (method === "PUT") {
    const eventId = params.userID;

    url = "https://localhost:7166/api/User/" + eventId;
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
