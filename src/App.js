import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import UserDetails from "./components/UserDetails";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:username" element={<UserDetails />} />
      </Routes>
    </div>
  );
}

export default App;
