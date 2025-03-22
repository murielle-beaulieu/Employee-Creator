package io.nology.employee_creator.leave_request;

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

import io.nology.employee_creator.common.exceptions.InvalidRequestException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/leave_requests")
public class LeaveRequestController {

  private LeaveRequestService leaveRequestService;

  public LeaveRequestController(LeaveRequestService leaveRequestService) {
    this.leaveRequestService = leaveRequestService;
  }

  @GetMapping
  public ResponseEntity<List<LeaveRequest>> getAllLeaveRequests() {
    List<LeaveRequest> allRequests = this.leaveRequestService.getAllLeaveRequests();
    return new ResponseEntity<>(allRequests, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<LeaveRequest> getLeaveRequestById(@PathVariable Long id) {
    LeaveRequest result = this.leaveRequestService.getLeaveRequestById(id);
    return new ResponseEntity<>(result, HttpStatus.OK);
  }

  @PostMapping()
  public ResponseEntity<LeaveRequest> createLeaveRequest(@RequestBody @Valid CreateLeaveRequestDTO data)
      throws InvalidRequestException {
    LeaveRequest newRequest = this.leaveRequestService.createLeaveRequest(data);
    return new ResponseEntity<>(newRequest, HttpStatus.CREATED);
  }

  @PatchMapping("/{id}")
  public ResponseEntity<LeaveRequest> processLeaveRequest(@PathVariable Long id,
      @RequestBody @Valid ProcessLeaveRequestDTO data) {
    LeaveRequest processed = this.leaveRequestService.updateLeaveRequest(id, data);
    return new ResponseEntity<>(processed, HttpStatus.OK);
  }

    public LeaveRequestService getLeaveRequestService() {
        return leaveRequestService;
    }

    public void setLeaveRequestService(LeaveRequestService leaveRequestService) {
        this.leaveRequestService = leaveRequestService;
    }

}
