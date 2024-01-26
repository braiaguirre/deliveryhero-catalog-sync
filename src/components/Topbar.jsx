import styles from './Topbar.module.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import UpdatePopup from './popups/UpdatePopup';
import FetchPopup from './popups/FetchPopup';
import * as xlsx from 'xlsx';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setData, setId, clearId, sendData, clearData, fetchData } from '../redux/reducers/dataReducer';

const Topbar = () => {
    const dispatch = useDispatch();

    const [fetchDialog, setFetchDialog] = useState(false);
    const [updateDialog, setUpdateDialog] = useState(false);

    const data = useSelector(state => state.data.products);
    const id = useSelector(state => state.data.id);

    const handleUpdateDialogOpen = () => {
        setUpdateDialog(true);
    }
    
    const handleUpdateDialogClose = () => {
        setUpdateDialog(false);
    }

    const handleUpdate = () => {
        dispatch(sendData({ id, data }));
        setUpdateDialog(false);
    }
    
    const handleFetchDialogOpen = () => {
        setFetchDialog(true);
    }

    const handleFetchDialogClose = () => {
        setFetchDialog(false);
    }

    const handleFetch = () => {
        dispatch(fetchData(id));
        setFetchDialog(false);
    }
    
    const handleIdSelect = (e) => {
        dispatch(setId(e.target.value));
    }
    
    const handleReset = () => {
        dispatch(clearId());
        dispatch(clearData());
    }
    
    const handleFileRead = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const data = e.target.result
                const workbook = xlsx.read(data, { type: "array" })
                const sheetName = workbook.SheetNames[0]
                const worksheet = workbook.Sheets[sheetName]
                const json = xlsx.utils.sheet_to_json(worksheet)
                dispatch(setData(json));
            }
            reader.readAsArrayBuffer(e.target.files[0])
        }
    }

    return (
        <div className={ styles.container }>
            <div className={ styles.navbarLeft }>
                <h3>Delivery Hero Catalog Update</h3>
            </div>            
            <div className={ styles.navbarRight }>

                <Button sx={{ '&:hover': { backgroundColor: '#ffffff' } }} 
                    variant="raised" onClick={ handleFetchDialogOpen }>Fetch Data (Beta)</Button>

                <input accept=".xls, .xlsx" style={{ display: 'none' }} id="raised-button-file" type="file" onChange={handleFileRead} />
                <label htmlFor="raised-button-file">
                    <Button variant="raised" component="span" sx={{ '&:hover': { backgroundColor: '#ffffff' } }}>Upload File</Button>
                </label> 

                <Select
                    sx={{ ml: 2, height: 41, width: 200, transition: 500, '&:active': { borderColor: '#000000' }, '&:hover': { borderColor: '#000000', boxShadow: 2 } }} 
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    value={ id }
                    onChange={ handleIdSelect }
                >
                    <MenuItem sx={{  }} value={ 0 }>Select vendor</MenuItem>
                    <MenuItem sx={{  }} value={ 256100 }>Meli Perfumería</MenuItem>
                    <MenuItem sx={{  }} value={ 271082 }>Huellitas</MenuItem>
                </Select>

                <Button sx={{ ml: 2, height: 40, color: '#000000', borderColor: '#000000', '&:hover': { backgroundColor: '#ffffff', borderColor: '#000000', boxShadow: 2 } }} 
                    variant="outlined" onClick={ handleReset }>Reset</Button>

                <Button sx={{ ml: 2, height: 40, backgroundColor: '#000000', boxShadow: 0, '&:hover': { backgroundColor: '#000000', borderColor: '#000000', boxShadow: 3 } }} 
                    variant="contained" onClick={ handleUpdateDialogOpen }>Update</Button>

                <UpdatePopup 
                    handleUpdateDialogClose={ handleUpdateDialogClose } 
                    handleUpdate= { handleUpdate }
                    open={ updateDialog } 
                    id={ id }
                />

                <FetchPopup 
                    handleFetchDialogClose={ handleFetchDialogClose } 
                    handleFetch= { handleFetch }
                    open={ fetchDialog } 
                />

            </div>
        </div>
    )
}

export default Topbar;