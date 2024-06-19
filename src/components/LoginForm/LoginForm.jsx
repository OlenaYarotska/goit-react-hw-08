import { useDispatch } from 'react-redux';
import { useId } from 'react';
import { Formik, Form, Field } from 'formik';
import { ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from 'react-hot-toast';
import { logIn  } from '../../redux/auth/operations';
import css from './LoginForm.module.css';


export default function LoginForm() {

    const initValues = { email: "", password: "", };
    const formId = useId();
    const dispatch = useDispatch();


    const handleSubmit = (values, actions) => {
        const userInfo = {
            name: values.name,
            email: values.email,
            password: values.password,
        };
        dispatch(logIn(userInfo))
            .unwrap()
            .then(() => {
            toast.success('You logged in successful')
            })
            .catch(() => {
            toast.error('Incorrect email or password! Please check and try again!')
            })
        actions.resetForm();    
    };

    const FeedbackSchema = Yup.object().shape({
        email: Yup.string().min(5, "Too Short").max(50, "Too Long!").email("Invalid email format").required("Email cannot be empty!"),
        password: Yup.string().min(8, "Password is too short - should be 8 chars minimum!").max(50, "Too Long!").required("Password cannot be empty!"),
    });
    return (
        <Formik initialValues={initValues} onSubmit={handleSubmit} validationSchema={FeedbackSchema}>
            <Form className={css.form}>
                    <label
                    htmlFor={`${formId}-email`}
                    className={css.label}>
                        Email
                    </label>
                <Field
                    type="email"
                    name="email"
                    id={`${formId}-email`}
                    className={css.input} />
                <ErrorMessage name="email" component="span" className={css.errorMessage} />
                
                    <label
                    htmlFor={`${formId}-password`}
                    className={css.label}>
                        Password
                    </label>
                <Field
                    type="password"
                    name="password"
                    id={`${formId}-password`}
                        className={css.input} />
                    <ErrorMessage name="password" component="span" className={css.errorMessage}/>
                    
                <div className={css.buttonWrapper}>
                        <button type='submit'
                        className={css.button}>
                            Log in
                        </button>
                    </div>
            </Form>
        </Formik>
    )
}