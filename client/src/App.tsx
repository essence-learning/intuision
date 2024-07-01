import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Article from "./pages/Article";
import Chatting from "./pages/Chatting";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:bookName" element={<Article />} />
        <Route path="/chatting/:conversationId" element={<Chatting />} />
        <Route path="/chatting/" element={<Chatting />} />
      </Routes>
    </Router>
  );
}

export default App;
