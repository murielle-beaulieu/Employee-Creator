import { useForm } from "react-hook-form";
import { getLeaveRequestById, LeaveRequest, RequestStatus } from "../../../services/leave-request-services";
import { ProcessRequestFormData, schema } from "./process-request-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router";
import styles from "../EmployeeForm/Form.module.scss";
import { useEffect, useState } from "react";

interface ProcessRequestFormProps {
  onSubmit: (data: ProcessRequestFormData, id: string) => unknown;
}

export default function ProcessRequestForm({
  onSubmit,
}: ProcessRequestFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ProcessRequestFormData>({ resolver: zodResolver(schema) });

  const statusList = Object.values(RequestStatus);
  const { id = "x" } = useParams();

	const [request,setRequest] = useState<LeaveRequest>();
  
useEffect(() => {
	getLeaveRequestById(`${id}`)
	.then((request) => setRequest(request))
	.catch((e)=>console.log(e));
},[id])

  return (
    <article>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
		<div>Leave requested: 
			<div>{request?.startDate} - {request?.endDate}</div> 
		</div>
		<div>Request comment: 
			<div>{request?.requestComment}</div> 
		</div>
        <div>
          <input
            type="hidden"
            defaultValue={id}
            readOnly={true}
            {...register("leaveId")}
          />
          <label>Status: </label>
          <select {...register("status")}>
            {statusList.map((status) => (
              <option key={statusList.indexOf(status)} value={status}>
                {status}
              </option>
            ))}
          </select>
          {errors.status && (
            <small style={{ color: "red" }}>{errors.status.message}</small>
          )}
        </div>
        <div>
          <label>Comment:</label>
          <input type="text" {...register("reason")} />
          {errors.reason && (
            <small style={{ color: "red" }}>{errors.reason.message}</small>
          )}
        </div>
        <button className="submit">Submit</button>
      </form>
    </article>
  );
}
