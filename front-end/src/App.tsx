import { BrowserRouter, Routes, Route } from "react-router";
import { EmployeeLandingPage } from "./pages/EmployeeLandingPage";
import './App.css'
import EmployeeContextProvider from "./context/EmployeeContext";
import { LoginPage } from "./pages/LoginPage";
import { ManagementLandingPage } from "./pages/ManagementLandingPage";
import { ManagementAdminPage } from "./pages/ManagementAdminPage";

function App() {

  return (
    <BrowserRouter>
    <EmployeeContextProvider>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="home/:id" element={<EmployeeLandingPage/>}/>
        <Route path="home/:id/management" element={<ManagementLandingPage/>}/>
        <Route path="home/:id/management/see_all" element={<ManagementAdminPage/>}/>
      </Routes>
      </EmployeeContextProvider>
    </BrowserRouter>
  )
}

export default App
