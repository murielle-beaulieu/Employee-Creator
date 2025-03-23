import { NewRequestFormData } from "../src/components/NewRequestForm/new-request-schema";
import { ProcessRequestFormData } from "../src/components/ProcessRequestForm/process-request-schema";

export enum RequestType {
  ANNUAL = "ANNUAL",
  SICK = "SICK",
  PERSONAL = "PERSONAL"
}

export enum RequestStatus {
  PENDING = "PENDING",
  APPROVED ="APPROVED",
  DENIED = "DENIED",
  CANCELLED = "CANCELLED"
}

export interface LeaveRequest {
  id: number;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
}

export const getAllLeaveRequests = async () => {
  const response = await fetch("http://localhost:8080/leave_requests");
  if (!response.ok) {
    throw new Error("Failed to fetch all requests");
  }
  return (await response.json()) as LeaveRequest[];
}

export const getLeaveRequestById = async (id: string) => {
  const response = await fetch("http://localhost:8080/leave_requests/" + id);
  if (!response.ok) {
    throw new Error("Failed to fetch specified leave request");
  }
  return (await response.json()) as LeaveRequest;
}

export const createLeaveRequest = async (data: NewRequestFormData) => {
  const response = await fetch ("http://localhost:8080/leave_requests", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    }
  })
  if (!response.ok) {
    throw new Error("Failed to create request");
  }
  return (await response.json()) as LeaveRequest;
}

export const processLeaveRequest = async (data: ProcessRequestFormData, id: string) => {
  const response = await fetch ("http://localhost:8080/leave_requests/" + id, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    }
  })
  if (!response.ok) {
    throw new Error("Failed to process request ${response.status}");
  }
  return (await response.json()) as LeaveRequest;
}
