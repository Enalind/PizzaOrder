import styles from "./navbar.module.css"
export async function Navbar(){

    return(
        <nav className={styles.main}>
            <div className={styles.navItem}>
                <h1>Home</h1>
            </div>
            <div className={styles.navItem}>
                <h1>Pizza</h1>
            </div>
            <div className={styles.navItem}>
                <h1>Hello</h1>
            </div>
        </nav>
    )
}