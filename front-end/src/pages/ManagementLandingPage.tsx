import { Link, useParams } from "react-router";
import { EmployeeDetails } from "../components/EmployeeDetails/EmployeeDetails"
import { useEffect, useState } from "react";
import { Employee, getEmployeeById } from "../../services/employee-services";
import { Header } from "../components/Header/Header";

export const ManagementLandingPage = () => {

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

  return (
    <>
    {!loading && <Header data={employee}/>}
    <div>
     {!loading &&
     <div>
    <h1>Management Landing Page</h1>
    <button><Link to="see_all">See All Employees</Link></button>
    <EmployeeDetails data={employee} />
    </div>
    }
    </div>
    </>

  )
}
