
import {FaRegAddressCard} from "react-icons/fa"
import {FiEye, FiEyeOff} from "react-icons/fi"

import styles from "./styles.module.scss";

interface UserInterface {
    username:string,
    hasVisibleValues: boolean,
    changeVisibleValues: () => void
}

export function UserInfo({username, hasVisibleValues, changeVisibleValues}:UserInterface) {

    return (
        
        <div className={styles.userInfo}>

            <div className={styles.avatar}>
                <div className={styles.avatar__icon}>
                    <FaRegAddressCard size={24}/>
                </div>
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
