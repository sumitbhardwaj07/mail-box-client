import { useNavigate } from 'react-router-dom';
import './SideBar.css'
import { useSelector } from 'react-redux';



const SideBar = () =>{

    const navigate = useNavigate();

    const count = useSelector(state => state.mail.count);
    


    const handleCompose = () => {
        navigate("/compose")
    }

    const sentHandler = () => {
        navigate('/sent');
      }
      const inboxHandler = () => {
        navigate('/inbox');
      };
      const allMailHandler = () => {
        navigate('/allmails');
      }

      
    
   
    return (
        <div className="sidebar">
            <button className="compose__btn" onClick={handleCompose}>
                Compose
            </button>
            <div className="sidebarOptions">
                <h4 onClick={inboxHandler}>Inbox</h4>
                <p>{count}</p>
            </div>
            <div className="sidebarOptions">
                <h4 onClick={sentHandler}>Sent</h4>
                <p></p>            
            </div>
            <div className="sidebarOptions">
                <h4 onClick={allMailHandler}>All mails</h4>
                <p></p>
            </div>
        </div>
    )
};

export default SideBar;