import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../../context/authContext';

const Wellness = () => {
    const { token } = useContext(AuthContext);
    const [wellness, setWellness] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:4040/scores`, {
            headers: {
                'x-auth-token': token
            }
        })
            .then(res => {
                setWellness(res.data);
            })
            .catch(err => console.log(err));
    }, [token]);

    const wellnessScores = (wellness) => {
        wellness.map(entry => {
            return <p key={wellness.id}>{wellness.description}</p>
        })
    }

    return (
        <>
            <h1>Wellness</h1>
            {wellness.length > 0 ? wellnessScores : 'No scores yet.'}
        </>
    );
}

export default Wellness;