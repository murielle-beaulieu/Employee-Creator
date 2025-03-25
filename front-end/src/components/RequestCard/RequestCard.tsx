import { Link } from "react-router";
import { LeaveRequest } from "../../../services/leave-request-services";
import styles from "./RequestCard.module.scss";
import { Employee, getEmployeeById } from "../../../services/employee-services";
import { useEffect, useState } from "react";

interface RequestCardProps {
  request: LeaveRequest;
}

export function RequestCard ({request}: RequestCardProps) {

  const emId = request.employee;
  const [emp,setEmp] = useState<Employee>();

  useEffect(() => {
  getEmployeeById(`${emId}`)
  .then((em) => setEmp(em))
  .catch((e)=>console.log(e))
},[emId])

const requestedBy = emp?.first_name +" "+ emp?.last_name;

  return (
    <section>
      <h3>Status: {request.status}</h3>
      <article className={styles.requestCard}>
        <h4>Submitted by: {requestedBy}</h4>
        <p>Request type: {request.requestType}</p>
        <p>Start date: {request.startDate}</p>
        <p>End date: {request.endDate}</p>
        <p>Request Comment: {request.requestComment}</p>
        <Link to={`requests/${request.id}`}><button>Process request</button></Link>
      </article>
    </section>
  )
}
