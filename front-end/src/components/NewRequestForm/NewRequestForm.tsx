import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewRequestFormData, schema } from "./new-request-schema";
import { RequestType } from "../../../services/leave-request-services";
import { useParams } from "react-router";
import styles from '../EmployeeForm/Form.module.scss';

interface RequestFormProps {
	onSubmit: (data: NewRequestFormData) => unknown;
}

export default function NewRequestForm({ onSubmit }: RequestFormProps) {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitSuccessful },
	} = useForm<NewRequestFormData>({ resolver: zodResolver(schema) });

	const { id = "x" } = useParams();

	const typeList = Object.values(RequestType);

	// eslint-disable-next-line @typescript-eslint/no-unused-expressions
	isSubmitSuccessful && console.log("sskjfeofkj!!!");

	return (
		<article>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
					<select {...register("requestType")}>
						{typeList.map((type) => (
							<option key={typeList.indexOf(type)} value={type}>
								{type}
							</option>
						))}
					</select>
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
