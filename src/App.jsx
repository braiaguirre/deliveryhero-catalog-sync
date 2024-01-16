import * as xlsx from 'xlsx';
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setData } from './redux/reducers/dataReducer';

function App() {
    const dispatch = useDispatch();
    const data = useSelector(state => state.data.data)

    const readUploadFile = (e) => {
        e.preventDefault()
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

    const handleUpdate = () => {
        axios.put('http://localhost:3001/update', { 
            products: [ ...data ]
         })
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
                    onChange={readUploadFile}
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
