import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

import styles from './styles.module.scss';

interface LayoutSimpleInterface {
    link: string,
    title: string,
    children: React.ReactNode;
}

export function LayoutSimple({link, title, children}: LayoutSimpleInterface) {
    return (
        <div className={styles.container}>

            <header className={styles.header}>
                <div className={styles.header__content}>
                    <Link to={link}>
                        <FaChevronLeft size={18}/>
                        {title}
                    </Link>
                </div>
            </header>

            <main className={styles.main}>
                {children}
            </main>

        </div>
    )
}

