import { useEffect, useState } from "react";
import { isFuture, parseISO, compareAsc } from "date-fns";


import { Layout } from "components/layout";
import { ActionCard } from "components/actioncard";

import api from "service/api";
import { ActionInterface } from "types/actions"
import styles from "./styles.module.scss";

type OrderFilter = 'asc' | 'desc' | 'date';

export function InvestmentsListPage() {
    const [actionsApi, setActionsApi] = useState<ActionInterface[]>([])
    const [actions, setActions] = useState<ActionInterface[]>([])
    const [minValueFilter, setMinValueFilter] = useState<number>(0);
    const [orderFilter, setOrderFilter] = useState<OrderFilter>('asc');

    const loadInvestments = async () => {
        const {data} = await api.get<ActionInterface[]>('investments');
        const actionsFilter = data.filter(action => isFuture(parseISO(action.time)));
        setActionsApi(actionsFilter);
        setActions(actionsFilter);
    }

    useEffect(() => {
        loadInvestments();
    }, [])

    useEffect(() => {
        if(minValueFilter != 0) {
            setActions(actionsApi.filter(action => action.minValue >= minValueFilter));
        } else {
            setActions(actionsApi);
            setOrderFilter('asc')
        }
        
    }, [minValueFilter])


    useEffect(() =>  {
        if(orderFilter == 'asc') {
            setActions(currentState => currentState.sort((actionA, actionB) => actionB.name.localeCompare(actionA.name)));
        } else if(orderFilter == 'desc') {
            setActions(currentState => currentState.sort((actionA, actionB) => actionA.name.localeCompare(actionB.name)));
        } else if(orderFilter == 'date') {
            setActions(currentState => currentState.sort((actionA, actionB) => 
                        compareAsc(parseISO(actionA.time), parseISO(actionB.time))));
        }
    }, [orderFilter])

    return (
        <Layout >
            <div className={styles.page__header}>
                <h2>Investir</h2>

                <div className={styles.filter}>
                    <label>Valor mínimo</label>
                    <select onChange={event => setMinValueFilter(Number(event.target.value))}>
                        <option value={0}>Todos os valores</option>
                        <option value={1000}>A partir de R$ 1.000,00</option>
                        <option value={2000}>A partir de R$ 2.000,00</option>
                        <option value={3000}>A partir de R$ 3.000,00</option>
                        <option value={4000}>A partir de R$ 4.000,00</option>
                    </select>
                </div>

                <div className={styles.filter}>
                    <label>Ordernar por</label>
                    <select onChange={event => setOrderFilter(event.target.value as OrderFilter)}>
                        <option disabled>Selecionar ordem</option>
                        <option value="asc">A até Z</option>
                        <option value="desc">Z até A</option>
                        <option value="dete">Data</option>
                    </select>
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