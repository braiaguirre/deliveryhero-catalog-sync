import styles from './Topbar.module.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import * as xlsx from 'xlsx';
import { useSelector, useDispatch } from 'react-redux';
import { setData, setId, sendData } from '../redux/reducers/dataReducer';

const Topbar = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.data.products);
    const id = useSelector(state => state.data.id);

    const handleUpdate = () => dispatch(sendData({ id, data }));
    const handleIdSelect = (e) => dispatch(setId(e.target.value));
    const handleReset = () => {
        dispatch(setId(0));
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
                <input
                    type="file"
                    name="upload"
                    id="upload"
                    onChange={handleFileRead}
                />

                <Select
                    sx={{ ml: 2, height: 41, width: 200, }} 
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    value={ id }
                    onChange={ handleIdSelect }
                    >
                    <MenuItem sx={{ width: 200 }} value={ 0 }>Select vendor</MenuItem>
                    <MenuItem sx={{ width: 200 }} value={ 256100 }>Meli Perfumería</MenuItem>
                    <MenuItem sx={{ width: 200 }} value={ 271082 }>Huellitas</MenuItem>
                </Select>

                <Button sx={{ ml: 2, height: 40, color: '#000000', borderColor: '#000000' }} 
                    variant="outlined" onClick={ handleReset }>Reset</Button>

                <Button sx={{ ml: 2, height: 40, backgroundColor: '#000000', boxShadow: 0  }} 
                    variant="contained" onClick={ handleUpdate }>Update</Button>
            </div>
        </div>
    )
}

export default Topbar