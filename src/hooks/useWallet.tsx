import { useContext, createContext, useMemo, useState, useEffect } from "react";
import { ActionInterface } from "../types/actions";
import { getLocalInvestments, updateLocalInvestments } from "../utils/investments";


interface WalletContextInterface {
    username: string,
    balance: number,
    invested: number,
    total: number,
    hasVisibleValues: boolean,
    changeVisibleValues: () => void,
    actions: ActionInterface[],
    updateInvestments: (newAction: ActionInterface) => void,
    onSellAction: (actionId: string) => void,
    updateBalance: (someBalance: number) => void
}

interface WalletProviderInterface {
    children: React.ReactNode;
}


const walletContext = createContext({} as WalletContextInterface);

export function WalletProvider({children}: WalletProviderInterface) {
    
    const username = "Estael Meireles";
    const [balance, setBalance] = useState<number>(0);
    const [invested, setInvested] = useState<number>(0);
    
    const [actions, setActions] = useState<ActionInterface[]>([]);
    const total: number = useMemo(() => balance + invested, [balance, invested])
    const [hasVisibleValues, setHasVisibleValues] = useState<boolean>(true);

    const changeVisibleValues = (): void => {
        setHasVisibleValues(!hasVisibleValues);
    }

    const loadInvestments = async () => {
        const localActions = await getLocalInvestments();
        setActions(localActions);
    }

    const updateInvestments = (action: ActionInterface): void => {
        const newInvestments = updateLocalInvestments({actions, action})
        setActions(newInvestments);
    }

    const onSellAction = (actionId: string): void => {
        const action = actions.find(action => action.id == actionId);
        if(action) {

            // ATUALIZAR SALDO
            // console.log(extortInvestment(action));

            const updatesActions = actions.filter(action => action.id != actionId);
            setActions(updatesActions);
            localStorage.setItem('actions', JSON.stringify(updatesActions));
        }

    }

    const updateBalance = (someBalance: number): void => {
        setBalance(currentBalance => {
            const newBalance = currentBalance + someBalance;
            localStorage.setItem('balance', String(newBalance));
            return newBalance;
        });
    }

    const loadBalance = (): void => {
        const currentBalance = localStorage.getItem('balance');
        setBalance(Number(currentBalance));
    }

    useEffect(() => {
        loadInvestments();
        loadBalance();
    }, [])

    return (
        <walletContext.Provider value={
                {username,
                    balance,
                    invested, 
                    total, 
                    hasVisibleValues, 
                    changeVisibleValues, 
                    actions,
                    updateInvestments, 
                    onSellAction, 
                    updateBalance}
            }>
            {children}
        </walletContext.Provider>
    )

}


export function useWallet() {
    return useContext(walletContext);
}


