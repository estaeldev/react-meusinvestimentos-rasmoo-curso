import {useState, useMemo, ChangeEvent} from "react"
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import { Layout } from "components/layout";
import { ActionCard } from "components/actioncard";
import { BoxAlert } from "components/boxalert";

import styles from "./styles.module.scss";
import { useWallet } from "hooks/useWallet";

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
                <h2>Meus Investimentos</h2>

                {!!actions.length && (<div className={styles.field}>
                    <FaSearch />
                    <input 
                        type="text" 
                        placeholder="Pesquisar por nome" 
                        onChange={handleSearchActionName}
                    />
                </div>)}

            </div>

            {!actions.length ? (
                <BoxAlert>
                    Você não possui nenhuma ação na sua carteira de investimento.
                    Para adquirir uma ação, acesse a página <Link to="/investir">Clicando aqui</Link>.
                </BoxAlert>
            ) : (
                <>
                    {isEmptySearch ? (
                        <BoxAlert>
                            Não foi possivel localizar o nome da ação pesquisada, por favor, tente outro termo.
                        </BoxAlert>
                    ) : (
                        <div className={styles.actions}>
                            {actions.map((action) => isMatchName(action.name) && (
                                <ActionCard key={action.name} {...action} isSell />
                            ))}
                        </div>
                    )}
                </>
            )}

            

        </Layout>
    )
}
