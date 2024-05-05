import EmailBody from '../components/Email/ReceivedMails.js/EmailBody';
import SideBar from '../components/Layout/SideBar';
import './HomePage.css';


const HomePage = () => {
  return (
    <div className="app__body">
      <SideBar />

      <EmailBody />
    </div>
  );
};

export default HomePage;
