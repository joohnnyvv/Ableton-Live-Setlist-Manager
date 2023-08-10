import styles from "../styles/home.module.css";
import SetlistCard from "./SetlistCard";

export default function Home() {

    return (
        <div className={styles.homeBody}>
            <SetlistCard />
        </div>
    )
}