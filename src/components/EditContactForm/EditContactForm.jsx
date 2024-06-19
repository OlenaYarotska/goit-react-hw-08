import { useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from 'react-hot-toast';
import { editContact } from '../../redux/contacts/operations';
import { updatedContact } from '../../redux/contacts/slice';
import { selectIsModalOpen, selectUpdatedContact } from '../../redux/contacts/selectors';
import css from './EditContactForm.module.css';


const EditContactForm = () => {
    const dispatch = useDispatch();
    const openedModal = useSelector(selectIsModalOpen);
    const onUpdateContact = useSelector(selectUpdatedContact);
    const initValues = { name: onUpdateContact?.name || '', number: onUpdateContact?.number || '' };
    const fieldId = useId();

    const handleSubmit = ( values, actions) => {
        if (onUpdateContact) {
            dispatch(editContact({ id: onUpdateContact.id, name: values.name, number: values.number }))
                .unwrap()
                .then(() => {
                    toast.success('Contact was successfully updated');
                    dispatch(updatedContact())
                })
                .catch(() => {
                toast.error('Something went wrong!');
                })
            actions.resetForm();
        } 
    };


const FeedbackSchema = Yup.object().shape({
    name: Yup.string().min(3, "Name is too short!").max(50, "Name is too long!").required("Name is required"),
    number: Yup.string().min(3, "Phone number is too short!").max(50, "Phone number is too long!").required("Phone number is required"),
});
    
    return openedModal && onUpdateContact && (
        <div className={css.formWrapper}>
            <Formik initialValues={initValues} onSubmit={handleSubmit} validationSchema={FeedbackSchema}>
                <Form className={css.form}>
                    <label htmlFor={`${fieldId}-name`} className={css.label}>
                        Name
                    </label>
                    <Field type="text" name="name" id={`${fieldId}-name`} className={css.input} />
                    <ErrorMessage name="name" component="span" className={css.errorMessage} />
                    <label htmlFor={`${fieldId}-number`} className={css.label}>
                        Number
                    </label>
                    <Field type="tel" name="number" id={`${fieldId}-number`} className={css.input} />
                    <ErrorMessage name="number" component="span" className={css.errorMessage} />
                    <div className={css.buttonWrapper}>
                        <button type='submit' className={css.button}>
                            Edit
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
};
export default EditContactForm;

