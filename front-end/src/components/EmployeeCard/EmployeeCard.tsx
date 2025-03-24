import { Link } from "react-router-dom";
import styles from "./EmployeeCard.module.scss";
import { deleteEmployee, Employee } from "../../../services/employee-services";
import { useEmployees } from "../../context/EmployeeContext";

interface EmployeeCardProps {
	data: Employee;
}

export function EmployeeCard({ data }: EmployeeCardProps) {

const {getCurrentEmployees} = useEmployees()

	const handleDelete = () => {
		if (
			confirm("You're about to delete this employee, do you want to go ahead?")
		) {
      deleteEmployee(`${data.id}`)
      .then(() => getCurrentEmployees())
      .catch((e) => console.log(e))
		}
	};


  const dpt = (data.department).replace("_"," ").toLowerCase();
  const contract = (data.contract).replace("_"," ").toLowerCase();


	return (
		<section className={styles.card} key={data.id}>
      <div className={styles.employee}>
        <h3> {data.first_name} {data.last_name}</h3>
      {data.deleted? <p>Contract has ended</p> : <h4>Department: {dpt}</h4>}
      </div>
      <div className={styles.work}>
        <p>Start date: {data.start_date}</p>
        <p>Contract type: {contract}</p>
      </div>
      <div className={styles.options}>
      <Link to={`/home/profile/${data.id}`}><button>See More</button></Link>
      {data.deleted ? <span></span> :
      <>
        <button className={styles.edit}>
          <Link to={`employee/${data.id}`}>
            Edit
          </Link>
        </button>
        <button className={styles.delete} onClick={handleDelete}>Delete</button>
        </>
        }
      </div>
		</section>
	);
}
