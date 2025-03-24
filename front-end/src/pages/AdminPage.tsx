import { useEffect, useState } from "react";
import { useEmployees } from "../context/EmployeeContext";
import { NavBar } from "../components/NavBar/NavBar";
import {
	getAllLeaveRequests,
	LeaveRequest,
} from "../../services/leave-request-services";
import { EmployeesList } from "../components/EmployeesList/EmployeesList";
import { RequestsList } from "../components/RequestsList/RequestsList";
import styles from "./AdminPage.module.scss";

export const AdminPage = () => {
	const { currentEmployees, allEmployees } = useEmployees();
	const [display, setDisplay] = useState(currentEmployees);

	const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);

	useEffect(() => {
		getAllLeaveRequests()
			.then((leaveRequests) => setLeaveRequests(leaveRequests))
			.catch((e) => console.log(e));
	},[]);

	return (
		<>
			<NavBar />
			<div>
				<h1>Admin Page</h1>
				<details>
					<summary>
						<h2>Employees</h2>
					</summary>
					<div className={styles.oo}>
						<button onClick={() => setDisplay(currentEmployees)}>
							See all current employees
						</button>
						<button onClick={() => setDisplay(allEmployees)}>
							See all employees
						</button>
					</div>
					{display == currentEmployees ? (
						<h2> All Current Employees</h2>
					) : (
						<h2>All Current and Past Employees</h2>
					)}
					<EmployeesList data={display} />
				</details>
				<details>
					<summary>
						<h2>Leave Requests</h2>
					</summary>
					<RequestsList data={leaveRequests} />
				</details>
			</div>
		</>
	);
};
