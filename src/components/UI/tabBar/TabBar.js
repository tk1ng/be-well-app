import { NavLink } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { CgHeart } from 'react-icons/cg';
import { CgProfile } from 'react-icons/cg';
import { CgNotes } from 'react-icons/cg';
import { RiDashboardLine } from 'react-icons/ri';
import styles from './TabBar.module.css';


const TabBar = () => {
    return (
        <IconContext.Provider value={{ size: 30 }}>
            <div className={styles.tabBarContainer}>
                <ul className={styles.tabBar}>
                    <li><NavLink to='/' className={({ isActive }) => isActive ? styles.active : undefined} end><RiDashboardLine /></NavLink></li>
                    <li><NavLink to='/wellness' className={({ isActive }) => isActive ? styles.active : undefined}><CgHeart /></NavLink></li>
                    <li><NavLink to='meal-tracker' className={({ isActive }) => isActive ? styles.active : undefined}><CgNotes /></NavLink></li>
                    <li><NavLink to='profile' className={({ isActive }) => isActive ? styles.active : undefined}><CgProfile /></NavLink></li>
                </ul>
            </div>
        </IconContext.Provider>
    );
}

export default TabBar;