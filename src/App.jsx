import styles from './App.module.css';
import Topbar from './components/Topbar';
import Data from './components/Data';

const App = () => {
    return (
        <div className={ styles.container }>
            <Topbar />
            <Data />
        </div>
    )
}

export default App