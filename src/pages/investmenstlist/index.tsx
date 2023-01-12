import { useEffect, useState } from "react";

import { Layout } from "../../components/layout";
import { ActionCard } from "../../components/actioncard";

import api from "../../service/api";
import { ActionInterface } from "../../types/actions"
import styles from "./styles.module.scss";

export function InvestmentsListPage() {

    const [actions, setActions] = useState<ActionInterface[]>([])

    const loadInvestments = async () => {
        const response = await api.get<ActionInterface[]>('investments');
        setActions(response.data);
        
    }

    useEffect(() => {
        loadInvestments();
    }, [])


    return (
        <Layout >
            <div className={styles.page__header}>
                <h2>Investir</h2>

                <div className={styles.filter}>
                    <span></span>
                    <span></span>
                </div>

            </div>

            <div className={styles.actions}>
                {actions.map(action => (
                    <ActionCard key={action.name} {...action} isBuy />
                ))}

            </div>
        </Layout>
    )
}