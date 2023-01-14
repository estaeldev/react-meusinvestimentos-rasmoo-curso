import {useState, useEffect, useMemo, ChangeEvent} from "react"
import { FaSearch } from "react-icons/fa";

import { Layout } from "../../components/layout";
import { ActionCard } from "../../components/actioncard";

import { ActionInterface, ActionLocalStorageInterface } from "../../types/actions";
import styles from "./styles.module.scss";
import api from "../../service/api";

export function MyInvestmentsPage() {
    const [searchActionName, setSearchActionName] = useState<string>("");
    const [actions, setActions] = useState<ActionInterface[]>([]);

    const loadInvestments = async () => {
        const localActions: ActionLocalStorageInterface[] = JSON.parse(localStorage.getItem('actions') || '') || [];
        
        const {data} = await api.get<ActionInterface[]>('investments');

        const result = localActions.map(ac => {
            const dataAction = data.find(action => action.id == ac.id);
            const resutAction = {
                ... dataAction,
                quant: ac.quant
            }
            return resutAction as ActionInterface
        })
        
        setActions(result);
    }

    useEffect(() => {
        loadInvestments();
    }, [])

    const handleSearchActionName = (event:ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        setSearchActionName(value.toLowerCase());
    }

    const isMatchName = (actionName: string): boolean => {
        return actionName.toLowerCase().includes(searchActionName);
    }

    const isEmptySearch: boolean = useMemo(() => {
        return !actions.some(action => isMatchName(action.name));
    }, [actions, searchActionName])

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

            {isEmptySearch ? (
                <h3>Não foi possivel localizar o nome da ação</h3>
            ) : (
                <div className={styles.actions}>
                    {actions.map((action) => isMatchName(action.name) && (
                        <ActionCard key={action.name} {...action} />
                    ))}
                </div>
            )}

        </Layout>
    )
}
