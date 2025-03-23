import { createContext, ReactNode} from "react";
import { Employee, getAllEmployees } from "../../services/employee-services";
import { useQuery } from '@tanstack/react-query'

export const EmployeeContext = createContext<Employee[]>([]);

interface EmployeeContextProviderProps {
  children: ReactNode;
}

const EmployeeContextProvider = ({children}: EmployeeContextProviderProps) => {

    const {isPending, isError, data, error} = useQuery({queryKey: ['employees'], queryFn: getAllEmployees});

    if(isPending) {
      return <span>Loading...</span>
    }

    if(isError) {
      return <span>Error: {error.message}</span>
    }

  return (
    <EmployeeContext.Provider value={data}>
      {children}
    </EmployeeContext.Provider>
  )
}

export default EmployeeContextProvider;
