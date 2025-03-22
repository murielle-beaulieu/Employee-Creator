import { useEffect, useState } from "react";
import { Employee, getEmployeeById, getEmployeeLeave } from "../../services/employee-services";
import { useParams } from "react-router";
import { EmployeeDetails } from "../components/EmployeeDetails/EmployeeDetails";
import { Header } from "../components/Header/Header";
import { getAllLeaveRequests } from "../../services/leave-request-services";

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

    getAllLeaveRequests()
    .then()
    .catch((e)=> console.log(e));
  }, [id]);

  return (
		<>
      {!loading && <Header data={employee}/>}
      <div>
      {!loading &&
      <div>
      <h2>Employee Landing Page</h2>
     <EmployeeDetails data={employee}/>
     </div>
     }
      </div>
		</>
	);
};
