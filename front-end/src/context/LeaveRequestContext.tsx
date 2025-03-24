import { createContext, ReactNode} from "react";
import { useQuery } from '@tanstack/react-query'
import { getAllLeaveRequests, LeaveRequest } from "../../services/leave-request-services";

export const LeaveRequestContext = createContext<LeaveRequest[]>([]);

interface LeaveRequestContextProviderProps {
  children: ReactNode;
}

const LeaveRequestContextProvider = ({children}: LeaveRequestContextProviderProps) => {

    const {isPending, isError, data, error} = useQuery({queryKey: ['leaveRequests'], queryFn: getAllLeaveRequests});

    if(isPending) {
      return <span>Loading...</span>
    }

    if(isError) {
      console.log(error.message)
      return <span>Error: Something went wrong, try again</span>
    }

  return (
    <LeaveRequestContext.Provider value={data || []}>
      {children}
    </LeaveRequestContext.Provider>
  )
}

export default LeaveRequestContextProvider;
