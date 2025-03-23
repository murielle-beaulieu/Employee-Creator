import { createEmployee } from "../../services/employee-services";
import { EmployeeFormData } from "../components/EmployeeForm/employee-schema";
import EmployeeForm from "../components/EmployeeForm/EmployeeForm"


export const AdminPage = () => {

    const newEmployeeFormSubmit = (data: EmployeeFormData) => {
      createEmployee(data)
      .then(()=>console.log('yababadabadoooo'))
      .catch((e)=> console.log(e))
      console.log(data);
    };

  return (
    <>
    <h1>Where we display employee list and options to create/update employees</h1>
    {/* employee list (links) */}
    <EmployeeForm onSubmit={newEmployeeFormSubmit}/>
    {/* leave requests (links) */}
    </>
  )
}
