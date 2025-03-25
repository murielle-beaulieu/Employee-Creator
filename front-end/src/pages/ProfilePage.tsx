import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { Employee, getEmployeeById } from "../../services/employee-services";
import { Header } from "../components/Header/Header";
import { EmployeeDetails } from "../components/EmployeeDetails/EmployeeDetails";
import style from "./PagesStyling.module.scss";

export const ProfilePage = () => {
  const { id = "x" } = useParams();
  const [thisEmployee, setThisEmployee] = useState<Employee>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEmployeeById(id)
      .then((employee) => {
        setLoading(false);
        setThisEmployee(employee);
      })
      .catch((e) => console.log(e));
  }, [id]);

  return (
    <>
      {thisEmployee && (
        <>
          {!loading && <Header data={thisEmployee} />}
          <div>
            <EmployeeDetails data={thisEmployee} />
            {!loading && (
              <div className={style.requests}>
                {thisEmployee?.department == "MANAGEMENT" ? (
                  <button>
                    <Link to="/home/admin">See All Employees</Link>
                  </button>
                ) : (
                  <></>
                )}
                <button>
                  <Link to="requests">Submit Leave Request</Link>
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};
