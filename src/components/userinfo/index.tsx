import { Link } from "react-router-dom";
import {FaRegAddressCard} from "react-icons/fa"
import {FiEye, FiEyeOff} from "react-icons/fi"

import styles from "./styles.module.scss";
import { useWallet } from "hooks/useWallet";

export function UserInfo() {

    const {username, hasVisibleValues, changeVisibleValues} = useWallet();

    return (
        
        <div className={styles.userInfo}>

            <div className={styles.avatar}>
                <Link className={styles.avatar__icon} to="/">
                    <FaRegAddressCard size={24}/>
                </Link>
                <p>
                    Bem-vindo, <br />
                    <strong>{username}</strong>
                </p>
            </div>

            <button 
                type="button" 
                className={styles.userInfo__button}
                onClick={changeVisibleValues}>
                
                {hasVisibleValues ? <FiEyeOff size={24}/> : <FiEye size={24}/>}
                <span>{hasVisibleValues ? "Ocultar" : "Mostrar"} Valores</span>
            </button>

        </div>
        
    )
}
