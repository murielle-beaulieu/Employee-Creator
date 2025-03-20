package io.nology.employee_creator.employee;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

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

  public Employee getEmployeeById(Long id) {
    Optional<Employee> result = this.repo.findById(id);
    if(result.isEmpty()){
      return null;
      // should throw an error when trying to access non-existing employee
    }
    return result.get();
  }

  public Employee createEmployee(CreateEmployeeDTO data) {
    Employee newEmployee = mapper.map(data, Employee.class);
    return this.repo.save(newEmployee);
    // what if the employee email already exists? must handle error
  }

  public Employee updateEmployee(Long id, UpdateEmployeeDTO data) {
    Optional<Employee> result = this.repo.findById(id);
    if(result.isEmpty()){
      return null;
      // should throw an error when trying to access non-existing employee
    }
    Employee found = result.get();
    mapper.map(data, found);
    return this.repo.save(found);
  }

  public void deleteEmployee(Long id) {
    Optional<Employee> result = this.repo.findById(id);
    if(result.isEmpty()){
      return;
    }
    Employee found = result.get();
    found.setDeleted(true);
    this.repo.save(found);
  }

  public String calculateLeave(Long id) {
    Optional<Employee> result = this.repo.findById(id);
    if(result.isEmpty()){
      return "Not found";
    }
    Employee found = result.get();
    String leave = "";

    if(found.getContract() == Contract.CASUAL || found.getContract() == Contract.PART_TIME) {
      leave = "0";
    }

    // you gain 2.923 hours annual leave per week or 20 days per year (20 * 8 = 160hrs)
    // the leave shouldn't roll over
    if(found.getContract() == Contract.PART_TIME || found.getContract() == Contract.FULL_TIME) {
      LocalDate start = LocalDate.parse(found.getStart_date());
      LocalDate today = LocalDate.now();
      double weeksPassed = ChronoUnit.WEEKS.between(start, today);
      leave = " " + (weeksPassed * 2.923);
    }

    return leave;
  }

}
