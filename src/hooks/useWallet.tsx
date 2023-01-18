import { useContext, createContext, useMemo, useState, useEffect } from "react";
import { ActionInterface } from "types/actions";
import { extortInvestment, getLocalInvestments, updateLocalInvestments } from "utils/investments";


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
    const [actions, setActions] = useState<ActionInterface[]>([]);

    const invested = useMemo<number>(() => {
        const result = actions.reduce((acc, action) => acc + (action.minValue * action.quant), 0);
        return result;
    }, [actions])
    
    const total: number = useMemo(() => balance + invested, [balance, invested])
    const [hasVisibleValues, setHasVisibleValues] = useState<boolean>(true);

    const changeVisibleValues = (): void => {
        setHasVisibleValues(!hasVisibleValues);
    }

    const loadInvestments = async () => {
        const localActions = await getLocalInvestments();
        setActions(localActions);
    }

    const onSellAction = (actionId: string): void => {
        const action = actions.find(action => action.id == actionId);
        if(action) {
            updateBalance(extortInvestment(action));
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

    const updateInvestments = (action: ActionInterface): void => {
        const newInvestments = updateLocalInvestments({actions, action})
        setActions(newInvestments);
        updateBalance(action.minValue * action.quant * -1)
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


