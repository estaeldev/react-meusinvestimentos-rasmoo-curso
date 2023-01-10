import { FaSearch } from "react-icons/fa"
import { Layout } from "../../components/layout"

import styles from "./styles.module.scss";

export function MyInvestmentsPage() {
    return (
        <Layout>
            <div className={styles.page__header}>
                <h1>Meus Investimentos</h1>
                <div className={styles.field}>
                    <FaSearch />
                    <input type="text" placeholder="Pesquisar por nome" />
                </div>
            </div>

            <div className={styles.actions}>

                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
                    <div className={styles.action}>

                        <div className={styles.action__info}>
                            <h1>Banco Master <span>CDB</span></h1>
                            <p>IPCA + 6,14%</p>
                        </div>
                        
                        <footer className={styles.action__footer}>
                            <p>Valor investido: <strong>R$ 1.130,00</strong> </p>
                            <p>Vencimento: <strong>19/08/2020</strong> </p>
                        </footer>

                    </div>
                ))}



            </div>


        </Layout>
    )
}
