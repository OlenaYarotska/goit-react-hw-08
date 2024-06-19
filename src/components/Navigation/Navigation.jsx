import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { RiContactsBook3Line } from "react-icons/ri";
import { selectIsLoggedIn } from "../../redux/auth/selectors"
import css from './Navigation.module.css';

export default function Navigation() {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    return (
        <nav className={css.nav}>
            <NavLink to="/" className={css.link}><FaHome /></NavLink>
            {isLoggedIn && (
                <NavLink to="/contacts" className={css.link}><RiContactsBook3Line /></NavLink>
            )}
        </nav>
    )
}