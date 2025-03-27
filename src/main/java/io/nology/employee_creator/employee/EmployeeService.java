package io.nology.employee_creator.employee;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import io.nology.employee_creator.employee.Employee.Contract;

@Service
public class EmployeeService {

  private EmployeeRepository repo;
  private ModelMapper mapper;

  public EmployeeService(EmployeeRepository repo, ModelMapper mapper) {
    this.repo = repo;
    this.mapper = mapper;
  }

  public List<Employee> getAllEmployees() {
    return this.repo.findAll();
  }

  public List<Employee> getCurrentEmployees() {
    List<Employee> all = this.repo.findAll();
    List<Employee> current = all.stream().filter((employee) -> employee.getDeleted().equals(false))
        .collect(Collectors.toList());
    return current;
  }

  public Optional<Employee> getEmployeeById(Long id) {
    return this.repo.findById(id);
  }

  public Employee createEmployee(CreateEmployeeDTO data) {
    Employee newEmployee = mapper.map(data, Employee.class);
    sick_days(newEmployee);
    annual_leave(newEmployee);
    return this.repo.save(newEmployee);
  }

  public Employee updateEmployee(Long id, UpdateEmployeeDTO data) {
    Optional<Employee> result = this.repo.findById(id);
    if (result.isEmpty()) {
      return null;
    }
    Employee found = result.get();
    mapper.map(data, found);
    sick_days(found);
    annual_leave(found);
    // probation_period(found);
    return this.repo.save(found);
  }

  public void deleteEmployee(Long id) {
    Optional<Employee> result = this.repo.findById(id);
    if (result.isEmpty()) {
      return;
    }
    Employee found = result.get();
    found.setDeleted(true);
    this.repo.save(found);
  }

  private void sick_days(Employee employee) {
    if(employee.getContract() == Contract.PART_TIME) { employee.setSick_days((double) 4);}
    if(employee.getContract() == Contract.FULL_TIME) { employee.setSick_days((double) 10);}
  }

  private void annual_leave(Employee employee) {

    // only full time and part time accumulate leave
    // you gain 2.923 hours annual leave per week or 20 days per year (20 * 8 =
    // 160hrs)
    // the leave shouldn't roll over
    // the leave period starts from jan 1st

    if (employee.getContract() == Contract.PART_TIME || (employee.getContract() == Contract.FULL_TIME)) {
      Integer current_year = LocalDate.now().getYear();
      LocalDate year_start = LocalDate.parse(current_year + "-01-01");
      LocalDate today = LocalDate.now();
      double weeksPassed = ChronoUnit.WEEKS.between(year_start, today);
      double acc = Math.floor(weeksPassed * 2.923)/8;
      if(acc < 20.0) {
        employee.setAnnual_leave_days(acc);
      } else {
        employee.setAnnual_leave_days(20.0);
      }
    }
  }

  public void probation_period (Employee employee) {
    LocalDate today = LocalDate.now();
    LocalDate contract_start = employee.getStart_date();
    double weeksPassed = ChronoUnit.WEEKS.between(contract_start, today);

    if(weeksPassed > 12) {
      employee.setOn_probation(false);
    }
  }

}
