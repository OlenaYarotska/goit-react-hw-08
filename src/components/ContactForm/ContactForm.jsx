import { useDispatch } from 'react-redux';
import { useId } from 'react';
import { Formik, Form, Field } from 'formik';
import { ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from 'react-hot-toast';
import { addContact } from '../../redux/contacts/operations';
import css from './ContactForm.module.css';


const ContactForm = () => {

    const dispatch = useDispatch();
    const initValues = { name: '', number: '' };
    const fieldId = useId();  
        
        
    const handleAddContact = (contact) => {
        dispatch(addContact(contact));
        toast.success('Contact was successfully added')
    }

    const handleSubmit = (values, {resetForm}) => {
        handleAddContact(values);
        resetForm();
    };

    const FeedbackSchema = Yup.object().shape({
            name: Yup.string().min(3, "Name is too short!").max(50, "Name is too long!").required("Name is required"),
            number: Yup.string().min(3, "Phone number is too short!").max(50, "Phone number is too long!").required("Phone number is required"),
    });

    return (
        <div className={css.formWrapper}>
        <Formik initialValues={initValues} onSubmit={handleSubmit} validationSchema={FeedbackSchema}>
            <Form className={css.form}>
                    <label
                        htmlFor={`${fieldId}-name`} className={css.label}>
                        Name
                    </label>
                    <Field type="text" name="name" id={`${fieldId}-name`}
                        className={css.input} />
                    <ErrorMessage name="name" component="span" className={css.errorMessage}/>
                    <label
                        htmlFor={ `${fieldId}-number`} className={css.label}>
                        Number
                    </label>
                    <Field type="tel" name="number" id={`${fieldId}-number`}
                        className={css.input} />
                    <ErrorMessage name="number" component="span" className={css.errorMessage} />
                    <div className={css.buttonWrapper}>
                        <button type='submit'
                        className={css.button}>
                            Add contact
                        </button>
                    </div>
        </Form>
            </Formik>
            </div>
    )
}

export default ContactForm;