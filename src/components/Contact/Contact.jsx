import { useDispatch, useSelector } from 'react-redux';
import { IoPersonSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import {FiEdit} from "react-icons/fi";
import { contactToUpdate, updatedContact } from '../../redux/contacts/slice';
import css from './Contact.module.css';

const Contact = ({ contact, openModal }) => {

    const dispatch = useDispatch();
    const isModalOpen = useSelector(state => state.contacts.isModalOpen);
    const { id, name, number } = contact;

    const handleDeleteContact = () => {
        openModal(id);
    };

    const handleEditContact = () => {
    if (!isModalOpen) {
        dispatch(contactToUpdate({ name, number, id }));
    } else {
        dispatch(updatedContact());
    }
    };

    return (
        <li className={css.item}>
            <div className={css.contactInfo}>
                <p className={css.contactName}><IoPersonSharp className={css.icon} />{name}</p>
                <p className={css.contactNumber}><FaPhone className={css.icon} />{number}</p>
            </div>
            <div className={css.buttonWrp}>
                <button type="button" onClick={handleEditContact} className={css.button}>
                    <FiEdit className={css.editIcon} />
                </button>
                <button type="button" id={id} onClick={() => handleDeleteContact(id)} className={css.button}>
                    <TiDelete className={css.deleteIcon} />
                </button>
            </div>
        </li>
    )
}

export default Contact;
