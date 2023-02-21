import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../../context/authContext';
import styles from './MealLogs.module.css';

const MealLogs = () => {
    const { token, userId } = useContext(AuthContext);
    const [entries, setEntries] = useState([]);
    const [descInput, setDescInput] = useState('');
    const [noteInput, setNoteInput] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:4040/entries`, {
            headers: {
                'x-auth-token': token
            }
        })
            .then(res => {
                setEntries(res.data);
            })
            .catch(err => console.log(err));
    }, [token]);

    const handleSubmit = (event) => {
        // TODO: determine whether to use controlled or uncontrolled form logic
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const values = Object.fromEntries(data.entries());

        axios.post('http://localhost:4040/entries', values, {
            headers: {
                'x-auth-token': token
            }
        })
            .then(res => {
                setEntries([...entries, res.data]);
                console.log(entries);
                setDescInput('');
                setNoteInput('');
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <h1>
                Meal Tracker
            </h1>
            <div className={styles.entryContainer}>
                {!entries.length ? 'No entries yet.' :
                    entries.map(entry => {
                        return <div className={styles.entry} key={entry.id}>
                            <p>{entry.description}</p>
                            <p>{entry.createdAt}</p>
                        </div>
                    })}
            </div>
            <form className={styles.mealForm} onSubmit={handleSubmit}>
                <label>What's on the menu?
                    <br></br><input type="text" name="description" value={descInput} onChange={e => setDescInput(e.target.value)} />
                </label>
                <label>Notes</label>
                <textarea type="text" name="notes" value={noteInput} onChange={e => setNoteInput(e.target.value)} />
                <button type="Submit" >Log A Meal</button>
            </form>
        </>

    );
}

export default MealLogs;