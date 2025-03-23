import './App.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import EmployeeContextProvider from "./context/EmployeeContext";
import { ProfilePage } from "./pages/ProfilePage";
import { LoginPage } from "./pages/LoginPage";
import { AdminPage } from "./pages/AdminPage";
import { NewRequestsPage} from './pages/NewRequestsPage';
import { ProcessRequestPage } from './pages/ProcessRequestsPage';
import { UpdateEmployeePage } from './pages/UpdateEmployeePage';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <EmployeeContextProvider>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="home/profile/:id" element={<ProfilePage/>}/>
        <Route path="home/profile/:id/requests" element={<NewRequestsPage/>}/>
        <Route path="home/admin" element={<AdminPage/>}/>
        <Route path="home/admin/employee/:id" element={<UpdateEmployeePage/>}/>
        <Route path="home/requests/:id" element={<ProcessRequestPage/>}/>
      </Routes>
      </EmployeeContextProvider>
    </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
