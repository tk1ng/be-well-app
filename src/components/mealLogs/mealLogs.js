import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../../context/authContext';

const MealLogs = () => {
    const { token, userId } = useContext(AuthContext);
    const [entries, setEntries] = useState([]);

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

    const entriesDisplay = (entries) => {
        entries.map(entry => {
            return <p key={entries.id}>{entries.description}</p>
        })
    }

    return (
        <>
            <h1>
                Meal Tracker
            </h1>
            <div>
                {entries.length > 0 ? entriesDisplay : 'No entries yet.'}
            </div>
        </>

    );
}

export default MealLogs;