import {AnchorHTMLAttributes} from "react"
import { Link, LinkProps } from "react-router-dom";
import styles from "./styles.module.scss";

interface ButtonLinkInterface extends LinkProps {
    children: React.ReactNode;
}

export function ButtonLink({children, ...rest}:ButtonLinkInterface) {
    return (
        <Link className={styles.buttonLink} {...rest} >
            {children}
        </Link>
    )
}
