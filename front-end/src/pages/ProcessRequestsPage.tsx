import ProcessRequestForm from "../components/ProcessRequestForm/ProcessRequestForm"
import { processLeaveRequest } from "../../services/leave-request-services";
import { ProcessRequestFormData } from "../components/ProcessRequestForm/process-request-schema";
import styles from "./PagesStyling.module.scss";
import { Link } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar";

export const ProcessRequestPage = () => {

  const submitProcessedRequest = (data: ProcessRequestFormData ) => {
    processLeaveRequest(data, data.leaveId)
      .then()
      .catch((e) => console.log(e))
  }

  return (
    <>
    <NavBar/>
    <h1>Process Leave requests</h1>
    <div>
        <Link to="/home/admin">
          <button className={styles.close}>Back to admin</button>
        </Link>
      </div>
    <ProcessRequestForm onSubmit={submitProcessedRequest}/>
    </>
  )
}
