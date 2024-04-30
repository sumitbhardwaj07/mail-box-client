import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';
import AuthPage from './pages/HomePage';

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
   
  return (
    <Routes>
      {!isLoggedIn && <Route path="/" element={<AuthPage />} exact />}
    </Routes>
  )
}

export default App;
