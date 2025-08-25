import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import UserloginCard from "./pages/Userlogin";
import { Userdashboard } from "./pages/UserDashboard";
import { Errorpage } from "./pages/Errorpage";
import { About } from "./pages/About";
import { Mycourses } from "./pages/Mycourses";
import { AdminLogin } from "./pages/Adminpage";
import { Dashboard } from "./pages/admin-crud";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/admin" element={<AdminLogin />}></Route>
          <Route path="/user" element={<UserloginCard />}></Route>
          <Route path="/courses" element={<Userdashboard />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/my-courses" element={<Mycourses />}></Route>
          <Route path="/admin-crud" element={<Dashboard />}></Route>
          <Route path="/*" element={<Errorpage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
