import {useState, useMemo, ChangeEvent} from "react"
import { FaSearch } from "react-icons/fa";

import { Layout } from "../../components/layout";
import { ActionCard } from "../../components/actioncard";

import styles from "./styles.module.scss";
import { useWallet } from "../../hooks/useWallet";

export function MyInvestmentsPage() {

    const {actions} = useWallet();
    
    const [searchActionName, setSearchActionName] = useState<string>("");

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
