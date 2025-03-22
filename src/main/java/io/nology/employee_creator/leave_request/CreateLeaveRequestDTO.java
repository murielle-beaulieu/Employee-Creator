package io.nology.employee_creator.leave_request;

import java.time.LocalDate;

import io.nology.employee_creator.leave_request.LeaveRequest.RequestType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateLeaveRequestDTO {

  private Long employeeId;

  private LocalDate startDate;

  private LocalDate endDate;

  private RequestType requestType;

  private String requestComment;

}
