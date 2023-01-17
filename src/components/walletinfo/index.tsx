import styles from "./styles.module.scss";
import {FiPlus} from "react-icons/fi";
import { formatterCurrency } from "../../utils/format";
import { useWallet } from "../../hooks/useWallet";
import { Link } from "react-router-dom";

export function WalletInfo() {

    const {balance, invested, total, hasVisibleValues} = useWallet();

    return (
        <div className={styles.walletInfo}>

            <div>
                <p>Saldo da Conta</p>
                <strong>{hasVisibleValues ? formatterCurrency(balance) : "*****"}</strong>
                <Link to="/adicionar-saldo" className={styles.walletInfo__button} >
                    <FiPlus size={25}/>
                </Link>
            </div>

            <div>
                <p>Total Investido</p>
                <strong>{hasVisibleValues ? formatterCurrency(invested) : "*****"}</strong>
            </div>

            <div>
                <p>Saldo Total</p>
                <strong>{hasVisibleValues ? formatterCurrency(total) : "*****"}</strong>
            </div>

        </div>
    )
}
