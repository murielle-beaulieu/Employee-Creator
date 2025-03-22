package io.nology.employee_creator.employee;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.nology.employee_creator.common.exceptions.NotFoundException;
import jakarta.validation.Valid;


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

  @GetMapping("/current")
  public ResponseEntity<List<Employee>> getCurrentEmployees() {
    List<Employee> allEmployees = this.employeeService.getCurrentEmployees();
    return new ResponseEntity<>(allEmployees, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) throws NotFoundException {
    Optional<Employee> found = this.employeeService.getEmployeeById(id);
    Employee result = found.orElseThrow(() -> new NotFoundException("Employee with Id " + id + " does not exist"));
    return new ResponseEntity<>(result, HttpStatus.OK);
  }

  // Managers only
  @PostMapping()
  // should throw invalid exception if unsuccessful
  public ResponseEntity<Employee> createEmployee (@RequestBody @Valid CreateEmployeeDTO data){
    Employee newEmployee = this.employeeService.createEmployee(data);
    return new ResponseEntity<>(newEmployee, HttpStatus.CREATED);
  }

  @PatchMapping("/{id}")
    // should throw invalid exception if unsuccessful
  public ResponseEntity<Employee> updateEmployee (@PathVariable Long id, @RequestBody @Valid UpdateEmployeeDTO data) {

    Employee updatedEmployee = this.employeeService.updateEmployee(id, data);
    return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);
  }

  // Managers only
  @DeleteMapping("/{id}")
  // should throw invalid exception if unsuccessful
    public void deleteEmployee (@PathVariable Long id) {
    this.employeeService.deleteEmployee(id);
  }

}
