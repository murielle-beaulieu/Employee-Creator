import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import { Employee} from "../../services/employee-services";
import axios from "axios";

interface EmployeeContextProviderProps {
	children: ReactNode;
}

interface EmployeeContextType {
	allEmployees: Employee[];
	currentEmployees: Employee[];
	setCurrentEmployees: Dispatch<SetStateAction<Employee[]>>;
	setAllEmployees: Dispatch<SetStateAction<Employee[]>>;
	getCurrentEmployees: () => void;
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

  const getCurrentEmployees = async () => {
	try {
		const response = await axios.get<Employee[]>(
			"http://localhost:8080/employees/current"
		);
		setCurrentEmployees(response.data);
	} catch (error) {
		throw new Error("Failed to retrieve all current employees (error:" + error + ")");
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
		getCurrentEmployees();
		fetchAllEmployees();
	}, []);

	return (
		<EmployeeContext.Provider
			value={{
				allEmployees,
				currentEmployees,
				getCurrentEmployees,
				fetchAllEmployees,
				setCurrentEmployees,
				setAllEmployees
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
