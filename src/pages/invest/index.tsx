import { FormEvent, useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { LayoutSimple } from "components/layoutsimple";
import { useWallet } from "hooks/useWallet";

import api from "service/api";
import { ActionInterface } from "types/actions";
import { formatterCurrency } from "utils/format";
import styles from './styles.module.scss';

export function InvestirPage() {
    const {balance, updateInvestments} = useWallet();
    const params = useParams();
    const navigate = useNavigate();
    const [action, setAction] = useState<ActionInterface | null>(null);
    const [quantAction, setQuantAction] = useState<number>(0);
    
    const loadAction = async () => {
        const {data} = await api.get<ActionInterface>(`investments/${params.id}`);
        setAction(data);
    }

    const goToInvestir = (): void => {
        navigate('/investir')
    }

    useEffect(() => {
        loadAction();
    }, [])

    const maxQuantAction = useMemo(() => {
        if(action) {
            return Math.floor(balance / action.minValue);
        }
        return 0;
    }, [action?.minValue])

    const buyInvestment = (event: FormEvent): void => {
        event.preventDefault();
        if(!action) return

        if(quantAction <= maxQuantAction){
            updateInvestments({...action, quant: quantAction})
        }
        setQuantAction(0);
        navigate('/meus-investimentos');
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
                        <span className={styles.badge}>Saldo Atual {formatterCurrency(balance)} </span>
                        <input 
                            type="number" 
                            value={quantAction}
                            min={0}
                            max={maxQuantAction}
                            placeholder="Adicionar Cotas" 
                            onChange={event => setQuantAction(Number(event.target.value))}
                        />
                        <footer className={styles.form__footer}>
                            <button type="button" onClick={goToInvestir}>CANCELAR</button>
                            <button type="submit">CONFIRMAR</button>
                        </footer>
                    </form>

                </div>
            )}
        </LayoutSimple>
    )
}
