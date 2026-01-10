import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClosedFreezer from "./closedFreezer";
import FreezerContent from "./FreezerContent";
import DrawerContent from "./DrawerContent";
import "../App.css";
import { FreezerProvider } from "./FreezerContext";

function App() {
  return (
    <FreezerProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ClosedFreezer />} />
          <Route path="/freezer" element={<FreezerContent />} />
          <Route path="/drawer" element={<DrawerContent />} />
        </Routes>
      </Router>
    </FreezerProvider>
  );
}

export default App;
