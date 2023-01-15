import styles from "./styles.module.scss";
import {FiPlus} from "react-icons/fi";
import { formatterCurrency } from "../../utils/format";
import { useWallet } from "../../hooks/useWallet";

export function WalletInfo() {

    const {balance, invested, total, hasVisibleValues} = useWallet();

    return (
        <div className={styles.walletInfo}>

            <div>
                <p>Saldo da Conta</p>
                <strong>{hasVisibleValues ? formatterCurrency(balance) : "*****"}</strong>
                <button 
                    className={styles.walletInfo__button}
                    type="button" onClick={() => console.log("Ir para pagina de adicionar saldo!")} >
                    <FiPlus size={25}/>
                </button>
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
