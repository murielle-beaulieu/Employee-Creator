import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { Employee } from "../../services/employee-services";
import axios from "axios";

interface EmployeeContextProviderProps {
	children: ReactNode;
}

interface EmployeeContextType {
	allEmployees: Employee[];
	currentEmployees: Employee[];
	fetchCurrentEmployees: () => void;
	fetchAllEmployees: () => void;
}
export const EmployeeContext = createContext<EmployeeContextType | undefined>(
	undefined
);

export const EmployeeContextProvider = ({
	children,
}: EmployeeContextProviderProps) => {
	const [currentEmployees, setCurrentEmployees] = useState<Employee[]>([]);
	const [allEmployees, setAllEmployees] = useState<Employee[]>([]);

	const fetchCurrentEmployees = async () => {
		try {
			const response = await axios.get<Employee[]>(
				"http://localhost:8080/employees/current"
			);
			console.log(response);
			setCurrentEmployees(response.data);
		} catch (error) {
			throw new Error(
				"Failed to retrieve all current employees (error:" + error + ")"
			);
		}
	};

	const fetchAllEmployees = async () => {
		try {
			const response = await axios.get<Employee[]>(
				"http://localhost:8080/employees"
			);
			setAllEmployees(response.data);
		} catch (error) {
			throw new Error("Failed to retrieve all employees (error:" + error + ")");
		}
	};

	useEffect(() => {
		fetchCurrentEmployees();
		fetchAllEmployees();
	}, []);

	return (
		<EmployeeContext.Provider
			value={{
				allEmployees,
				currentEmployees,
				fetchCurrentEmployees,
				fetchAllEmployees,
			}}>
			{children}
		</EmployeeContext.Provider>
	);
};

export const useEmployees = (): EmployeeContextType => {
	const context = useContext(EmployeeContext);
	if (!context) {
    throw new Error("Something went wrong");
	}
  	return context;
};
