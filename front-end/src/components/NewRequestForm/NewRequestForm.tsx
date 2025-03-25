import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewRequestFormData, schema } from "./new-request-schema";
import { RequestType } from "../../../services/leave-request-services";
import { useParams } from "react-router";
import styles from '../EmployeeForm/Form.module.scss';
import { useEffect, useState } from "react";
import { Employee, getEmployeeById } from "../../../services/employee-services";

interface RequestFormProps {
	onSubmit: (data: NewRequestFormData) => unknown;
}

export default function NewRequestForm({ onSubmit }: RequestFormProps) {

	const [thisEmployee, setThisEmployee] = useState<Employee | undefined>(undefined);

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<NewRequestFormData>({ resolver: zodResolver(schema) });

	const { id = "x" } = useParams();

	const typeList = Object.values(RequestType);

	 useEffect(() => {
		getEmployeeById(id)
		  .then((employee) => {
			setThisEmployee(employee);
		  })
		  .catch((e) => console.log(e));
	  }, [id]);

	const available_annual_leave = thisEmployee ? thisEmployee.annual_leave_days - thisEmployee.annual_leave_days_used : 0 ;
	const available_sick_leave = thisEmployee ? thisEmployee.sick_days - thisEmployee.sick_days_used : 0;

	return (
		<article>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<div>
					<p>Available annual leave: {available_annual_leave}</p>
					<p>Available sick leave: {available_sick_leave}</p>
				</div>
				<input
					type="hidden"
					defaultValue={id}
					readOnly={true}
					{...register("employeeId")}
				/>
				<div>
					<label>Start Date:</label>
					<input type="date" {...register("startDate")} />
					{errors.startDate && (
						<small style={{ color: "red" }}>{errors.startDate.message}</small>
					)}
				</div>
				<div>
					<label>End Date:</label>
					<input type="date" {...register("endDate")} />
					{errors.endDate && (
						<small style={{ color: "red" }}>{errors.endDate.message}</small>
					)}
				</div>
				<div>
					<label>Request Type: </label>
					{ available_annual_leave == 0 || available_sick_leave == 0 ?
					<select {...register("requestType")}>
						<option key={typeList[2]} value={typeList[2]}>
							{typeList[2]}
						</option>
					</select>
						:
					<select {...register("requestType")}>
						{typeList.map((type) => (
							<option key={typeList.indexOf(type)} value={type}>
								{type}
							</option>
						))}
					</select>
					}
					{errors.requestType && (
						<small style={{ color: "red" }}>{errors.requestType.message}</small>
					)}
				</div>
				<div>
					<label>Comment:</label>
					<input type="text" {...register("requestComment")} />
					{errors.requestComment && (
						<small style={{ color: "red" }}>
							{errors.requestComment.message}
						</small>
					)}
				</div>
				<button className="submit">Submit</button>
			</form>
		</article>
	);
}
