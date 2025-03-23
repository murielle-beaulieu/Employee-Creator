package io.nology.employee_creator.leave_request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProcessLeaveRequestDTO {

  public enum RequestStatus {
    PENDING,
    APPROVED,
    DENIED,
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

  private Long leaveId;

  // private LocalDate startDate;

  // private LocalDate endDate;

  private RequestType requestType;

  private RequestStatus status;

  private String reason;
}
