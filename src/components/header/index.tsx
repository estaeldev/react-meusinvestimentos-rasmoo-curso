import {useState} from "react"

import { UserInfo } from "../userinfo"
import { WalletInfo } from "../walletinfo"

import styles from "./styles.module.scss"

interface HeaderInterface {
    username:string,
    balance:number,
    invested:number
}

export function Header({username, balance, invested}: HeaderInterface) {
    const [hasVisibleValues, setHasVisibleValues] = useState<boolean>(false);

    const changeVisibleValues = ():void => {
        setHasVisibleValues(!hasVisibleValues);
    }

    return (
        <header>
            <div className={styles.header_container}>
                <UserInfo 
                    username={username} 
                    changeVisibleValues={changeVisibleValues}
                    hasVisibleValues={hasVisibleValues}
                />
                <WalletInfo 
                    balance={balance} 
                    invested={invested} 
                    hasVisibleValues={hasVisibleValues}
                />
            </div>
      </header>
    )
}