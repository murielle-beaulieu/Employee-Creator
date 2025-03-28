package io.nology.employee_creator.leave_request;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import io.nology.employee_creator.employee.Employee;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "leave_requests")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class LeaveRequest {

  public enum RequestType {
    ANNUAL,
    SICK,
    PERSONAL
  }

  public enum RequestStatus {
    PENDING,
    APPROVED,
    DENIED,
    CANCELLED
  }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "employee_id", nullable = false)
  @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id") // to avoid circular
                                                                                             // referencing
  @JsonIdentityReference(alwaysAsId = true)
  private Employee employee;

  @Column
  @Temporal(TemporalType.TIMESTAMP)
  private LocalDateTime requestDate;

  @Column
  private LocalDate startDate;

  @Column
  private LocalDate endDate;

  @Column
  @Setter(AccessLevel.NONE)
  private Double totalRequested;

  @Enumerated(EnumType.STRING)
  @Column
  private RequestType requestType;

  @Enumerated(EnumType.STRING)
  @Column
  private RequestStatus status = RequestStatus.PENDING;

  @Column
  private String requestComment;

  @Column
  private String reason;

  @Column
  @Temporal(TemporalType.TIMESTAMP)
  private LocalDateTime createdAt;

  @Column
  @Temporal(TemporalType.TIMESTAMP)
  private LocalDateTime updatedAt;

  @PrePersist
  public void onCreate() {
    LocalDateTime timestamp = LocalDateTime.now();
    createdAt = timestamp;
    updatedAt = timestamp;
    requestDate = timestamp;
    this.totalRequested = (double) ChronoUnit.DAYS.between(startDate, endDate) ;
  }

  @PreUpdate
  public void onUpdate() {
    updatedAt = LocalDateTime.now();
  }

  public void totalRequested(Integer totalRequested) {
    this.totalRequested = (double) ChronoUnit.DAYS.between(startDate, endDate) ;
  }

}
