import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutSimple } from "components/layoutsimple";
import { useWallet } from "hooks/useWallet";
import { formatterCurrency, formatterNumber } from "utils/format";

import styles from './styles.module.scss';

export function AddBalancePage() {

    const {balance, updateBalance} = useWallet();
    const [newBalance, setBalance] = useState<string>('');
    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate('/')
    }

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        updateBalance(formatterNumber(newBalance));
        goToHomePage();
    }
 
    return (
        <LayoutSimple link="/" title="Adicionar Saldo">
            <div className={styles.adicionarSaldo}>

                <form className={styles.form} onSubmit={onSubmit}>
                    <strong>Adicionar Saldo </strong>
                    <p>Saldo atual {formatterCurrency(balance)}</p>
                    <input 
                        type="text" 
                        placeholder="Adicionar novo saldo"
                        value={newBalance}
                        onChange={event => setBalance(event.target.value)}
                    />
                    <footer className={styles.form__footer}>
                        <button type="button" onClick={goToHomePage}>CANCELAR</button>
                        <button type="submit">CONFIRMAR</button>
                    </footer>
                </form>

            </div>
        </LayoutSimple>
    )
}
