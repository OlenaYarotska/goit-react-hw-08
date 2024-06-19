import { useDispatch } from "react-redux";
import toast from 'react-hot-toast';
import { Dialog, DialogActions, DialogContent, DialogContentText, Button } from "@mui/material";
import { deleteContact } from "../../redux/contacts/operations";


export default function Modal({ open, onClose, id }) {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteContact(id))
            .unwrap()
            .then(() => {
                toast.success('Contact was successfully deleted')
                onClose();
            })
            .catch((error) => {
                toast.error('Something went wrong')
                throw error;
            })
            
    };
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent>
                <DialogContentText>
                    Do you really want to delete this contact?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Go back</Button>
                <Button onClick={handleDelete}>Delete</Button>
            </DialogActions> 
        </Dialog>   
    )
}