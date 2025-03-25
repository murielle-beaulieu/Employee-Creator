import { Employee } from "../../../services/employee-services";
import styles from "./EmployeeDetails.module.scss";

interface EmployeeDetailsProps {
	data: Employee;
}

export function EmployeeDetails({ data }: EmployeeDetailsProps) {

  const full_name = data.first_name + " " + data.last_name;
  const dob = data.dob;
  const address = data.address;
  const phone_number = data.phone_number;
  const department = data.department.replace("_"," ").toLowerCase();
  const role = data.role;
  const contract = data.contract.replace("_"," ").toLowerCase();
  const start_date = data.start_date;
  const sick_days = data.sick_days
  const annual_leave = data.annual_leave_days
  const leave_used = data.annual_leave_days_used;
	return (
		<div className={styles.employee_details_main}>
			<section>
				<h3>Personal details</h3>
				<p>Name: {full_name}</p>
				<p>Address: {address} </p>
        <p>Phone: {phone_number}</p>
        <p>Birthday: {dob}</p>
			</section>
      <section>
        <h3>Role details</h3>
        <p>Start date: {start_date}</p>
        <p>Department: {department}</p>
        <p>Role title: {role}</p>
        <p>Contract: {contract} </p>
        <p>Sick days available: {sick_days}</p>
        <p>Annual leave available: {annual_leave}</p>
        <p>Annual leave used: {leave_used}</p>
      </section>
		</div>
	);
}
