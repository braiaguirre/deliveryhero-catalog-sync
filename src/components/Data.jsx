import styles from './Data.module.css';
import { useSelector } from 'react-redux';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

const Data = () => {
    const data = useSelector(state => state.data.products);

    return (
        <div className={ styles.container }>
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