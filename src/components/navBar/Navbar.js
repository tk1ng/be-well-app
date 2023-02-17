import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <header>
            <nav>
                <ul>
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