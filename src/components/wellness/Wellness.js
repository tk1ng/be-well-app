import { useContext, useEffect, useState } from 'react';
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

    console.log(wellness);

    const time = moment('2023-02-22T14:46:27.988Z').format('ddd M-D-YY H:m');
    console.log(time)

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
                setWellness([...wellness, res.data]);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="content">
            <div className={styles.avgDailyScore}>Average wellness rating for current day here</div>
            <div className={styles.scoreContainer}>
                {wellness.length === 0 ? 'No scores yet.' : wellness.map(w => {
                    return <div className={styles.scores}><p key={w.id}>Score: {w.score}</p><p>{moment(`${w.createdAt}`).format('ddd M-D-YY H:m')}</p></div>
                })}
            </div>
            <h3>How are you feeling today?</h3>
            <form className={styles.wellnessForm} onSubmit={handleSubmit}>
                <label htmlFor="great">Great</label>
                <input name="wellness-score" type="radio" id="great" value="4" onChange={handleChange} />
                <label htmlFor="fair">I'm Okay</label>
                <input name="wellness-score" type="radio" id="fair" value="3" onChange={handleChange} />
                <label htmlFor="not great">Not too Good</label>
                <input name="wellness-score" type="radio" id="not great" value="2" onChange={handleChange} />
                <label htmlFor="poor">It's a tough Day</label>
                <input name="wellness-score" type="radio" id="poor" value="1" onChange={handleChange} />
                <button type="Submit" >Add</button>
            </form>
        </div>
    );
}

export default Wellness;