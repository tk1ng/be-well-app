import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/authContext';
import styles from './Navbar.module.css';

const Navbar = () => {
    const authContext = useContext(AuthContext);

    const handleSignOut = () => {
        authContext.logout();
    }

    return (
        <header>
            <nav>
                <ul className={styles.navBar}>
                    <li>
                        <NavLink to='/' className={({ isActive }) => isActive ? styles.active : undefined} end>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/meal-tracker'>Entries</NavLink>
                    </li>
                    <li>
                        <NavLink to='/wellness'>Wellness</NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => isActive ? styles.active : undefined} to='/profile'>Profile</NavLink>
                    </li>
                    <li>
                        <button className={styles.signOutBtn} onClick={handleSignOut}>Sign Out</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;