import * as xlsx from 'xlsx'
import './App.css'
import { useState } from 'react'
import axios from 'axios'
const VITE_DELIVERY_HERO_API_URL = import.meta.env.VITE_DELIVERY_HERO_API_URL
const VITE_DELIVERY_HERO_TOKEN = import.meta.env.VITE_DELIVERY_HERO_TOKEN


function App() {
    const [ data, setData ] = useState({})

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
                setData(json)
            }
            reader.readAsArrayBuffer(e.target.files[0])
        }
    }

    const handleUpdate = () => {
        axios.post('http://localhost:3001/update', { 
            products: [ ...data ]
         })
    }

    const example = {
        "products": [
            {
            "sku": "7791293040516",
            "active": false,
            "price": 980,
            "maximum_sales_quantity": 10
            }
        ]
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
                { data.length && data.map((product) => <li key={ product.sku }>{ `${ product.nombre } - $ ${ product.price }` }</li>)}
            </ul>
        </>
    )
}

export default App
