package io.nology.employee_creator.employee;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

  private EmployeeService employeeService;

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
  public ResponseEntity<Employee> createEmployee (@RequestBody String entity) {

    return new ResponseEntity<>(HttpStatus.CREATED);
  }

}
