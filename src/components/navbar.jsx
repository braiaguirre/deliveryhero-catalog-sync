import styles from './navbar.module.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import * as xlsx from 'xlsx';
import { useSelector, useDispatch } from 'react-redux';
import { setData, setId, sendData } from '../redux/reducers/dataReducer';

const Navbar = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.data.products);
    const id = useSelector(state => state.data.id);

    const handleUpdate = () => dispatch(sendData({ id, data }));
    const handleIdSelect = (e) => dispatch(setId(e.target.value));
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
                <select onChange={ handleIdSelect }>
                    <option value={ 0 }>Select</option>
                    <option value={ 256100 }>Meli Perfumería</option>
                    <option value={ 271082 }>Huellitas</option>
                </select>
                <form>
                    <label htmlFor="upload">Upload File</label>
                    <input
                        type="file"
                        name="upload"
                        id="upload"
                        onChange={handleFileRead}
                    />
                </form>
                <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Vendor</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Vendor"
                    value={ id }
                    onChange={handleFileRead}
                    >
                    <MenuItem value={ 0 }>Select</MenuItem>
                    <MenuItem value={ 256100 }>Meli Perfumería</MenuItem>
                    <MenuItem value={ 271082 }>Huellitas</MenuItem>
                    </Select>
                </FormControl>
                </Box>
                <Button variant="contained" onClick={ handleUpdate }>Update</Button>
            </div>
        </div>
    )
}

export default Navbar