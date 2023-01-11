import {useState, useEffect, ChangeEvent} from "react"
import { FaSearch } from "react-icons/fa";
import { format, isPast } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";

import { Layout } from "../../components/layout";

import actionsData from "../../data/actions.json";
import { formatterCurrency } from "../../utils/format";
import { ActionInterface } from "../../types/actions";

import styles from "./styles.module.scss";

export function MyInvestmentsPage() {
    const [searchActionName, setSearchActionName] = useState<string>("");
    const [actions, setActions] = useState<ActionInterface[]>([]);

    useEffect(() => {
        setActions(actionsData);
    }, [])


    const handleSearchActionName = (event:ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        setSearchActionName(value.toLowerCase());
    }

    return (
        <Layout>

            <div className={styles.page__header}>
                <h1>Meus Investimentos</h1>
                <div className={styles.field}>
                    <FaSearch />
                    <input 
                        type="text" 
                        placeholder="Pesquisar por nome" 
                        onChange={handleSearchActionName}
                    />
                </div>
            </div>

            <div className={styles.actions}>

                {actions.map((action) => action.name.toLowerCase().includes(searchActionName) && (
                    <div className={`${styles.action} ${isPast(new Date(action.dueDate)) ? styles.action__disabled : ""}`} 
                        key={action.name}>

                        <div className={styles.action__info}>
                            <h1>{action.name} <span>{action.type}</span></h1>
                            <p>IPCA +{action.ipca}</p>
                        </div>
                        
                        <footer className={styles.action__footer}>
                            <p> 
                                <strong>Valor investido:</strong> 
                                {formatterCurrency(action.minValue)} 
                            </p>
                            <p> 
                                <strong>Vencimento:</strong> 
                                {format(new Date(action.dueDate), "dd' de 'MMMM' de 'yyyy", {locale: ptBr})} 
                            </p>
                        </footer>

                    </div>
                ))}



            </div>


        </Layout>
    )
}
