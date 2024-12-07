import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cars from "./pages/cars/Cars";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Cars />} />
      </Routes>
    </Router>
  );
};

export default App;
