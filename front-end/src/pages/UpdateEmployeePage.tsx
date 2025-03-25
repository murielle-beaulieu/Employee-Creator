import { Link, useParams } from "react-router";
import {
  Employee,
  getEmployeeById,
  updateEmployee,
} from "../../services/employee-services";

import { useEffect, useState } from "react";
import UpdateEmployeeForm from "../components/EmployeeForm/UpdateEmployeeForm";
import { UpdateEmployeeFormData } from "../components/EmployeeForm/update-employee-schema";
import { NavBar } from "../components/NavBar/NavBar";

import styles from "./PagesStyling.module.scss";

export const UpdateEmployeePage = () => {
  const [employee, setEmployee] = useState<Employee>({});

  const { id = x } = useParams();

  const employeeToUpdate = (id: string) => {
    getEmployeeById(id)
      .then((employee) => setEmployee(employee))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    employeeToUpdate(id);
  }, [id]);
  console.log(employee.first_name);

  const updateEmployeeFormSubmit = (data: UpdateEmployeeFormData) => {
    updateEmployee(data, `${employee.id}`)
      .then()
      .catch((e) => console.log(e));
  };

  return (
    <>
      <NavBar />
	  <div className={styles.navigation}>
        <Link to="/home/admin">
          <button>Back to admin</button>
        </Link>
      </div>
      <h1>Update {employee.first_name}'s details</h1>
      <UpdateEmployeeForm
        onSubmit={updateEmployeeFormSubmit}
        currentDetails={employee}
      />
    </>
  );
};
