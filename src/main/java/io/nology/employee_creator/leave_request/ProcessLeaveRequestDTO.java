package io.nology.employee_creator.leave_request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProcessLeaveRequestDTO {

  public enum RequestStatus {
    APPROVED,
    REJECTED,
    CANCELLED
  }

    public enum RequestType {
    ANNUAL,
    SICK,
    PERSONAL,
    COMPASSIONATE,
    MATERNITY,
    PATERNITY,
    UNPAID
  }

  private Long employeeId;

  private RequestType requestType;

  private RequestStatus status;

  private String reason;
}
