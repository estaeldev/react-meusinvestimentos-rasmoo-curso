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
    updateInvestments: (newAction: ActionInterface) => void
}

interface WalletProviderInterface {
    children: React.ReactNode;
}


const walletContext = createContext({} as WalletContextInterface);

export function WalletProvider({children}: WalletProviderInterface) {

    const [user, setUser] = useState({
        username: "Estael Meireles",
        balance: 11652,
        invested: 27452,
    })

    const [actions, setActions] = useState<ActionInterface[]>([]);
    const total: number = useMemo(() => user.balance + user.invested, [user])
    const [hasVisibleValues, setHasVisibleValues] = useState<boolean>(false);

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

    useEffect(() => {
        loadInvestments();
    }, [])

    return (
        <walletContext.Provider value={{...user, total, hasVisibleValues, changeVisibleValues, actions, updateInvestments}} >
            {children}
        </walletContext.Provider>
    )

}


export function useWallet() {
    return useContext(walletContext);
}


