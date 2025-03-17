package io.nology.employee_creator.employee;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

  private final EmployeeRepository repo;
  private final ModelMapper mapper;

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

}
