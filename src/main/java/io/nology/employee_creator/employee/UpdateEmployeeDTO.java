package io.nology.employee_creator.employee;

import lombok.Data;

@Data public class UpdateEmployeeDTO {
  public enum Contract {
    CASUAL,
    CONTRACTOR,
    PART_TIME,
    FULL_TIME,
  }

  public enum Department {
    HOUSEKEEPING,
    MAINTENANCE,
    FRONT_DESK,
    RESERVATIONS,
    MARKETING,
    ACCOUNTING,
    MANAGEMENT,
  }


  private String first_name;

  private String last_name;

  private String dob; // yyyy-mm-dd

  private String phone_number;

  private String email; // email@address.com

  // @NotBlank
  // private String username;

  // @NotBlank
  // private String password;

  private String address; // must be australian

  private String start_date; // yyyy-mm-dd

  private String end_date; // yyyy-mm-dd

  private String role;

  private Department department;

  private Contract contract;

  private Boolean on_probation;

  private Double sick_days;

  private Double annual_leave_days;

}
