import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import UserPage from "./components/user/user.page";
import Action from "./components/Action";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/jion" element={<SignUp />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/:id" element={<UserPage />} />
          <Route path="/action" element={<Action />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
