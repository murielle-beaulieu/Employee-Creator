import { Link, useNavigate } from "react-router-dom";
import { createEmployee } from "../../services/employee-services";
import { EmployeeFormData } from "../components/EmployeeForm/employee-schema";
import EmployeeForm from "../components/EmployeeForm/EmployeeForm";
import { NavBar } from "../components/NavBar/NavBar";
import { useEmployees } from "../context/EmployeeContext";
import styles from "./PagesStyling.module.scss";

export const NewEmployeePage = () => {
	
  const { setCurrentEmployees, setAllEmployees } = useEmployees();

  const navigate = useNavigate();

  const newEmployeeFormSubmit = (data: EmployeeFormData) => {
    createEmployee(data)
      .then((res) => {
        setCurrentEmployees((prev: any) => [...prev, res]);
		setAllEmployees((prev: any) => [...prev, res]);
        navigate("/home/admin");
      })
      .catch((e) => console.log(e));

    console.log(data);
  };

  return (
    <>
      <NavBar/>
	  <div className={styles.navigation}>
	 	<Link to="/home/admin"><button>Back to admin</button></Link>
	  </div>
      <h1>Create new employee</h1>
      <EmployeeForm onSubmit={newEmployeeFormSubmit} />
    </>
  );
};
