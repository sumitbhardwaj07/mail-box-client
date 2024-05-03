import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthPage from "./pages/AuthPage";
//import HomePage from "./pages/HomePage";
import Layout from "./components/Layout/Layout";
import MailComposeScreen from "./pages/HomePage";
import EmailViewer from "./components/Email/ReceivedMails.js/EmailViewer";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const emailId = useSelector(state => state.auth.email);
  
  return (
    <Layout>
      <Routes>
        {!isLoggedIn && <Route path="/" element={<AuthPage />} exact />}
        {isLoggedIn && <Route path="/" element={<MailComposeScreen />} exact />}
        {isLoggedIn && <Route path="/inbox" element={<EmailViewer emailId={emailId} />} />}
      </Routes>
    </Layout>
  );
}

export default App;
