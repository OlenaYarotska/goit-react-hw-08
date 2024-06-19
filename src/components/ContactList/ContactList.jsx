import { useState } from 'react';
import { useSelector } from 'react-redux';
import {selectFilteredContacts } from '../../redux/contacts/selectors';
import Contact from "../Contact/Contact";
import Modal from '../Modal/Modal';
import css from './ContactList.module.css';

const ContactList = () => {

    const visibleContacts = useSelector(selectFilteredContacts);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [contactId, setContactId] = useState(null);

    const onOpenModal = (id) => {
        setContactId(id);
        setModalIsOpen(true);
    };
    const onCloseModal = () => {
        setContactId(null);
        setModalIsOpen(false);
    };
    
    return (
    <div>
        <ul className={css.list}>
                {visibleContacts.map((contact) => {
                    return (
                        <Contact
                            key={contact.id}
                            contact={contact}
                            openModal={onOpenModal}
                        />
                    )
                })}
                <Modal
                    open={modalIsOpen}
                    onClose={onCloseModal}
                    id={contactId}
                />
            </ul>
    </div>
    )
};

export default ContactList;
