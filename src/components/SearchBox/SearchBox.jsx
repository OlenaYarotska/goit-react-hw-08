import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../redux/filters/slice';
import { selectNameFilter } from '../../redux/filters/selectors';
import css from './SearchBox.module.css';


const SearchBox = () => {

const dispatch = useDispatch();
const filter = useSelector(selectNameFilter);
    
const handleFilterChange = (filter) => dispatch(changeFilter(filter));

    return (
        <div className={css.inputWrapper}>
             <label className={css.label}>Find contacts by name</label>
            <input
                type="text"
                name="search"
                value={filter}
                onChange={(e) => handleFilterChange(e.target.value)}
                className={css.input}
            />   
        </div>
    )
}

export default SearchBox;