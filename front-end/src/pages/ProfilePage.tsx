import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { Employee, getAllEmployees, getEmployeeById } from "../../services/employee-services";
import { Header } from "../components/Header/Header";
import { EmployeeDetails } from "../components/EmployeeDetails/EmployeeDetails";

export const ProfilePage = () => {
	const { id = "x" } = useParams();
	const [thisEmployee, setThisEmployee] = useState<Employee>();
	const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);

	useEffect(() => {

    const fetchEmployees = async () => {
      try {
        const data = getAllEmployees();
        setEmployees(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchEmployees();

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
						<EmployeeDetails data={thisEmployee} />
						{!loading && (
							<div>
								{thisEmployee?.department == "MANAGEMENT" ? (
									<button>
										<Link to="/home/admin">See All Employees</Link>
									</button>
								) : (
									<>no no</>
								)}
								<button>
									<Link to="requests">Submit Leave Request</Link>
								</button>
							</div>
						)}
					</div>
				</>
			)}
		</>
	);
};
