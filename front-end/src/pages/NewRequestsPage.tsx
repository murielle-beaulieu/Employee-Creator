import { useState } from "react";
import { createLeaveRequest } from "../../services/leave-request-services";
import { NavBar } from "../components/NavBar/NavBar";
import NewRequestForm from "../components/NewRequestForm/NewRequestForm";
import { NewRequestFormData } from "../components/NewRequestForm/new-request-schema";
import styles from "./PagesStyling.module.scss";
import { Link } from "react-router-dom";

export const NewRequestsPage = () => {
  const [errors, setErrors] = useState<string[]>([]);

  const requestFormSubmit = (data: NewRequestFormData) => {
    createLeaveRequest(data)
      .then()
      .catch((e) => setErrors(e));
    console.log(data);
  };

  return (
    <>
      <NavBar />
      <div className={styles.navigation}>
        <Link to="/home/admin">
          <button>Back to admin</button>
        </Link>
      </div>
      <h1>Leave Requests</h1>
      {errors && <small style={{ color: "red" }}>{errors}</small>}
      <NewRequestForm onSubmit={requestFormSubmit} />
    </>
  );
};
