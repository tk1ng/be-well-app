import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink to='/' className={({ isActive }) => isActive ? styles.active : undefined} end>Home</NavLink>
                    </li>
                    <li>
                        <NavLink>Logs</NavLink>
                    </li>
                    <li>
                        <NavLink>Sign Out</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;