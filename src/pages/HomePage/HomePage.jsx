import css from './HomePage.module.css';
import image from '../../images/phonebook-image.jpg';

export default function HomePage() {
    return (
        <div className={css.container}>
            <h1 className={css.heading}>Contacts Book</h1>
            <div className={css.imgWrapper}>
                <img src={image} alt='phonebook' className={css.img} width={650} />
            </div>
            <p className={css.text}>
                Welcome to the Contacts Book application! This is a simple tool to manage your contacts efficiently.
                You can add new contacts, edit existing ones, and delete them as needed. It helps you keep track of
                important information such as names and phone numbers.
            </p>
        </div>
    )
}