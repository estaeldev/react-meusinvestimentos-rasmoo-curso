import {useMemo} from "react";
import { isPast, parseISO } from "date-fns";

import { formatterCurrency, formatterDate } from "../../utils/format";
import { ActionInterface } from "../../types/actions";
import styles from "./styles.module.scss";


interface ActionCardInterface extends ActionInterface {
    isBuy?: boolean
}

export function ActionCard({isBuy=false,...action}: ActionCardInterface) {

    const modifierClass:string = useMemo(() => {
        if(isBuy)  {
            return "";
        }
        return isPast(parseISO(action.time)) ? styles.action__disabled : "";
    }, [action.time, isBuy]);

    
    return (

        <div className={`${styles.action} ${modifierClass}`} key={action.name}>

            <div className={styles.action__info}>
                <h1>{action.name} <span>CDB</span></h1>
                <p>IPCA +{action.tax}</p>
            </div>
            
            <footer className={styles.action__footer}>
                <p> 
                    <strong>Valor investido:</strong> 
                    {formatterCurrency(action.minValue)} 
                </p>
                <p> 
                    <strong>Vencimento:</strong> 
                    {formatterDate(parseISO(action.time))} 
                </p>

                {isBuy ? (<button>Comprar</button>) : ""}
                
            </footer>

        </div>

    )
}