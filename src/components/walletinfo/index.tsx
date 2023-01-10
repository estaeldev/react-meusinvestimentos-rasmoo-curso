import styles from "./styles.module.scss";
import {FiPlus} from "react-icons/fi";
import { useMemo } from "react";


interface WalletInfoInterface {
    balance:number,
    invested:number,
    hasVisibleValues:boolean
}

export function WalletInfo({balance, invested, hasVisibleValues}: WalletInfoInterface) {

    const totalWalltet = useMemo(() => {
        return balance + invested;
    }, [balance, invested])

    const handlerFormatterCurrency = (value:number):string => {
        return new Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(value);
    }

    return (
        <div className={styles.walletInfo}>

            <div>
                <p>Saldo da Conta</p>
                <strong>{hasVisibleValues ? handlerFormatterCurrency(balance) : "*****"}</strong>
                <button 
                    className={styles.walletInfo__button}
                    type="button" onClick={() => console.log("Ir para pagina de adicionar saldo!")} >
                    <FiPlus size={25}/>
                </button>
            </div>

            <div>
                <p>Total Investido</p>
                <strong>{hasVisibleValues ? handlerFormatterCurrency(invested) : "*****"}</strong>
            </div>

            <div>
                <p>Saldo Total</p>
                <strong>{hasVisibleValues ? handlerFormatterCurrency(totalWalltet) : "*****"}</strong>
            </div>

        </div>
    )
}
