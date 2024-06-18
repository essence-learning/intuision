import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import Home from "./pages/Home";
import Article from "./pages/Article";
import InsightPage from "./components/InsightPage";
//import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Article />} />
        <Route path="/demo/:filename" element={<InsightPage />} />
      </Routes>
    </Router>
  );
}

export default App;
