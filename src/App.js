import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import AuthPage from "./pages/AuthPage/AuthPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<AuthPage />} />
      </Routes>
    </div>
  );
}

export default App;
