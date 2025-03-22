package io.nology.employee_creator.employee;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class CreateEmployeeDTO {

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

  @NotBlank
  private String first_name;

  @NotBlank
  private String last_name;

  private LocalDate dob;

  @NotBlank
  @Pattern(regexp = "^(\\+61|0)[2-9]{1}[0-9]{8}$", message = "Invalid Australian phone number")
  private String phone_number;

  @NotBlank
  @Email(message = "Invalid email address")
  private String email;

  @NotBlank
  private String username;

  @NotBlank
  private String password; // use dob

  private String address; // must be australian

  private LocalDate start_date; // yyyy-mm-dd

  private LocalDate end_date; // yyyy-mm-dd

  private String role;

  private Department department;

  private Contract contract;

  private Boolean on_probation;

  private Double sick_days;

  private Double annual_leave_days;

  private Boolean deleted;
}
