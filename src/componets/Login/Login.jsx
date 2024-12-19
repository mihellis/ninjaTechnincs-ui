import { useState } from "react";

import Button from "../Button/Button.jsx";
import Input from "../Input/Input.jsx";
import { fetchUser, validateUser } from "../../store/user-actions.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleCreateAccount() {
    navigate("/sign-up");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const emailIsValid = enteredEmail.includes("@");
    const passwordIsValid = enteredPassword.trim().length >= 6;

    setSubmitted(true);
    if (!emailIsValid || !passwordIsValid) {
      return;
    }

    dispatch(validateUser({ email: enteredEmail, password: enteredPassword }));
    navigate("/properties");
  }

  function handleInputChange(identifier, value) {
    if (identifier === "email") {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  const emailNotValid = submitted && !enteredEmail.includes("@");
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <div
      id="auth-inputs"
      className="w-full max-w-sm p-8 mx-auto rounded shadow-md bg-gradient-to-b from-stone-700 to-stone-800"
    >
      <h1 className="mb-4 text-2xl font-bold text-center text-amber-400">
        Login
      </h1>
      <div className="flex flex-col gap-2 mb-6">
        <Input
          label="Email"
          invalid={emailNotValid}
          type="email"
          // style={{
          //   backgroundColor: emailNotValid ? '#fed2d2' : '#d1d5db'
          // }}
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
          onClick={handleCreateAccount}
          type="button"
          className="text-amber-400 hover:text-amber-500"
        >
          Create a new account
        </button>
        <Button onClick={handleSubmit}>Sign In</Button>
      </div>
    </div>
  );
}
