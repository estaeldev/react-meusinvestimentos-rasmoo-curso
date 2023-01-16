import {useMemo} from "react";
import { isPast, parseISO } from "date-fns";

import { formatterCurrency, formatterDate } from "../../utils/format";
import { ActionInterface } from "../../types/actions";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { useWallet } from "../../hooks/useWallet";


interface ActionCardInterface extends ActionInterface {
    isBuy?: boolean,
    isSell?: boolean
}

export function ActionCard({isBuy=false, isSell=false, ...action}: ActionCardInterface) {

    const {onSellAction} = useWallet();

    const modifierClass:string = useMemo(() => {
        if(isBuy)  {
            return "";
        }
        return isPast(parseISO(action.time)) ? styles.action__disabled : "";
    }, [action.time, isBuy]);

    return (

        <div className={`${styles.action} ${modifierClass}`} key={action.name}>

            <div className={styles.action__info}>
                <h1>{action.name} {!isBuy && <span>{action.quant}</span>} </h1>
                <p>IPCA +{action.tax}</p>
            </div>
            
            <footer className={styles.action__footer}>
                <div>
                    <p> 
                        <strong>Valor da ação:</strong> 
                        {formatterCurrency(action.minValue)} 
                    </p>
                    {!isBuy && (<p> 
                        <strong>Total investido:</strong> 
                        {formatterCurrency(action.minValue * action.quant)} 
                    </p>)}
                    <p> 
                        <strong>Vencimento:</strong> 
                        {formatterDate(parseISO(action.time))} 
                    </p>
                </div>

                {isBuy ? (<Link to={`/investir/${action.id}`}>Comprar</Link>) : ''}
                
                {isSell && (
                    <button type="button" onClick={() => onSellAction(action.id)}>
                        Vender
                    </button>
                )}

            </footer>

        </div>

    )
}