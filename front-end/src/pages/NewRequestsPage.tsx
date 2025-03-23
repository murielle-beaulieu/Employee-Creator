import { createLeaveRequest } from "../../services/leave-request-services";
import NewRequestForm from "../components/NewRequestForm/NewRequestForm";
import { NewRequestFormData } from "../components/NewRequestForm/new-request-schema"

export const NewRequestsPage = () => {

  const requestFormSubmit = (data: NewRequestFormData) => {
    createLeaveRequest(data)
    .then(()=>console.log('yippeeee'))
    .catch((e)=> console.log(e))
    console.log(data);
  };

  return (
    <>
    <h1>Leave Requests</h1>
    <NewRequestForm onSubmit={requestFormSubmit}/>
    </>
  )
}
