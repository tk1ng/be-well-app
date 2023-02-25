import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import AuthContext from '../../context/authContext';
import styles from './Navbar.module.css';

const Navbar = () => {
    const authContext = useContext(AuthContext);

    const handleSignOut = () => {
        authContext.logout();
    }

    return (
        <IconContext.Provider value={{ size: 20 }}>
            <header className={styles.header}>
                <nav>
                    <ul className={styles.navBar}>
                        <li>
                            <NavLink to='/' className={({ isActive }) => isActive ? styles.active : undefined} end>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='/meal-tracker' className={({ isActive }) => isActive ? styles.active : undefined}>Entries</NavLink>
                        </li>
                        <li>
                            <NavLink to='/wellness' className={({ isActive }) => isActive ? styles.active : undefined}>Wellness</NavLink>
                        </li>
                        <li>
                            <NavLink className={({ isActive }) => isActive ? styles.active : undefined} to='/profile'>Profile</NavLink>
                        </li>
                        <li>
                            <button className={styles.signOutBtn} onClick={handleSignOut}><RiLogoutBoxRLine /></button>
                        </li>
                    </ul>
                </nav>
            </header>
        </IconContext.Provider>
    );
}

export default Navbar;