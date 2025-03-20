package io.nology.employee_creator.employee;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.modelmapper.ModelMapper;

public class EmployeeServiceTest {
  @Mock
  private EmployeeRepository employeeRepository;

  @Mock
  private ModelMapper modelmapper;

  @Spy
  @InjectMocks
  private EmployeeService employeeService;

  @BeforeEach
  public void setup() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  public void getAll_callsFindAllTodos() {
    employeeService.getAllEmployees();
    verify(employeeRepository).findAll();
  }

  @Test
  public void getById_callsFindEmployeeById() {
    employeeService.getEmployeeById(1L);
    verify(employeeRepository).findById(1L);
  }

  @Test
  public void createEmployee_repoSavesNewEmployee() {
    CreateEmployeeDTO employeeDto = new CreateEmployeeDTO();
    Employee testEmployee = new Employee();
    when(modelmapper.map(employeeDto, Employee.class)).thenReturn(testEmployee);
    when(employeeRepository.save(any(Employee.class))).thenReturn(testEmployee);
    Employee result = employeeService.createEmployee(employeeDto);
    verify(employeeRepository).save(testEmployee);
    assertNotNull(result);
    assertEquals(testEmployee, result);
  }

  @Test
  public void updateEmployee_repoSavesUpdatedEmployee(){
    // create employee
    CreateEmployeeDTO employeeDto = new CreateEmployeeDTO();
    Employee testEmployee = new Employee();
    when(modelmapper.map(employeeDto, Employee.class)).thenReturn(testEmployee);
    when(employeeRepository.save(any(Employee.class))).thenReturn(testEmployee);
    Employee result = employeeService.createEmployee(employeeDto);
    // select employee to update
    UpdateEmployeeDTO updateEmployeeDto = new UpdateEmployeeDTO();
    when(modelmapper.map(updateEmployeeDto, Employee.class)).thenReturn(result);
    when(employeeRepository.save(any(Employee.class))).thenReturn(result);
    employeeService.updateEmployee(result.getId(), updateEmployeeDto);
    verify(employeeRepository).save(result);
    assertNotNull(result);
  }
}
