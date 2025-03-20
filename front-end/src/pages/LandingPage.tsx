import { useContext, useEffect, useState } from "react";
import {EmployeeContext} from "../context/EmployeeContext";
import { Employee, getAllEmployees } from "../../services/employee-services";

export const LandingPage = () => {

	const { employees } = useContext(EmployeeContext);
  console.log(employees);

  return (
		<>
			<h1>YOU GOT THIS BABY!</h1>
		</>
	);
};
