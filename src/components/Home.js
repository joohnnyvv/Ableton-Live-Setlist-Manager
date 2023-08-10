import styles from "../styles/home.module.css";
import SetlistSection from "./SetlistSection";

export default function Home() {

    return (
        <div className={styles.homeBody}>
            <SetlistSection />
        </div>
    )
}