import { differenceInDays, parseISO } from "date-fns";
import api from "service/api";
import { ActionInterface, ActionLocalStorageInterface } from "types/actions";

export async function getLocalInvestments(): Promise<ActionInterface[]> {

    const isActions = localStorage.getItem('actions');
    if(isActions) {
        const localActions: ActionLocalStorageInterface[] = JSON.parse(isActions);
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
    
    return []

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



export function extortInvestment(action: ActionInterface): number {
    const currentValue = action.minValue * action.quant;
    const restDays = differenceInDays(parseISO(action.time), new Date());
    let porcent = 0;

    if(restDays <= 30) {
        porcent = 0.7;
    } else if(restDays > 30 && restDays < 90) {
        porcent = 0.5;
    } else {
        porcent = 0.3;
    }

    return currentValue * porcent;
}

