import { createEmployee } from "../../services/employee-services";
import { EmployeeFormData } from "../components/EmployeeForm/employee-schema";
import EmployeeForm from "../components/EmployeeForm/EmployeeForm";
import { NavBar } from "../components/NavBar/NavBar";

export const NewEmployeePage = () => {

	const newEmployeeFormSubmit = (data: EmployeeFormData) => {
		createEmployee(data)
			.then()
			.catch((e) => console.log(e));
		console.log(data);
	};

	return (
		<>
			<NavBar />
			<h1>Create new employee</h1>
			<EmployeeForm onSubmit={newEmployeeFormSubmit} />
		</>
	);
};
