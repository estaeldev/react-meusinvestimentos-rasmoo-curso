import { UserInfo } from "../userinfo"
import { WalletInfo } from "../walletinfo"

import styles from "./styles.module.scss"

export function Header() {
    return (
        <header>
            <div className={styles.header_container}>
                <UserInfo />
                <WalletInfo />
            </div>
      </header>
    )
}