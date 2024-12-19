import { useState } from "react";

import Button from "../Button/Button.jsx";
import Input from "../Input/Input.jsx";
import { postUser } from "../../store/user-actions.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [enteredVATNumber, setEnteredVATNumber] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredSurname, setEnteredSurname] = useState("");
  const [enteredAddress, setEnteredAddress] = useState("");
  const [enteredPhoneNumber, setPhoneNumber] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function goBack() {
    navigate("/login");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const emailIsValid = enteredEmail.includes("@");
    const passwordIsValid = enteredPassword.trim().length >= 6;
    const vatNumberIsValid = enteredVATNumber.length < 8;

    setSubmitted(true);
    if (!emailIsValid || !passwordIsValid || !vatNumberIsValid) {
      return;
    }

    dispatch(
      postUser({
        vatNumber: enteredVATNumber,
        name: enteredName,
        surname: enteredSurname,
        address: enteredAddress,
        phoneNumber: enteredPhoneNumber,
        email: enteredEmail,
        password: enteredPassword,
      })
    );

    navigate("/login");
  }

  function handleInputChange(identifier, value) {
    if (identifier === "vatNumber") {
      setEnteredVATNumber(value);
    } else if (identifier === "name") {
      setEnteredName(value);
    } else if (identifier === "surname") {
      setEnteredSurname(value);
    } else if (identifier === "address") {
      setEnteredAddress(value);
    } else if (identifier === "phoneNumber") {
      setPhoneNumber(value);
    } else if (identifier === "email") {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  const emailNotValid = submitted && !enteredEmail.includes("@");
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;
  const vatNumberNotValid = submitted && enteredVATNumber > 8;

  return (
    <div
      id="auth-inputs"
      className="w-full max-w-sm p-8 mx-auto rounded shadow-md bg-gradient-to-b from-stone-700 to-stone-800"
    >
      <div className="flex flex-col gap-2 mb-6">
        <Input
          invalid={vatNumberNotValid}
          label="VatNumber"
          type="number"
          // style={{
          //   backgroundColor: emailNotValid ? '#fed2d2' : '#d1d5db'
          // }}
          onChange={(event) =>
            handleInputChange("vatNumber", event.target.value)
          }
        />
        <Input
          label="Name"
          type="text"
          onChange={(event) => handleInputChange("name", event.target.value)}
        />
        <Input
          label="Surname"
          type="text"
          onChange={(event) => handleInputChange("surname", event.target.value)}
        />
        <Input
          label="Address"
          type="text"
          onChange={(event) => handleInputChange("address", event.target.value)}
        />
        <Input
          label="PhoneNumber"
          type="number"
          onChange={(event) =>
            handleInputChange("phoneNumber", event.target.value)
          }
        />
        <Input
          label="Email"
          invalid={emailNotValid}
          type="email"
          onChange={(event) => handleInputChange("email", event.target.value)}
        />
        <Input
          invalid={passwordNotValid}
          label="Password"
          type="password"
          onChange={(event) =>
            handleInputChange("password", event.target.value)
          }
        />
      </div>
      <div className="flex justify-end gap-4">
        <button
          onClick={goBack}
          type="button"
          className="text-amber-400 hover:text-amber-500"
        >
          Go back to Login page
        </button>
        <Button onClick={handleSubmit}>Sign Up</Button>
      </div>
    </div>
  );
}
