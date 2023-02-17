import { Outlet } from 'react-router-dom';
import Navbar from './navBar/Navbar';
import styles from './RootLayout.module.css';

const RootLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

export default RootLayout;