import { LeaveRequest } from "../../../services/leave-request-services";
import { RequestCard } from "../RequestCard/RequestCard";
import styles from "./RequestsList.module.scss";

interface RequestsListProps {
  data: LeaveRequest[];
}

export function RequestsList({ data }: RequestsListProps) {

  return (
    <main className={styles.requests}>
      {data.map((request: LeaveRequest) => {
        return <RequestCard request={request}/>;
      })}
    </main>
  );
}
