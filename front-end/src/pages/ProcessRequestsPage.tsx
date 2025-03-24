import ProcessRequestForm from "../components/ProcessRequestForm/ProcessRequestForm"
import { processLeaveRequest } from "../../services/leave-request-services";
import { ProcessRequestFormData } from "../components/ProcessRequestForm/process-request-schema";

export const ProcessRequestPage = () => {

  const submitProcessedRequest = (data: ProcessRequestFormData ) => {
    processLeaveRequest(data, data.leaveId)
      .then()
      .catch((e) => console.log(e))
  }

  return (
    <>
    <h1>Process Leave requests</h1>
    <ProcessRequestForm onSubmit={submitProcessedRequest}/>
    </>
  )
}
