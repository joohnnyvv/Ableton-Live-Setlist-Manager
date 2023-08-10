import styles from "../styles/setlistSection.module.css";
import SongsTable from "./SongsTable";
import {useEffect, useState} from "react";
import {IoMdPlay} from "react-icons/io";
import {BiSolidSquare, BiSolidDownArrowAlt, BiSolidUpArrowAlt} from "react-icons/bi";
import songsModel from "../songs.json";
import logo from "../assets/Ableton_logo.png";

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
            <img src={logo} alt={"Ableton Logo"} className={styles.logo}/>
            <h2>Setlist Management</h2>
            <div className={styles.tableWrapper}>
                <SongsTable songs={songs} selectedSong={selectedSong} setSelectedSong={setSelectedSong}/>
                <div className={styles.buttonsWrapper}>
                    <BiSolidUpArrowAlt
                        className={styles.orderManageButton}
                        onClick={() => handleMoveSongUp(selectedSong)}
                    />
                    <BiSolidDownArrowAlt
                        className={styles.orderManageButton}
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