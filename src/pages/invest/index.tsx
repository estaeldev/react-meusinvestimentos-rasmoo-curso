import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { LayoutSimple } from "../../components/layoutsimple";

import styles from './styles.module.scss';
import api from "../../service/api";
import { ActionInterface } from "../../types/actions";
import { formatterCurrency } from "../../utils/format";

export function InvestirPage() {
    const params = useParams();
    const [action, setAction] = useState<ActionInterface | null>(null);

    const loadAction = async () => {
        const {data} = await api.get<ActionInterface>(`investments/${params.id}`);
        setAction(data);
    }

    useEffect(() => {
        loadAction();
    }, [])

    const cancelInvestment = (): void => {
        
    }

    const buyInvestment = (event: FormEvent): void => {
        event.preventDefault();
        console.log();
        
    }

    return (
        <LayoutSimple link="/investir" title="Investir">
            {action && (
                <div className={styles.invest}>

                    <div className={styles.action}>
                        <span className={styles.badge}>CDB</span>
                        <h1>{action.name}</h1>
                        <p>IPCA + {action.tax}%</p>
                        <div>
                            <p> 
                                <strong>Valor mínimo:</strong> {formatterCurrency(action.minValue)} 
                            </p>
                            <p>
                                 <strong>Vencimento:</strong> {new Date(action.time).toLocaleDateString()} 
                            </p>
                        </div>
                    </div>

                    <form className={styles.form} onSubmit={buyInvestment}>
                        <strong>Adicionar Valor</strong>
                        <span className={styles.badge}>Saldo Atual {formatterCurrency(29909)} </span>
                        <input type="number" placeholder="Adicionar Cotas" />
                        <footer className={styles.form__footer}>
                            <button type="button" onClick={cancelInvestment}>CANCELAR</button>
                            <button type="submit">CONFIRMAR</button>
                        </footer>
                    </form>

                </div>
            )}
        </LayoutSimple>
    )
}
