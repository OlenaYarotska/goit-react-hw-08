import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../../redux/contacts/operations";
import { useEffect } from "react";
import { selectContacts, selectIsError, selectIsLoading } from "../../redux/contacts/selectors";
import Loader from "../../components/Loader/Loader";
import ContactList from "../../components/ContactList/ContactList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import ContactForm from '../../components/ContactForm/ContactForm';
import SearchBox from "../../components/SearchBox/SearchBox";
import EditContactForm from "../../components/EditContactForm/EditContactForm";
import css from './ContactsPage.module.css';


const ContactsPage = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);
    const isError = useSelector(selectIsError);
    const contacts = useSelector(selectContacts);
    
    useEffect(() => {
    dispatch(fetchContacts())
    }, [dispatch])
    

    return (
        <div className={css.container}>
            <h2 className={css.title}>Phonebook</h2>
            <ContactForm />
            <EditContactForm />
            <SearchBox />
            {isLoading && <Loader />}
            {isError && <ErrorMessage />}
            {contacts.length > 0 ? <ContactList contacts={contacts} /> : <p>No contacts yet</p>}
        </div>
    )
};

export default ContactsPage;