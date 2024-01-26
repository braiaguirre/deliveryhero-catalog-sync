import styles from './Data.module.css';
import { useSelector } from 'react-redux';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Data = () => {
    const data = useSelector(state => state.data.products);
    const date = useSelector(state => state.data.date);

    return (
        <div className={ styles.container }>
            <div className={ styles.fileInfo }>
                { date ?
                    <ul>
                        <li><b>Date: </b> { date }</li>
                        <li><b>Rows: </b> { data.length }</li>
                    </ul> 
                : <b>No file selected.</b> }
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                    <TableRow>
                        <TableCell>SKU</TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Active</TableCell>
                        <TableCell align="right">Stock</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    { data.map((product) => (
                        <TableRow
                        key= {product.sku }
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell>{ product.sku }</TableCell>
                        <TableCell>{ product.nombre }</TableCell>
                        <TableCell align="right">{ product.price }</TableCell>
                        <TableCell align="right">{ product.active }</TableCell>
                        <TableCell align="right">{ product.maximum_sales_quantity }</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Data