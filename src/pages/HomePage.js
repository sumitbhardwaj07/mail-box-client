import { Container } from "react-bootstrap";
import styles from './HomePage.module.css';

const HomePage = () => {
  
  return (
    <>
      <div className={styles.homePageContainer}>
        <Container>
          <div className={styles.welcomeMessage}>
            <p>Welcome to Expense Tracker!!!</p>
          </div>
        </Container>
      </div>
      
    </>
  );
};

export default HomePage;
