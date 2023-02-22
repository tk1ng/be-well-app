import { useContext } from 'react';
import AuthContext from '../../context/authContext';
import styles from './Profile.module.css';

const Profile = () => {
    const authContext = useContext(AuthContext);

    const signOutHandler = () => {
        authContext.logout();
    }

    return (
        <main>
            <div className={styles.profileImg}></div>
            <div className={styles.userInfo}>
                <p>Name <span>{authContext.name}</span></p>
                <p>Email <span>{authContext.email}</span></p>
                <p>D.O.B.</p>
                <p>Diet</p>
            </div>
            <button className={styles.signOutBtn} onClick={signOutHandler}>Sign Out</button>
        </main>
    );
}

export default Profile;