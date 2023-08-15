import {Table} from "react-bootstrap";
import styles from "../styles/songsTable.module.css";
import {AiFillStop} from "react-icons/ai";

export default function SongsTable({songs, selectedSongId, setSelectedSongId, handleStopOnFinishClick}) {

    return (
        <Table className={styles.songsTableBody}>
            <thead>
            <tr></tr>
            <tr className={styles.oddRow}>
                <th>#</th>
                <th>Song</th>
            </tr>
            </thead>
            <tbody>
            {songs.slice(0, -1).map((song, index) => (
                <tr
                    key={song.id}
                    className={
                        `${index % 2 === 0 ? styles.evenRow : styles.oddRow} ${selectedSongId === song.id ? styles.selectedRow : ""}`
                    }
                    onClick={() => {
                        setSelectedSongId(song.id)
                    }}
                >
                    <td>{index + 1}</td>
                    <td className={styles.nameTableCell}>
                        {song.name}
                        <button onClick={() => {
                            handleStopOnFinishClick(index)
                        }} className={styles.stopButton}>
                            {song.stopOnFinish === true ?
                                <AiFillStop
                                    style={{height: "20px", width: "auto", marginTop: "15px"}}/> :
                                <AiFillStop
                                    style={{color: "transparent", height: "20px", width: "auto", marginTop: "15px"}}/>}
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}
