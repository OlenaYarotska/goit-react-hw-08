import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import css from './RegisterPage.module.css';

const RegisterPage = () => {
    return (
        <>
            <h3 className={css.heading}>Register your account</h3>
            <RegistrationForm/>
        </>
    )
};

export default RegisterPage;