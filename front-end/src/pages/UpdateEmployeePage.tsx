import { Link, useNavigate, useParams } from "react-router";
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
import { useEmployees } from "../context/EmployeeContext";

export const UpdateEmployeePage = () => {
  const { setCurrentEmployees, setAllEmployees } = useEmployees();

  const [employee, setEmployee] = useState<Employee>({});
  const { id = "" } = useParams();

  const navigate = useNavigate();

  const employeeToUpdate = (id: string) => {
    getEmployeeById(id)
      .then((employee) => setEmployee(employee))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    employeeToUpdate(id);
  }, [id]);

  const updateEmployeeFormSubmit = (data: UpdateEmployeeFormData) => {
    updateEmployee(data, `${employee.id}`)
      .then((res) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setCurrentEmployees((prev: any) => [...prev, res]);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setAllEmployees((prev: any) => [...prev, res]);
        navigate("/home/admin");
      })
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
      {employee && (
        <>
          <h1>Update {employee.first_name}'s details</h1>
          <UpdateEmployeeForm
            onSubmit={updateEmployeeFormSubmit}
            currentDetails={employee}
          />
        </>
      )}
    </>
  );
};
