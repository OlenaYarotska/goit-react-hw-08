import { Formik, Form, Field } from 'formik';
import { ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import css from './RegistrationForm.module.css';


export default function RegistrationForm() {

    const initValues = { name: "", email: "", password: "", };
    const formId = useId();
    const dispatch = useDispatch();


    const handleSubmit = (values, actions) => {
        const newUser = {
            name: values.name,
            email: values.email,
            password: values.password,
        };
        dispatch(register(newUser))
            .unwrap()
            .then(() => {
            toast.success('The registration is succesful!')
            })
            .catch(() => {
            toast.error('Incorrect data! Type the correct data into the form!')
            })
        actions.resetForm();   
        
    };

    const FeedbackSchema = Yup.object().shape({
        name: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Name cannot be empty!"),
        email: Yup.string().min(5, "Too Short").max(50, "Too Long!").email("Invalid email format").required("Email cannot be empty!"),
        password: Yup.string().min(8, "Password is too short - should be 8 chars minimum!").max(50, "Too Long!").required("Password cannot be empty!"),
    });
    return (
        <Formik initialValues={initValues} onSubmit={handleSubmit} validationSchema={FeedbackSchema}>
            <Form className={css.form}>
                    <label
                    htmlFor={`${formId}-name`}
                    className={css.label}>
                        Name
                    </label>
                <Field
                    type="text"
                    name="name"
                    id={`${formId}-name`}
                    className={css.input} />
                <ErrorMessage name="name" component="span" className={css.errorMessage} />
                
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
                <ErrorMessage name="password" component="span" className={css.errorMessage} />
                
                    <div className={css.buttonWrapper}>
                        <button type='submit'
                        className={css.button}>
                            Register
                        </button>
                    </div>
            </Form>
        </Formik>
    )
}