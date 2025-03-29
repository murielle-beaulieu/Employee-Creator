package io.nology.employee_creator.leave_request;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import io.nology.employee_creator.common.exceptions.InvalidRequestException;
import io.nology.employee_creator.employee.Employee;
import io.nology.employee_creator.employee.EmployeeRepository;
import io.nology.employee_creator.leave_request.LeaveRequest.RequestStatus;
import io.nology.employee_creator.leave_request.LeaveRequest.RequestType;

@Service
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

    double leave_requested = ChronoUnit.DAYS.between(data.getStartDate(), data.getEndDate());

    double annual_leave_available = employee.getAnnual_leave_days() - employee.getAnnual_leave_days_used() ;

    double sick_leave_available = employee.getSick_days() - employee.getSick_days_used();

    if (data.getRequestType() == RequestType.ANNUAL &&  leave_requested > annual_leave_available) {
      throw new InvalidRequestException("Exceeds available available annual leave");
    } else if (data.getRequestType() == RequestType.SICK && leave_requested > sick_leave_available) {
      throw new InvalidRequestException("Exceeds available available sick leave");
    } else {
    newRequest.setStartDate(data.getStartDate());
    newRequest.setEndDate(data.getEndDate());
    newRequest.setRequestType(data.getRequestType());
    newRequest.setRequestComment(data.getRequestComment());
    /* working on implementing mapper here */
    // mapper.map(data, LeaveRequest.class);
    // return this.repo.save(newRequest);

    return this.repo.save(newRequest);
    }
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

    /* if the request is approved, we increment the used leave/sick days fields for the relevant employee */

    // if (data.getStatus() == RequestStatus.APPROVED && data.getRequestType() == RequestType.ANNUAL) {
    //   Employee employee = employeeRepo.findById(data.getEmployeeId()).get();
    //   employee.setAnnual_leave_days_used((double)ChronoUnit.DAYS.between(data.getStartDate(), data.getEndDate()));
    // }

    Employee employee = result.getEmployee();

    if (result.getStatus()  == RequestStatus.APPROVED && result.getRequestType() == RequestType.ANNUAL) {
      employee.setAnnual_leave_days_used(result.getTotalRequested());
    }

    mapper.map(data, result);
    return this.repo.save(result);
  }



}
