import api from "../service/api";
import { ActionInterface, ActionLocalStorageInterface } from "../types/actions";

export async function getLocalInvestments(): Promise<ActionInterface[]> {
    const localActions: ActionLocalStorageInterface[] = JSON.parse(localStorage.getItem('actions') || '') || [];
    const {data} = await api.get<ActionInterface[]>('investments');

    return localActions.map(ac => {
        const dataAction = data.find(action => action.id == ac.id);
        const resutAction = {
            ... dataAction,
            quant: ac.quant
        }
        return resutAction as ActionInterface
    })

}

interface UpdateLocalInvestmentsInterface {
    actions: ActionInterface[],
    action: ActionInterface,
}

function updateLocalStorage(actions: ActionInterface[]) {
    const result = actions.map(action => (
        {id: action.id, quant: action.quant}
    ))
    localStorage.setItem('actions', JSON.stringify(result));
}

export function updateLocalInvestments({actions, action}: UpdateLocalInvestmentsInterface) {
    const updateActions = [...actions];
    const indexAction = actions.findIndex(ac => ac.id == action.id);

    if(indexAction < 0) {
        updateActions.push(action);
    } else {
        updateActions[indexAction].quant += action.quant;
    }

    updateLocalStorage(updateActions);
    return updateActions;   
}
