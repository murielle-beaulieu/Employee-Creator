import { useState } from "react";
import { createLeaveRequest } from "../../services/leave-request-services";
import { NavBar } from "../components/NavBar/NavBar";
import NewRequestForm from "../components/NewRequestForm/NewRequestForm";
import { NewRequestFormData } from "../components/NewRequestForm/new-request-schema";
import styles from "./PagesStyling.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";

export const NewRequestsPage = () => {

  const { id = '' } = useParams();
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const requestFormSubmit = (data: NewRequestFormData) => {
    createLeaveRequest(data)
      .then(() => navigate(`/home/profile/${id}`))
      .catch((e) => setErrors(e));
    console.log(data);
  };

  return (
    <>
      <NavBar />
      <div className={styles.navigation}>
        <Link to={`/home/profile/${id}`}>
          <button>Back to profile</button>
        </Link>
      </div>
      <h1>Leave Request</h1>
      {errors && <small style={{ color: "red" }}>{errors}</small>}
      <NewRequestForm onSubmit={requestFormSubmit} />
    </>
  );
};
