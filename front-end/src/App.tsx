import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { EmployeeContextProvider } from "./context/EmployeeContext";
import { ProfilePage } from "./pages/ProfilePage";
import { LoginPage } from "./pages/LoginPage";
import { AdminPage } from "./pages/AdminPage";
import { NewRequestsPage } from "./pages/NewRequestsPage";
import { ProcessRequestPage } from "./pages/ProcessRequestsPage";
import { UpdateEmployeePage } from "./pages/UpdateEmployeePage";
import { NewEmployeePage } from "./pages/NewEmployeePage";

function App() {
	return (
		<BrowserRouter>
			<EmployeeContextProvider>
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="home/profile/:id" element={<ProfilePage />} />
					<Route
						path="home/profile/:id/requests"
						element={<NewRequestsPage />}
					/>
					<Route path="home/admin" element={<AdminPage />} />
					<Route path="home/admin/new-employee" element={<NewEmployeePage />} />
					<Route
						path="home/admin/employee/:id"
						element={<UpdateEmployeePage />}
					/>
					<Route
						path="home/admin/requests/:id"
						element={<ProcessRequestPage />}
					/>
				</Routes>
			</EmployeeContextProvider>
		</BrowserRouter>
	);
}

export default App;
