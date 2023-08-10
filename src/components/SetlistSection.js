import styles from "../styles/setlistSection.module.css";
import SongsTable from "./SongsTable";
import {useEffect, useState} from "react";
import {RiArrowDownCircleLine, RiArrowUpCircleLine} from "react-icons/ri";
import {IoMdPlay} from "react-icons/io";
import {BiSolidSquare} from "react-icons/bi";
import songsModel from "../songs.json";

export default function SetlistSection() {

    const [songs, setSongs] = useState([]);
    const [selectedSong, setSelectedSong] = useState(-1)
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const mappedSongs = songsModel.map((song) => ({
            id: song.id,
            title: song.title
        }));
        setSongs(mappedSongs);
    }, []);

    const handleMoveSongUp = (songId, e) => {
        const songIndex = songs.findIndex((song) => song.id === songId);
        if (songIndex > 0) {
            const updatedSongs = [...songs];
            const [movedSong] = updatedSongs.splice(songIndex, 1);
            updatedSongs.splice(songIndex - 1, 0, movedSong);
            setSongs(updatedSongs);
        }
    };

    const handleMoveSongDown = (songId, e) => {
        const songIndex = songs.findIndex((song) => song.id === songId);
        if (songIndex < songs.length - 1) {
            const updatedSongs = [...songs];
            const [movedSong] = updatedSongs.splice(songIndex, 1);
            updatedSongs.splice(songIndex + 1, 0, movedSong);
            setSongs(updatedSongs);
        }
    };

    return (
        <div className={styles.setlistSectionBody}>
            <h2>SETLIST MANAGEMENT</h2>
            <div className={styles.tableWrapper}>
                <SongsTable songs={songs} selectedSong={selectedSong} setSelectedSong={setSelectedSong}/>
                <div className={styles.buttonsWrapper}>
                    <RiArrowUpCircleLine
                        className={styles.iconButton}
                        onClick={() => handleMoveSongUp(selectedSong)}
                    />
                    <RiArrowDownCircleLine
                        className={styles.iconButton}
                        onClick={() => handleMoveSongDown(selectedSong)}
                    />
                </div>
            </div>
            <div className={styles.mediaButtonsWrapper}>
                <IoMdPlay
                    className={`${isPlaying ? styles.mediaButtonPlaying : styles.mediaButton}`}
                    onClick={() => setIsPlaying(true)}/>
                <BiSolidSquare
                    className={styles.mediaButton}
                    onClick={() => setIsPlaying(false)}/>
            </div>
        </div>
    )
}