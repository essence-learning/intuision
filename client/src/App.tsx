import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Article from "./pages/Article";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:bookName" element={<Article />} />
      </Routes>
    </Router>
  );
}

export default App;
