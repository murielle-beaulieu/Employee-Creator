import { useEffect, useState } from "react";
import { useEmployees } from "../context/EmployeeContext";
import { NavBar } from "../components/NavBar/NavBar";
import {
  getAllLeaveRequests,
  LeaveRequest,
} from "../../services/leave-request-services";
import { EmployeesList } from "../components/EmployeesList/EmployeesList";
import { RequestsList } from "../components/RequestsList/RequestsList";
import styles from "./PagesStyling.module.scss";
import { Employee } from "../../services/employee-services";
import { Link } from "react-router-dom";

export const AdminPage = () => {
  const { currentEmployees, allEmployees } = useEmployees();
  const [display, setDisplay] = useState<Employee[] | LeaveRequest[] | null>(
    currentEmployees
  );

  const [allLeaveRequests, setAllLeaveRequests] = useState<LeaveRequest[]>([]);

  useEffect(() => {
    setDisplay(currentEmployees);
    getAllLeaveRequests()
      .then((leaveRequests) => setAllLeaveRequests(leaveRequests))
      .catch((e) => console.log(e));
  }, []);

  return (
    <main className={styles.admin}>
      <NavBar />
      <div>
        <h1>Admin Page</h1>
        <Link to="new-employee">
          <button>Create New Employee</button>
        </Link>
        <button onClick={() => setDisplay(currentEmployees)}>
          See Current Employees
        </button>
        <button onClick={() => setDisplay(allEmployees)}>
          See All Employees
        </button>
        <button onClick={() => setDisplay(allLeaveRequests)}>
          See Leave Requests
        </button>
        <Link to="/home/profile/1">
          <button className={styles.close}>Go back to Profile</button>
        </Link>


        {display == currentEmployees && (
          <div className={styles.display}>
            <section className={styles.head}>
              <h2>Current Employees</h2>
            </section>
            <EmployeesList data={currentEmployees} />
          </div>
        )}

        {display == allEmployees && (
          <div className={styles.display}>
            <section className={styles.head}>
              <h2>All Employees</h2>
            </section>
            <EmployeesList data={allEmployees} />
          </div>
        )}

        {display == allLeaveRequests && (
          <div className={styles.display}>
            <section className={styles.head}>
              <h2>All Leave Requests</h2>
            </section>
            <RequestsList data={allLeaveRequests} />
          </div>
        )}

        {display == null && <></>}
      </div>
    </main>
  );
};
