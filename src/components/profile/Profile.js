import { useContext } from 'react';
import { IconContext } from 'react-icons';
import { RiEdit2Line } from 'react-icons/ri';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import AuthContext from '../../context/authContext';
import profileImg from '../../assets/profile-img.svg';
import styles from './Profile.module.css';

const Profile = () => {
    const authContext = useContext(AuthContext);

    const signOutHandler = () => {
        authContext.logout();
    }

    console.log(profileImg)

    return (
        <IconContext.Provider value={{ size: 20 }}>
            <main className={styles.profileContainter}>
                <div className={styles.profileImg}><img src={profileImg} alt="Icon of female profile" /></div>
                <div className={styles.userInfo}>
                    <p>Name: <span className={styles.details}>{authContext.name}</span></p>
                    <p>Email: <span className={styles.details}>{authContext.email}</span></p>
                    <p>D.O.B. <span className={styles.details}>{authContext.email}</span></p>
                    <p>Diet: <span className={styles.details}>Vegan</span></p>
                    <button className={styles.editBtn}><RiEdit2Line /></button>
                </div>
                <button className={styles.signOutBtn} onClick={signOutHandler}><RiLogoutBoxRLine /> SIGN OUT</button>
            </main>
        </IconContext.Provider>
    );
}

export default Profile;