import { useContext, useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { BiHappyBeaming, BiSad, BiSmile } from 'react-icons/bi';
import { FaRegMeh } from 'react-icons/fa';
import axios from 'axios';
import moment from 'moment';
import AuthContext from '../../context/authContext';
import styles from './Wellness.module.css';

const Wellness = () => {

    const { token } = useContext(AuthContext);
    const [wellness, setWellness] = useState([]);
    const [newScore, setNewScore] = useState();
    const [average, setAverage] = useState(0);

    // TODO: MOVE THIS LOGIC TO BACKEND AND SEND CALCULATED AVERAGE ALONG WITH INDIVIDUAL SCORES
    // const calculateAverageScore = (arrOfObj) => {
    //     const scores = arrOfObj.map(e => e.score);
    //     const sum = scores.reduce((prev, cur) => prev + cur);
    //     const total = scores.length;

    //     return sum / total;
    // }

    useEffect(() => {
        axios.get('http://localhost:4040/scores', {
            headers: {
                'x-auth-token': token
            }
        })
            .then(res => {
                setWellness(res.data);
            })
            .catch(err => console.log(err));

        setAverage();
    }, [token]);

    const formattedTime = (timestamp) => moment(timestamp).format('ddd M-D-YY H:m');

    const handleChange = (event) => {
        setNewScore(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const body = { score: newScore };

        axios.post('http://localhost:4040/scores', body, {
            headers: {
                'x-auth-token': token
            }
        })
            .then(res => {
                setWellness([res.data, ...wellness]);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="content">
            <div className={styles.avgDailyScore}>Average wellness score for today is <span>3</span></div>
            <div className={styles.scoreContainer}>
                {wellness.length === 0 ? 'No scores yet.' : wellness.map(w => {
                    return <div className={styles.scores}><p key={w.id}>Score: {w.score}</p><p>{formattedTime(w.createdAt)}</p></div>
                })}
            </div>
            <h3>How are you feeling today?</h3>
            <IconContext.Provider value={{ size: 70 }}>
                <div className={styles.wellnessForm}>
                    <input className={styles.wellnessSelector} id="great" name="wellness" type="radio" value="4" onChange={handleChange}></input>
                    <label className={styles.wellnessLabel} htmlFor="great" ><BiHappyBeaming /></label>
                    <input className={styles.wellnessSelector} id="okay" name="wellness" type="radio" value="3" onChange={handleChange}></input>
                    <label className={styles.wellnessLabel} htmlFor="okay" ><BiSmile /></label>
                    <input className={styles.wellnessSelector} id="not-well" name="wellness" type="radio" value="2" onChange={handleChange}></input>
                    <label className={styles.wellnessLabel} htmlFor="not-well" ><FaRegMeh /></label>
                    <input className={styles.wellnessSelector} id="bad" name="wellness" type="radio" value="1" onChange={handleChange}></input>
                    <label className={styles.wellnessLabel} htmlFor="bad" ><BiSad /></label>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </IconContext.Provider>
        </div>
    );
}

export default Wellness;