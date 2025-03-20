import { BrowserRouter, Routes, Route } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import './App.css'
import EmployeeContextProvider from "./context/EmployeeContext";

function App() {

  return (
    <BrowserRouter>
    <EmployeeContextProvider>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
      </Routes>
      </EmployeeContextProvider>
    </BrowserRouter>
  )
}

export default App
