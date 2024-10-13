import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChooseInterestsPage from "./pages/ChooseInterestsPage";
import MainPageContainer from "./pages/MainPageContainer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/choose-interests" element={<ChooseInterestsPage />} />
        <Route path="/main" element={<MainPageContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
