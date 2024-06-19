import LoginForm from '../../components/LoginForm/LoginForm';
import css from './LoginPage.module.css';

const LoginPage = () => {
    return (
        <>
            <h3 className={css.heading}>Please log in</h3>
            <LoginForm/>
        </>
    )
};

export default LoginPage;