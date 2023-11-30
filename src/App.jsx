import * as xlsx from 'xlsx'
import './App.css'

function App() {
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
                console.log(json)
            };
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
                    onChange={readUploadFile}
                />
            </form>
        </>
    )
}

export default App
