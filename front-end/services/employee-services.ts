export interface Employee {
  id: number,
  first_name: string,
  last_name: string,
  dob: string,
  username: string,
  email: string,
  password: string,
  phone_number: string,
  start_date: string,
  end_date: string | null,
  role: string,
  department: string,
  contract: string,
  probation: boolean,
  createdAt: string,
  updatedAt: string,
}
// - Department (enum)
// - Contract - casual, contractor, part time, full time

export const getAllEmployees = async () => {
  const response = await fetch("http://localhost:8080/employees");
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return (await response.json()) as Employee[];
}
