import { useContext } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import AuthContext from '../../context/authContext';
import styles from './Home.module.css'

const Home = () => {
    const authContext = useContext(AuthContext);
    const currDate = moment();


    return (
        <div className="content">
            <h1 className={styles.date}>
                {currDate.format('[Today - ] MMM Do')}
            </h1>
            <div className={styles.dailyQuote}>
                <i>WHAT YOU DO TODAY <span>CAN IMPROVE ALL YOUR TOMORROWS</span></i>
                <p>- Ralph Marston</p>
            </div>
            <Calendar className={styles.calendar} />
        </div>
    );
}

export default Home;