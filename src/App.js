import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthPage from "./pages/AuthPage";
//import HomePage from "./pages/HomePage";
import Layout from "./components/Layout/Layout";
import MailComposeScreen from "./pages/HomePage";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Layout>
      <Routes>
        {!isLoggedIn && <Route path="/" element={<AuthPage />} exact />}
        {isLoggedIn && <Route path="/" element={<MailComposeScreen />} exact />}
      </Routes>
    </Layout>
  );
}

export default App;
