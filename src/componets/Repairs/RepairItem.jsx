/* eslint-disable react/prop-types */
import { Link, useSubmit } from "react-router-dom";

// import classes from './EventItem.module.css';

function RepairItem({ repair }) {
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  }

  return (
    <section>
      <p>{repair.description}</p>
      <p>{repair.status}</p>

      <menu>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </section>
  );
}

export default RepairItem;
