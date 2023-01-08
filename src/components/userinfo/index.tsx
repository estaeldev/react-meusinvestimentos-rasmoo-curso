import {FaRegAddressCard} from "react-icons/fa"
import {FiEye} from "react-icons/fi"

import styles from "./styles.module.scss";

export function UserInfo() {
    return (
        
        <div className={styles.header_primeira_linha}>
            <div className={styles.perfil_usuario}>
                <div className={styles.perfil_imagem}>
                    <FaRegAddressCard />
                </div>
                <div className={styles.perfil_informacoes}>
                    <span className={styles.span_fino}>Bem-vindo,</span>
                    <span className={styles.span_grosso}>Usuário</span>
                </div>
            </div>

            <div className={styles.ocultar_valores}>
                <FiEye />
                <span>Ocultar Valores</span>
            </div>

        </div>
        
    )
}