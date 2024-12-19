import { useState } from "react";

import Button from "../Button/Button.jsx";
import Input from "../Input/Input.jsx";
import { postRepair } from "../../store/repairs.js";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function RepairsEdit() {
  const { propertyIdNumber } = useParams();
  const [enteredPropertyId, setEnteredPropertyId] = useState("");
  const [enteredCost, setEnteredCost] = useState("");
  const [enteredAddress, setEnteredAddress] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredCurrentStatus, setEnteredCurrentStatus] = useState("");
  const [enteredType, setEnteredType] = useState("");
  const [enteredScheduledDate, setScheduledDate] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function goBack() {
    navigate("/");
  }

  function handleSubmit(event) {
    event.preventDefault();

    // const emailIsValid = enteredEmail.includes("@");
    // const passwordIsValid = enteredPassword.trim().length >= 6;
    // const vatNumberIsValid = enteredVATNumber.length < 8;

    setSubmitted(true);
    // if (!emailIsValid || !passwordIsValid || !vatNumberIsValid) {
    //   return;
    // }
    let currentDate = new Date();
    dispatch(
      postRepair({
        propertyId: propertyIdNumber,
        cost: enteredCost,
        address: enteredAddress,
        description: enteredDescription,
        currentStatus: enteredCurrentStatus,
        type: enteredType,
        scheduledDate: currentDate.toUTCString(),
      })
    );

    navigate("/properties");
  }

  function handleInputChange(identifier, value) {
    if (identifier === "cost") {
      setEnteredCost(value);
    } else if (identifier === "address") {
      setEnteredAddress(value);
    } else if (identifier === "description") {
      setEnteredDescription(value);
    } else if (identifier === "currentStatus") {
      setEnteredCurrentStatus(value);
    } else if (identifier === "type") {
      setEnteredType(value);
    } else {
      setScheduledDate(value);
    }
  }

  // const emailNotValid = submitted && !enteredEmail.includes("@");
  // const passwordNotValid = submitted && enteredPassword.trim().length < 6;
  // const vatNumberNotValid = submitted && enteredVATNumber > 8;

  return (
    <div
      id="auth-inputs"
      className="w-full max-w-sm p-8 mx-auto rounded shadow-md bg-gradient-to-b from-stone-700 to-stone-800"
    >
      <div className="flex flex-col gap-2 mb-6">
        <Input
          invalid={false}
          label="Cost"
          type="number"
          // style={{
          //   backgroundColor: emailNotValid ? '#fed2d2' : '#d1d5db'
          // }}
          onChange={(event) => handleInputChange("cost", event.target.value)}
        />
        <Input
          label="Address"
          type="text"
          onChange={(event) => handleInputChange("address", event.target.value)}
        />
        <Input
          label="Description"
          type="text"
          onChange={(event) =>
            handleInputChange("description", event.target.value)
          }
        />
        <Input
          label="Status"
          type="text"
          onChange={(event) =>
            handleInputChange("currentStatus", event.target.value)
          }
        />
        <Input
          label="type"
          type="number"
          onChange={(event) => handleInputChange("type", event.target.value)}
        />
      </div>
      <div className="flex justify-end gap-4">
        <Button onClick={handleSubmit}>Back</Button>
        <Button onClick={handleSubmit}>Edit</Button>
      </div>
    </div>
  );
}
