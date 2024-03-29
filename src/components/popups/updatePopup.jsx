import styles from './UpdatePopup.module.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const UpdatePopup = ( { handleUpdateDialogClose, handleUpdate, open, id }) => {;

    return (
        <Dialog open={ open } aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{ "Confirm Catalog Update" }</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Catalog update will be sent to this vendor: { id }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={ handleUpdateDialogClose }>Cancel</Button>
                <Button onClick={ handleUpdate } autoFocus>Update</Button>
            </DialogActions>
        </Dialog>
    )
}

export default UpdatePopup;