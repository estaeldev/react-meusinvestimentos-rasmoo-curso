import {AnchorHTMLAttributes} from "react"
import styles from "./styles.module.scss";

interface ButtonLinkInterface extends AnchorHTMLAttributes<HTMLAnchorElement> {
    children: React.ReactNode;
}

export function ButtonLink({children}:ButtonLinkInterface) {
    return (
        <a className={styles.buttonLink}>
            {children}
        </a>
    )
}
