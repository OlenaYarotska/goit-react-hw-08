import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLogout } from "react-icons/ai";
import { logOut } from "../../redux/auth/operations"
import { selectUser } from "../../redux/auth/selectors";
import css from './UserMenu.module.css';

export default function UserMenu() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    return (
        <div className={css.userMenu}>
            <p className={css.text}>Welcome, {user.name}</p>
            <button type="button" onClick={() => dispatch(logOut())} className={css.button}>
                <AiOutlineLogout />
            </button>
        </div>
    )
}