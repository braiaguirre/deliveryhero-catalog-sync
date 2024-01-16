import styles from './App.module.css';
import Navbar from './components/navbar'
import { useSelector } from 'react-redux';

const App = () => {
    const data = useSelector(state => state.data.products);

    return (
        <div className={ styles.container }>
            <Navbar />
            <ul>
                { data.length ? data.map((product) => <li key={ product.sku }>{ `${ product.sku } | ${ product.nombre } - $ ${ product.price } (${ product.active === 1 ? product.maximum_sales_quantity + ' un' : 'Sin stock' })` }</li>) : null }
            </ul>
        </div>
    )
}

export default App