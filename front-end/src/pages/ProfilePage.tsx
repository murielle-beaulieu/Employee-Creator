import { Link, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { Employee, getEmployeeById } from "../../services/employee-services";
import { Header } from "../components/Header/Header";
import { EmployeeContext } from "../context/EmployeeContext";
import { EmployeeDetails } from "../components/EmployeeDetails/EmployeeDetails";

export const ProfilePage = () => {
	const employees = useContext(EmployeeContext);
	const { id = "x" } = useParams();
	const [thisEmployee, setThisEmployee] = useState<Employee>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getEmployeeById(id)
			.then((employee) => {
				setLoading(false);
				setThisEmployee(employee);
			})
			.catch((e) => console.log(e));
	}, [id]);

	return (
		<>
			{thisEmployee && (
				<>
					{!loading && <Header data={thisEmployee} />}
					<div>
						{!loading && (
							<div>
								{thisEmployee?.department == "MANAGEMENT" ? (
									<>
										<ul>
											{employees &&
												employees.map((employee) => (
													<li>{employee.first_name}</li>
												))}
										</ul>
										<button>
											<Link to="/admin">See All Employees</Link>
										</button>
									</>
								) : (
									<>no no</>
								)}
								<button>
									<Link to="requests">Submit Leave Request</Link>
								</button>

								<EmployeeDetails data={thisEmployee} />
							</div>
						)}
					</div>
				</>
			)}
		</>
	);
};
