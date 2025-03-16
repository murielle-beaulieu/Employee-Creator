package io.nology.employee_creator.employee;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Entity
@Table(name = "employees")
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
  private String dob; // yyyy-mm-dd

  @Column
  private String email; // email@address.com

  @Column
  private String address; // must be australian

  @Column
  private String start_date; // yyyy-mm-dd

  @Column
  private String end_date; // yyyy-mm-dd

  @Column
  private String role;

  @Enumerated(EnumType.STRING)
  private Department department;

  @Enumerated(EnumType.STRING)
  private Contract contract;

  @Column
  private Boolean on_probation;

  @Column
  @Temporal(TemporalType.TIMESTAMP)
  private Date createdAt;

  @Column
  @Temporal(TemporalType.TIMESTAMP)
  private Date updatedAt;

  @PrePersist
  public void onCreate() {
    Date timestamp = new Date();
    createdAt = timestamp;
    updatedAt = timestamp;
  }

  @PreUpdate
  public void onUpdate() {
    updatedAt = new Date();
  }

  public Employee() {
  }
}

// before Lombok: 211 lines
