export interface LeaveRequest {
  // Define the LeaveRequest interface based on its properties
  // For example:
  id: number;
  startDate: string; // Date as string (yyyy-mm-dd)
  endDate: string; // Date as string (yyyy-mm-dd)
  reason: string;
  status: string;
}

export const getAllLeaveRequests = async () => {
  const response = await fetch("http://localhost:8080/leave_requests");
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return (await response.json()) as LeaveRequest[];
}
