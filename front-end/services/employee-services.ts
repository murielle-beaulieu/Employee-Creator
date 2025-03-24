import axios from 'axios';

import { EmployeeFormData } from "../src/components/EmployeeForm/employee-schema";
import { LeaveRequest } from "./leave-request-services";

export enum Contract {
  CASUAL = "CASUAL",
  CONTRACTOR = "CONTRACTOR",
  PART_TIME = "PART_TIME",
  FULL_TIME = "FULL_TIME"
}

export enum Department {
  HOUSEKEEPING = "HOUSEKEEPING ",
  MAINTENANCE = "MAINTENANCE",
  FRONT_DESK = "FRONT_DESK",
  RESERVATIONS = "RESERVATIONS",
  MARKETING = "MARKETING",
  ACCOUNTING = "ACCOUNTING",
  MANAGEMENT = "MANAGEMENT",
}

export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  dob: string;
  phone_number: string;
  email: string;
  username: string;
  password: string;
  address: string;
  start_date: string;
  end_date: string;
  role: string;
  department: Department;
  contract: Contract;
  on_probation: boolean;
  sick_days: number;
  sick_days_used: number;
  annual_leave_days: number;
  annual_leave_days_used: number;
  deleted: boolean;
  onLeave: boolean;
  leave_requests: LeaveRequest[];
  createdAt: string;
  updatedAt: string;
}

export const getAllEmployees = async () => {
  try {
  const response = await axios.get<Employee[]>("http://localhost:8080/employees");
  return response.data;
  } catch (error) {
    throw new Error("Failed to retrieve all employees (error:" + error + ")");
  }
}

export const getAllCurrentEmployees = async () => {
  try {
  const response = await axios.get<Employee[]>("http://localhost:8080/employees/current");
  return response.data;
  } catch (error) {
    throw new Error("Failed to retrieve all current employees(error:" + error + ")");
  }
}

export const getEmployeeById = async (id: string) => {
  try {
    const response = await axios.get<Employee>("http://localhost:8080/employees/" + id);
    return response.data;
    } catch (error) {
      throw new Error("Failed to retrieve all current employees(error:" + error + ")");
    }
}

export const createEmployee = async (data: EmployeeFormData) => {
  const response = await fetch("http://localhost:8080/employees", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    }
  })
  if (!response.ok) {
    throw new Error("Failed to create employee");
  }
  return (await response.json()) as Employee; // to navigate
}

export const updateEmployee = async (data: EmployeeFormData, id: string) => {
  const response = await fetch("http://localhost:8080/employees/" + id, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    }
  })
  if (!response.ok) {
    throw new Error("Failed to updated employee");
  }
  return (await response.json()) as Employee;
}

export const deleteEmployee = async (id: string) => {
  const response = await fetch("http://localhost:8080/employees/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  })
  if (!response.ok) {
    throw new Error("Failed to delete employee");
  }
}
