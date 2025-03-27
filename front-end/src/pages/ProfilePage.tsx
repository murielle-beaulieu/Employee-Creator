import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { Employee, getEmployeeById } from "../../services/employee-services";
import { Header } from "../components/Header/Header";
import { EmployeeDetails } from "../components/EmployeeDetails/EmployeeDetails";
import style from "./PagesStyling.module.scss";

export const ProfilePage = () => {
  const { id = '' } = useParams();
  const [thisEmployee, setThisEmployee] = useState<Employee>();

  useEffect(() => {
    getEmployeeById(id)
      .then((employee) => {
        setThisEmployee(employee);
      })
      .catch((e) => console.log(e));
  }, [id]);

  return (
    <>
      {thisEmployee && (
        <>
          <button>
            <Link to="requests">Create Leave Request</Link>
          </button>
          <div className={style.requests}>
            {thisEmployee?.department == "MANAGEMENT" ? (
              <button>
                <Link to="/home/admin">Go to Admin Page</Link>
              </button>
            ) : (
              <></>
            )}
          </div>

          <Header data={thisEmployee} />
          <div>
            <EmployeeDetails data={thisEmployee} />
          </div>
        </>
      )}
    </>
  );
};
