import { Table } from "react-bootstrap";
import styles from "../styles/songsTable.module.css";

export default function SongsTable({ songs, selectedSong, setSelectedSong }) {

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
            {songs.map((song, index) => (
                <tr
                    key={song.id}
                    className={
                        `${index % 2 === 0 ? styles.evenRow : styles.oddRow} ${selectedSong === song.id ? styles.selectedRow : ""}`
                    }
                    onClick={() => {setSelectedSong(song.id)}}
                >
                    <td>{index + 1}</td>
                    <td>{song.name}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}
