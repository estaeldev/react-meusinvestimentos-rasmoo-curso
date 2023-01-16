
import { FaInfoCircle } from 'react-icons/fa';
import styles from './styles.module.scss';

interface BoxAlertInterface {
    children: React.ReactNode;
}

export function BoxAlert({children}: BoxAlertInterface) {
    return (
        <div className={styles.boxAlert}> 
            <FaInfoCircle size={40}/>
            <p>
                {children}
            </p>
        </div>
    )
}