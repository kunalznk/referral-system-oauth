import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/register";
import Navbar from "./pages/navbar";
import Score from "./pages/score";
import Referrals from "./pages/referrals";
import ProtectedRoutes from "./utils/protectedRoute";
import WalletRoute from "./utils/wallerRoute";
import Dashboard from "./pages/dashboard";
import { useEffect } from "react";
import { gapi } from 'gapi-script';


function App() {

  return (
    <div className="h-dvh w-full mark">
      <Navbar />
     <Routes>
      <Route path="/register" Component={Register}/>
      <Route path="/" element={<ProtectedRoutes />}>
      <Route path="/home" Component={Home}/>
      <Route path="/dashboard" Component={Dashboard}/>
      <Route path="/" element={<WalletRoute />}>
      <Route path="/referrals" Component={Referrals}/>
      <Route path="/score" Component={Score}/>
      </Route>
      </Route>
     </Routes>
    </div>
    );
}

export default App;
