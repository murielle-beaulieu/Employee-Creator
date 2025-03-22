import { LeaveRequest } from "./leave-request-services";

enum Contract {
  CASUAL,
  CONTRACTOR,
  PART_TIME,
  FULL_TIME,
}

enum Department {
  HOUSEKEEPING,
  MAINTENANCE,
  FRONT_DESK,
  RESERVATIONS,
  MARKETING,
  ACCOUNTING,
  MANAGEMENT,
}

// export interface Employee {
//   id: number,
//   first_name: string,
//   last_name: string,
//   dob: string,
//   username: string,
//   email: string,
//   password: string,
//   phone_number: string,
//   address: string,
//   start_date: string,
//   end_date: string | null,
//   role: string,
//   department: Department,
//   contract: Contract,
//   probation: boolean,
//   createdAt: string,
//   updatedAt: string,
// }

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  dob: string; // Date as string (yyyy-mm-dd)
  phoneNumber: string;
  email: string;
  username: string;
  password: string;
  address: string; // Australian address format (you can validate format as needed)
  startDate: string; // Date as string (yyyy-mm-dd)
  endDate: string; // Date as string (yyyy-mm-dd)
  role: string;
  department: Department;
  contract: Contract;
  onProbation: boolean;
  sickDays: number;
  sickDaysUsed: number;
  annualLeaveDays: number;
  annualLeaveDaysUsed: number;
  deleted: boolean;
  onLeave: boolean;
  leaveRequests: LeaveRequest[]; // List of leave requests
  createdAt: string; // DateTime as string (yyyy-mm-ddTHH:mm:ss)
  updatedAt: string; // DateTime as string (yyyy-mm-ddTHH:mm:ss)
}


export const getAllEmployees = async () => {
  const response = await fetch("http://localhost:8080/employees");
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return (await response.json()) as Employee[];
}

export const getEmployeeById = async (id: string) => {
  const response = await fetch("http://localhost:8080/employees/" + id);
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return (await response.json()) as Employee;
}
