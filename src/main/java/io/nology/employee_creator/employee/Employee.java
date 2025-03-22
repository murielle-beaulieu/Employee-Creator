package io.nology.employee_creator.employee;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import io.nology.employee_creator.leave_request.LeaveRequest;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "employees")
@AllArgsConstructor
@NoArgsConstructor
@Data public class Employee {

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

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  private String first_name;

  @Column
  private String last_name;

  @Column
  private LocalDate dob; // yyyy-mm-dd

  @Column
  private String phone_number;

  @Column(unique=true)
  private String email; // email@address.com

  @Column(unique=true)
  private String username;

  @Column
  private String password;

  @Column
  private String address; // must be australian

  @Column
  private LocalDate start_date; // yyyy-mm-dd

  @Column
  private LocalDate end_date; // yyyy-mm-dd

  @Column
  private String role;

  @Enumerated(EnumType.STRING)
  private Department department;

  @Enumerated(EnumType.STRING)
  private Contract contract;

  @Column
  private Boolean on_probation = true;

  @Column
  private Double sick_days = 0.0;

  @Column
  private Double sick_days_used = 0.0;

  @Column
  private Double annual_leave_days = 0.0;

  @Column
  private Double annual_leave_days_used = 0.0;

  @Column
  private Boolean deleted = false;

  @Column
  private Boolean on_leave = false;

  @OneToMany(mappedBy="employee")
  private List<LeaveRequest> leave_requests;

  @Column
  private LocalDateTime createdAt;

  @Column
  private LocalDateTime updatedAt;

  @PrePersist
  public void onCreate() {
    LocalDateTime timestamp = LocalDateTime.now();
    createdAt = timestamp;
    updatedAt = timestamp;
  }

  @PreUpdate
  public void onUpdate() {
    updatedAt = LocalDateTime.now();
  }

}
