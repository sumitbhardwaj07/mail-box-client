import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";
import AuthPage from "./components/pages/AuthPage";

import Inbox from "./components/Inbox/Inbox";
import Sent from "./components/Inbox/Sent";

import SideBar from "./components/Layout/SideBar";
import Header from "./components/Layout/Header";
import Compose from "./components/Email/Compose";
import AllMails from "./components/Inbox/AllMails";
import EmailDetail from "./components/Email/ReceivedMails.js/EmailDetail";
import ResetPassword from "./components/Auth/ResetPassword";


function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  

  return (
    <div className="App">
      <Header />

      <div className={`${isLoggedIn ? 'app__body' : ''}`}>
        {isLoggedIn && <SideBar />}
        <Routes>
          <Route path="/" element={isLoggedIn ? <Inbox /> : <AuthPage />} exact />
          {isLoggedIn && <Route path="/sent" element={<Sent />} />}
          {isLoggedIn && <Route path="/inbox" element={<Inbox />} />}
          {isLoggedIn && <Route path="/allmails" element={<AllMails />} />}
          {isLoggedIn && <Route path="/compose" element={<Compose />} />}
          {isLoggedIn && <Route path="/emaildetail" element={<EmailDetail />} />} 
          {!isLoggedIn && <Route path="/resetpassword/:token" element={<ResetPassword />} />}
          <Route path="*" element={<Navigate replace to="/"/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
