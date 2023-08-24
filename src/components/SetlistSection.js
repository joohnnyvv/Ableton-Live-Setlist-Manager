import styles from "../styles/setlistSection.module.css";
import SongsTable from "./SongsTable";
import {useEffect, useState} from "react";
import {BiSolidDownArrowAlt, BiSolidUpArrowAlt} from "react-icons/bi";
import logo from "../assets/Ableton_logo.png";
import axios from "axios";
import { startPlaying, stopPlaying, fetchCurrentTime, fetchIsPlaying, sendCueData } from "../api/api";
import MediaButtons from "./MediaButtons";

export default function SetlistSection() {

    const [cues, setCues] = useState([]);
    const [movableCues, setMovableCues] = useState([]);
    const [selectedSongId, setSelectedSongId] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        async function fetchCues() {
            try {
                const response = await axios.get("http://localhost:3001/cues");
                const fetchedCues = response.data;
                setCues(fetchedCues);
                setMovableCues(fetchedCues);
            } catch (error) {
                console.error("Error fetching cues:", error);
            }
        }

        fetchCues();
    }, []);

    useEffect(() => {
        const updatedCues = cues.map(cue => ({
            ...cue,
            stopOnFinish: true
        }));
        setMovableCues(updatedCues);
    }, [cues]);


    const sendSelectedCue = async () => {
        if (selectedSongId !== null) {
            const selectedCue = movableCues.find((cue) => cue.id === selectedSongId);
            if (selectedCue) {
                sendCueData(selectedCue);
            } else {
                console.error("Selected cue not found");
            }
        }
    };

    useEffect(() => {
        sendSelectedCue();
        console.log("SENDING CUE!")
    }, [selectedSongId]);

    async function updateCurrentTime() {
        try {
            const currentTimeValue = await fetchCurrentTime();
            setCurrentTime(currentTimeValue);
            return currentTimeValue;
        } catch (error) {
            console.error("Error fetching current time", error);
        }
    }

    useEffect(() => {

        const intervalId = setInterval(async () => {
            try {
                const isPlayingValue = await fetchIsPlaying();
                setIsPlaying(isPlayingValue);
                const time = await updateCurrentTime();
                console.log("current time", time)
                advanceToNextSong(time);
            } catch (error) {
                console.error("Error fetching time/is playing", error);
            }
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [currentTime]);

    const advanceToNextSong = (currentTimeValue) => {
        const currentSongIndex = movableCues.findIndex(song => song.id === selectedSongId);
        console.log("Current index: ", currentSongIndex);
        if (selectedSongId !== "") {
            if (currentSongIndex !== -1) {
                if (Math.round(currentTimeValue) >= cues[cues.findIndex(song => song.id === selectedSongId) + 1].time) {
                    console.log("Time higher than end time... Current time: ", currentTimeValue, "end time: ", cues[cues.findIndex(song => song.id === selectedSongId) + 1].time)
                    if (movableCues[currentSongIndex].stopOnFinish === true && currentSongIndex < cues.length - 1) {
                        stopPlaying();
                        setSelectedSongId(movableCues[currentSongIndex + 1].id);
                        console.log("Song changed and stopped.")
                    } else if (currentSongIndex < cues.length - 1) {
                        setSelectedSongId(movableCues[currentSongIndex + 1].id);
                        console.log("Song changed and playing")
                    }
                }
            }
        }
    };

    const handleMoveSongUp = (songId, e) => {
        const songIndex = movableCues.findIndex((song) => song.id === songId);
        if (songIndex > 0) {
            const updatedSongs = [...movableCues];
            const [movedSong] = updatedSongs.splice(songIndex, 1);
            updatedSongs.splice(songIndex - 1, 0, movedSong);
            setMovableCues(updatedSongs);
        }
    };

    const handleMoveSongDown = (songId, e) => {
        const songIndex = movableCues.findIndex((song) => song.id === songId);
        if (songIndex < cues.length - 1) {
            const updatedSongs = [...movableCues];
            const [movedSong] = updatedSongs.splice(songIndex, 1);
            updatedSongs.splice(songIndex + 1, 0, movedSong);
            setMovableCues(updatedSongs);
        }
    };

    const handlePlayClick = () => {
        startPlaying();
    }
    const handleStopClick = () => {
        stopPlaying();
    }
    const handleStopOnFinishClick = (index) => {
        const updatedCues = [...movableCues];
        updatedCues[index] = {
            ...updatedCues[index],
            stopOnFinish: !updatedCues[index].stopOnFinish,
        };
        setMovableCues(updatedCues);
    }

    return (
        <div className={styles.setlistSectionBody}>
            <img src={logo} alt={"Ableton Logo"} className={styles.logo}/>
            <h2>Setlist Management</h2>
            <div className={styles.tableWrapper}>
                <SongsTable songs={movableCues} selectedSongId={selectedSongId} setSelectedSongId={setSelectedSongId}
                            handleStopOnFinishClick={handleStopOnFinishClick}/>
                <div className={styles.buttonsWrapper}>
                    <BiSolidUpArrowAlt
                        className={styles.orderManageButton}
                        onClick={() => handleMoveSongUp(selectedSongId)}
                    />
                    <BiSolidDownArrowAlt
                        className={styles.orderManageButton}
                        onClick={() => handleMoveSongDown(selectedSongId)}
                    />
                </div>
            </div>
            <MediaButtons
                isPlaying={isPlaying}
                handlePlayClick={handlePlayClick}
                handleStopClick={handleStopClick}
            />
        </div>
    )
}