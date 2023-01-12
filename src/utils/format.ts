import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export function formatterCurrency(value:number):string {
    return new Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(value);
}

export function formatterDate(date:Date):string {
    return format(date, "dd' de 'MMMM' de 'yyyy", {locale: ptBR})
}