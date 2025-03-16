package io.nology.employee_creator.employee;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

  private EmployeeRepository repo;

  public EmployeeService(EmployeeRepository repo) {
    this.repo = repo;
  }

  public List<Employee> getAllEmployees() {
    return this.repo.findAll();
  }

  public Employee getEmployeeById(Long id) {
    Optional<Employee> result = this.repo.findById(id);
    if(result.isEmpty()){
      return null;
    }
    return result.get();
  }

}
