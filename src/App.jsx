import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/Login";
import PrivateRoute from "./components/PrivateRoute";
import Signup from "./page/Signup";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      ></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
    </Routes>
  );
}

export default App;
