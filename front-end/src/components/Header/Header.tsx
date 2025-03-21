import { Employee } from "../../../services/employee-services";
import styles from "./Header.module.scss";

export function Header({data} : Employee) {

  const initials = data.first_name[0] + data.last_name[0] ;

  return (
    <div className={styles.main}>
    <div className={styles.header}></div>
    <div className={styles.medallion}><h2>{initials}</h2></div>
    </div>
  );
}
