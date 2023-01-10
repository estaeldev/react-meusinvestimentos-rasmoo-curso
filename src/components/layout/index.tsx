import { Header } from "../header";
import styles from "./styles.module.scss";

interface LayoutInterface {
    children: React.ReactNode
}

const USER_MOKE = {
    username: "Estael Meireles",
    balance: 11652,
    invested: 27452
}

export function Layout({children}: LayoutInterface) {
    return (
        <div className={styles.layout}>
            <Header {...USER_MOKE}/>
            <main>
                {children}
            </main>
        </div>
    )
}