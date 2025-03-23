import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema } from "./employee-schema";
import { Contract, Department, Employee} from "../../../services/employee-services";
import { UpdateEmployeeFormData } from "./update-employee-schema";

interface UpdateEmployeeFormProps {
  onSubmit: (data: UpdateEmployeeFormData) => unknown;
  currentDetails: Employee;
}

export default function UpdateEmployeeForm({ onSubmit, currentDetails }: UpdateEmployeeFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateEmployeeFormData>({ resolver: zodResolver(schema) });

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  // isSubmitSuccessful && console.log("sskjfeofkj!!!");

  const contractList = Object.values(Contract);
  const dptList = Object.values(Department);

  console.log(currentDetails.department);
  console.log(currentDetails.contract);


  return (
    <article>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>First Name:</label>
          <input type="text" defaultValue={currentDetails.first_name} {...register("first_name")} />
          {errors.first_name && (
            <small style={{ color: "red" }}>{errors.first_name.message}</small>
          )}
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" {...register("last_name")} defaultValue={currentDetails.last_name} />
          {errors.last_name && (
            <small style={{ color: "red" }}>{errors.last_name.message}</small>
          )}
        </div>
        <div>
          <label>Birthday:</label>
          <input type="date" {...register("dob")} defaultValue={currentDetails.dob}/>
          {errors.dob && (
            <small style={{ color: "red" }}>{errors.dob.message}</small>
          )}
        </div>
        <div>
          <label>Contact phone number:</label>
          <input type="text" {...register("phone_number")} defaultValue={currentDetails.phone_number}/>
          {errors.phone_number && (
            <small style={{ color: "red" }}>
              {errors.phone_number.message}
            </small>
          )}
        </div>
        <div>
          <label> Email:</label>
          <input type="text" {...register("email")} defaultValue={currentDetails.email}/>
          {errors.email && (
            <small style={{ color: "red" }}>{errors.email.message}</small>
          )}
        </div>
        <div>
          <label>Home Adress:</label>
          <input type="text" {...register("address")} defaultValue={currentDetails.address}/>
          {errors.address && (
            <small style={{ color: "red" }}>{errors.address.message}</small>
          )}
        </div>
        <div>
          <label>Start Date:</label>
          <input type="date" {...register("start_date")} defaultValue={currentDetails.start_date}/>
          {errors.start_date && (
            <small style={{ color: "red" }}>{errors.start_date.message}</small>
          )}
        </div>
        <div>
          <label>End Date:</label>
          <input type="date" {...register("end_date")} defaultValue={currentDetails.end_date}/>
          {errors.end_date && (
            <small style={{ color: "red" }}>{errors.end_date.message}</small>
          )}
        </div>
        <div>
          <label>Role:</label>
          <input type="text" {...register("role")} defaultValue={currentDetails.role}/>
          {errors.role && (
            <small style={{ color: "red" }}>{errors.role.message}</small>
          )}
        </div>
        <div>
          <label>Contract Type: </label>
          <select {...register("contract")} defaultValue={currentDetails.contract}>
            {contractList.map((contract) => (
              <option key={contractList.indexOf(contract)} value={contract}>
                {contract}
              </option>
            ))}
          </select>
          {errors.contract && (
            <small style={{ color: "red" }}>{errors.contract.message}</small>
          )}
        </div>
        <div>
          <label>Department: </label>
          <select {...register("department")} defaultValue={currentDetails.department}>
            {dptList.map((dpt) => (
              <option key={dptList.indexOf(dpt)} value={dpt}>
                {dpt}
              </option>
            ))}
          </select>
          {errors.department && (
            <small style={{ color: "red" }}>{errors.department.message}</small>
          )}
        </div>
        <button className="submit">Submit</button>
      </form>
    </article>
  );
}
