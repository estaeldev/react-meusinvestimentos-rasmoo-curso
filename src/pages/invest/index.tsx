import { FormEvent, useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { LayoutSimple } from "../../components/layoutsimple";

import styles from './styles.module.scss';
import api from "../../service/api";
import { ActionInterface, ActionLocalStorageInterface } from "../../types/actions";
import { formatterCurrency } from "../../utils/format";

const BANLANCE_USER = 8950;

export function InvestirPage() {
    const params = useParams();
    const navigate = useNavigate();
    const [action, setAction] = useState<ActionInterface | null>(null);
    const [actions, setActions] = useState<ActionLocalStorageInterface[]>([]);
    const [quantAction, setQuantAction] = useState<number>(0);
    

    const loadAction = async () => {
        const {data} = await api.get<ActionInterface>(`investments/${params.id}`);
        setAction(data);
    }

    useEffect(() => {
        loadAction();
        const localActions = localStorage.getItem('actions');
        if(localActions) {
            setActions(JSON.parse(localActions));
        }

    }, [])

    const cancelInvestment = (): void => {
        
    }

    const maxQuantAction = useMemo(() => {
        if(action) {
            return Math.floor(BANLANCE_USER / action.minValue);
        }
        return 0;
    }, [action?.minValue])

    const buyInvestment = (event: FormEvent): void => {
        event.preventDefault();
        if(!action) return

        if(quantAction <= maxQuantAction){
            let localUpdate = [...actions]
            const indexAction = actions.findIndex(ac => ac.id == action.id);

            if(indexAction < 0) {
                const newAction = {
                    id: action.id,
                    quant: quantAction
                }
                localUpdate = [...actions, newAction];
            } else {
                localUpdate[indexAction].quant += quantAction;
            }
            setActions(localUpdate)
            localStorage.setItem('actions', JSON.stringify(localUpdate));
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
                        <span className={styles.badge}>Saldo Atual {formatterCurrency(BANLANCE_USER)} </span>
                        <input 
                            type="number" 
                            value={quantAction}
                            min={0}
                            max={maxQuantAction}
                            placeholder="Adicionar Cotas" 
                            onChange={event => setQuantAction(Number(event.target.value))}
                        />
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
