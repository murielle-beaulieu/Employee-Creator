// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

import styles from "./LoginForm.module.scss";

// interface LoginFormProps {
// 	email: string;
// 	password: string;
// }

export default function LoginForm() {

	return (
		<article className={styles.man}>
			<form onSubmit={() => console.log("work in progress")}>
				<div className={styles.field}>
					<label>Email</label>
					<input
						type="text"
						placeholder=" Enter your email"
						// {...register("email")}
					/>
				</div>
				<div className={styles.field}>
					<label>Password</label>
					<input
						type="password"
						placeholder=" Enter your password"
						// {...register("password")}
					/>
					<div className={styles.login_btn}>
						<button>Login</button>
					</div>
				</div>
			</form>
		</article>
	);
}
