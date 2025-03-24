import { useParams } from "react-router";
import { Employee, getEmployeeById, updateEmployee } from "../../services/employee-services";

import { useEffect, useState } from "react";
import UpdateEmployeeForm from "../components/EmployeeForm/UpdateEmployeeForm";
import { UpdateEmployeeFormData } from "../components/EmployeeForm/update-employee-schema";
import { NavBar } from "../components/NavBar/NavBar";

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
        .catch((e) => console.log(e))
    }


	return (
		<>
    <NavBar />
			<h1>Update Employe #{id}</h1>
			<UpdateEmployeeForm
				onSubmit={updateEmployeeFormSubmit}
				currentDetails={employee}
			/>
		</>
	);
};
