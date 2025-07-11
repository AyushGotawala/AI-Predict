import "./App.css";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./components/dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { Main } from "./components/Dashboard/main";
import ImageAnalysis from "./components/Image";
import EmailAnalysis from "./components/Email";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/Login"} />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="" element={<Main />} />
            <Route path="image-analysis" element={<ImageAnalysis />} />
            <Route path="email-analysis" element={<EmailAnalysis />} />
          </Route>
        </Route>

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
