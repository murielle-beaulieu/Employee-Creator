import { Employee } from "../../../services/employee-services";
import styles from "./SidePanel.module.scss";

interface SidePanelProps {
  data: Employee;
}

export function SidePanel({ data }: SidePanelProps) {
  const full_name = data.first_name + " " + data.last_name;
  const email = data.email;
  const phone_number = data.phone_number;
  const department = data.department.replace("_", " ").toLowerCase();
  const role = data.role;
  const contract = data.contract.replace("_", " ").toLowerCase();
  const start_date = data.start_date;
  const end_date = data.end_date;
  const sick_days = data.sick_days;
  const annual_leave = data.annual_leave_days;
  const leave_used = data.annual_leave_days_used;

  return (
    <section className={styles.panel}>
      <div>
        <h3>Contact</h3>
        <h2>{full_name}</h2>
        <p>Phone number: {phone_number}</p>
        <p className={styles.email}>Email: {email}</p>
      </div>
      <div>
      <h3>Role details</h3>
      <p>Start date: {start_date}</p>
      <p>End date: {end_date == null ? "Ongoing employement" : end_date}</p>
      <p>Department: {department}</p>
      <p>Role title: {role}</p>
      <p>Contract: {contract} </p>
      <p>Sick days available: {sick_days}</p>
      <p>Annual leave available: {annual_leave}</p>
      <p>Annual leave used: {leave_used}</p>
      </div>
    </section>
  );
}