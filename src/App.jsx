import './App.css';
import * as xlsx from 'xlsx';
import { useSelector, useDispatch } from 'react-redux';
import { setData, sendData } from './redux/reducers/dataReducer';

function App() {
    const dispatch = useDispatch();
    const data = useSelector(state => state.data.data);

    const handleUpdate = () => dispatch(sendData(data));
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
        <>
            <h1>Delivery Hero Catalog Update</h1>
            <form>
                <label htmlFor="upload">Upload File</label>
                <input
                    type="file"
                    name="upload"
                    id="upload"
                    onChange={handleFileRead}
                />
            </form>
            <button onClick={ handleUpdate }>Update</button>
            <h2>Products</h2>
            <ul>
                { data.length && data.map((product) => <li key={ product.sku }>{ `${ product.nombre } - $ ${ product.price } (${ product.active === 1 ? product.maximum_sales_quantity + ' un' : 'Sin stock' })` }</li>)}
            </ul>
        </>
    )
}

export default App
