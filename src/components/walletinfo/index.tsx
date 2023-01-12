import styles from "./styles.module.scss";
import {FiPlus} from "react-icons/fi";
import { useMemo } from "react";
import { formatterCurrency } from "../../utils/format";

interface WalletInfoInterface {
    balance:number,
    invested:number,
    hasVisibleValues:boolean
}

export function WalletInfo({balance, invested, hasVisibleValues}: WalletInfoInterface) {

    const totalWallet: number = useMemo(() => {
        return balance + invested;
    }, [balance, invested])

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
                <strong>{hasVisibleValues ? formatterCurrency(totalWallet) : "*****"}</strong>
            </div>

        </div>
    )
}
