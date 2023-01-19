import { ButtonLink } from "components/buttonlink";
import styles from "./styles.module.scss";

export function Main() {

    return (
        <main>
            <div className={styles.content}>

                <div className={styles.content__box}>
                    <h2>Meus Investimentos por tipo</h2>

                    <div className={styles.card}>
                        <div className={styles.card__grafico}>
                            <span>100%</span>
                        </div>
                        <div className={styles.card__descricao}>
                            <span> Renda Fixa </span>
                            <span> Renda Variável </span>
                            <span> Fundos </span>
                            <span> Ofertas Públicas </span>
                        </div>
                    </div>
                </div>

                <div className={styles.content__box}>
                    <h2>Meus Investimentos por tipo</h2>

                    <div className={styles.card}>
                        <div className={styles.card__grafico}>
                            <span>100%</span>
                        </div>
                        <div className={styles.card__descricao}>
                            <span> Renda Fixa </span>
                            <span> Renda Variável </span>
                            <span> Fundos </span>
                            <span> Ofertas Públicas </span>
                        </div>
                    </div>
                </div>

                <div className={`${styles.content__box} ${styles.content__links}`}>
                    <ButtonLink to="/meus-investimentos">
                        Meus Investimentos
                    </ButtonLink>
                    <ButtonLink to="/investir">
                        Investir
                    </ButtonLink>
                </div>

            </div>
        </main>
    )
}


