export interface ActionInterface {
    id: string,
    name: string,
    tax: string,
    time: string,
    minValue: number
    quant: number
}


export interface ActionLocalStorageInterface {
    id: string,
    quant: number
}
