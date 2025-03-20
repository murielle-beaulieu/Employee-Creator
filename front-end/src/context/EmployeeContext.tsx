import { createContext, ReactNode, useEffect, useState } from "react";
import { Employee, getAllEmployees } from "../../services/employee-services";

export const EmployeeContext = createContext({});

interface EmployeeContextProviderProps {
  children: ReactNode;
}

const EmployeeContextProvider = ({children}: EmployeeContextProviderProps) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const fetchEmployees = () => {
      getAllEmployees()
      .then((employees) => setEmployees(employees))
      .catch((e) => console.log(e));
    };

    useEffect(() => {
      fetchEmployees();
    }, []);

  return (
    <EmployeeContext.Provider value={{employees, fetchEmployees}}>
      {children}
    </EmployeeContext.Provider>
  )
}

export default EmployeeContextProvider;
