import './App.css';
import * as xlsx from 'xlsx';
import { useSelector, useDispatch } from 'react-redux';
import { setData, setId, sendData } from './redux/reducers/dataReducer';

function App() {
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
        <>
            <h1>Delivery Hero Catalog Update</h1>
            <select onChange={ handleIdSelect }>
                <option value={ 0 }>Select</option>
                <option value={ 256100 }>Meli Perfumería</option>
                <option value={ 271082 }>Huellitas Pet Shop</option>
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
            <button onClick={ handleUpdate }>Update</button>
            <h2>Products</h2>
            <ul>
                { data.length ? data.map((product) => <li key={ product.sku }>{ `${ product.sku } | ${ product.nombre } - $ ${ product.price } (${ product.active === 1 ? product.maximum_sales_quantity + ' un' : 'Sin stock' })` }</li>) : null }
            </ul>
        </>
    )
}

export default App
