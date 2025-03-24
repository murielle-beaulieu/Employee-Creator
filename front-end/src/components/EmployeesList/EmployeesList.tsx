import { EmployeeCard } from "../EmployeeCard/EmployeeCard";
import { Employee } from "../../../services/employee-services";

interface EmployeesListProps {
	data: Employee[];
}

export function EmployeesList({ data }: EmployeesListProps) {

	return (
		<section>
			{data.map((employee: Employee) => {
				return <EmployeeCard data={employee} key={employee.id}/>;
			})}
		</section>
	);
}
