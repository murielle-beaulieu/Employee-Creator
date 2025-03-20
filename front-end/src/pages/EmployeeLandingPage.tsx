import { useEffect, useState } from "react";
import { Employee, getEmployeeById } from "../../services/employee-services";
import { useParams } from "react-router";
import { EmployeeDetails } from "../components/EmployeeDetails/EmployeeDetails";
import { Header } from "../components/Header/Header";

export const EmployeeLandingPage = () => {
  const { id = "x" } = useParams();
	const [employee, setEmployee] = useState<Employee>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEmployeeById(id)
    .then((employee) => {
      setLoading(false);
      setEmployee(employee);
    }
    )
    .catch((e) => console.log(e));
  }, [id]);

  console.log(employee?.first_name);

  return (
		<>
      {!loading && <Header data={employee}/>}
      <div>
      {!loading &&
      <div>
			<h1>YOU GOT THIS BABY!</h1>
      <h2>Employee Landing Page</h2>
     <EmployeeDetails data={employee}/>
     </div>
     }
      </div>
		</>
	);
};
