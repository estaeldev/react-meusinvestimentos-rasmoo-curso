import { UserInfo } from "components/userinfo";
import { WalletInfo } from "components/walletinfo";
import styles from "./styles.module.scss";

interface LayoutInterface {
    children: React.ReactNode
}


export function Layout({children}: LayoutInterface) {
    return (
        <div className={styles.layout}>
            <header className={styles.header_container}>
                <div className={styles.header__content}>
                    <UserInfo />
                    <WalletInfo />
                </div>
            </header>

            <main>
                {children}
            </main>
        </div>
    )
}
