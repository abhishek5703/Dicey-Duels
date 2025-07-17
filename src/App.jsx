import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NameScreen from "./pages/NameScreen";
import Game from "./pages/Game";
import Layout from "./components/Layout";
import Instructions from "./pages/Instructions";
import About from "./pages/About";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/names" element={<NameScreen />} />
          <Route path="/game" element={<Game />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
