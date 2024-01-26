import styles from './UpdatePopup.module.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const FetchDialog = ( { handleFetchDialogClose, handleFetch, open }) => {;

    return (
        <Dialog open={ open } aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{ "Confirm" }</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Confirm fetching data from Dux Software.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={ handleFetchDialogClose }>Cancel</Button>
                <Button onClick={ handleFetch } autoFocus>Fetch Data</Button>
            </DialogActions>
        </Dialog>
    )
}

export default FetchDialog;