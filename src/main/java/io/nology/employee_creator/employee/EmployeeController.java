package io.nology.employee_creator.employee;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

  private final EmployeeService employeeService;

  @SuppressWarnings("unused")
  EmployeeController(EmployeeService employeeService) {
    this.employeeService = employeeService;
  }

  @GetMapping
  public ResponseEntity<List<Employee>> getAllEmployees() {
    List<Employee> allEmployees = this.employeeService.getAllEmployees();
    return new ResponseEntity<>(allEmployees, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
    Employee found = this.employeeService.getEmployeeById(id);
    return new ResponseEntity<>(found, HttpStatus.OK);
  }

  @PostMapping()
  public ResponseEntity<Employee> createEmployee (@RequestBody @Valid CreateEmployeeDTO data) {
    Employee newEmployee = this.employeeService.createEmployee(data);
    return new ResponseEntity<>(newEmployee, HttpStatus.CREATED);
  }

  @PatchMapping("/{id}")
  public ResponseEntity<Employee> updateEmployee (@PathVariable Long id, @RequestBody @Valid UpdateEmployeeDTO data) {

    Employee updatedEmployee = this.employeeService.updateEmployee(id, data);
    return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);
  }

}
