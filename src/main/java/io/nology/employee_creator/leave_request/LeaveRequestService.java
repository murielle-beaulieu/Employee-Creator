package io.nology.employee_creator.leave_request;

import org.modelmapper.ModelMapper;

import org.springframework.stereotype.Service;

import io.nology.employee_creator.common.exceptions.InvalidRequestException;
import io.nology.employee_creator.employee.Employee;
import io.nology.employee_creator.employee.EmployeeRepository;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Optional;


@Service
@Getter
@Setter
public class LeaveRequestService {

  private LeaveRequestRepo repo;
  private EmployeeRepository employeeRepo;
  private ModelMapper mapper;

  public LeaveRequestService(LeaveRequestRepo repo, ModelMapper mapper, EmployeeRepository employeeRepo) {
    this.repo = repo;
    this.mapper = mapper;
    this.employeeRepo = employeeRepo;
  }

  public List<LeaveRequest> getAllLeaveRequests() {
    return this.repo.findAll();
  }

  public LeaveRequest createLeaveRequest(CreateLeaveRequestDTO data) throws InvalidRequestException {

    LeaveRequest newRequest = new LeaveRequest();

    Employee employee = employeeRepo.findById(data.getEmployeeId())
        .orElseThrow(() -> new InvalidRequestException("Invalid request"));
    newRequest.setEmployee(employee);

    /* working on implementing mapper here */
    // mapper.map(data, LeaveRequest.class);
    // return this.repo.save(newRequest);

    newRequest.setStartDate(data.getStartDate());
    newRequest.setEndDate(data.getEndDate());
    newRequest.setRequestType(data.getRequestType());
    newRequest.setRequestComment(data.getRequestComment());

    return this.repo.save(newRequest);
  }

  public LeaveRequest getLeaveRequestById(Long id) {
    Optional<LeaveRequest> found = this.repo.findById(id);
    if (found.isEmpty()){
      return null;
    }
    LeaveRequest result = found.get();
    return result;
  }

  public LeaveRequest updateLeaveRequest(Long id, ProcessLeaveRequestDTO data) {
    Optional<LeaveRequest> found = this.repo.findById(id);
    if (found.isEmpty()){
      return null;
    }
    LeaveRequest result = found.get();

    mapper.map(data, result);
    return this.repo.save(result);
  }

  private void checkLeaveAvailable(Employee employee){
  }
}
