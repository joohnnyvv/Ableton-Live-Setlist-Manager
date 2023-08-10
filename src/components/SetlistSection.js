import styles from "../styles/setlistSection.module.css";
import SongsTable from "./SongsTable";
import {useEffect, useState} from "react";
import {IoMdPlay} from "react-icons/io";
import {BiSolidSquare, BiSolidDownArrowAlt, BiSolidUpArrowAlt} from "react-icons/bi";
import logo from "../assets/Ableton_logo.png";

export default function SetlistSection() {

    const [cues, setCues] = useState([]);
    const [selectedSong, setSelectedSong] = useState(-1)
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        async function fetchCues() {
            try {
                const response = await fetch("http://localhost:3001/cues");
                const fetchedCues = await response.json();
                setCues(fetchedCues);
            } catch (error) {
                console.error("Error fetching cues:", error);
            }
        }

        fetchCues();
    }, []);

    useEffect(() => {
        console.log(cues);
    }, [cues]);

    const handleMoveSongUp = (songId, e) => {
        const songIndex = cues.findIndex((song) => song.id === songId);
        if (songIndex > 0) {
            const updatedSongs = [...cues];
            const [movedSong] = updatedSongs.splice(songIndex, 1);
            updatedSongs.splice(songIndex - 1, 0, movedSong);
            setCues(updatedSongs);
        }
    };

    const handleMoveSongDown = (songId, e) => {
        const songIndex = cues.findIndex((song) => song.id === songId);
        if (songIndex < cues.length - 1) {
            const updatedSongs = [...cues];
            const [movedSong] = updatedSongs.splice(songIndex, 1);
            updatedSongs.splice(songIndex + 1, 0, movedSong);
            setCues(updatedSongs);
        }
    };

    return (
        <div className={styles.setlistSectionBody}>
            <img src={logo} alt={"Ableton Logo"} className={styles.logo}/>
            <h2>Setlist Management</h2>
            <div className={styles.tableWrapper}>
                <SongsTable songs={cues} selectedSong={selectedSong} setSelectedSong={setSelectedSong}/>
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