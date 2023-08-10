import styles from "../styles/setlistSection.module.css";
import SongsTable from "./SongsTable";
import {useEffect, useState} from "react";
import {IoMdPlay} from "react-icons/io";
import {BiSolidSquare, BiSolidDownArrowAlt, BiSolidUpArrowAlt} from "react-icons/bi";
import logo from "../assets/Ableton_logo.png";
import axios from "axios";

export default function SetlistSection() {

    const [cues, setCues] = useState([]);
    const [selectedSongId, setSelectedSongId] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [songRange, setSongRange] = useState([]);

    useEffect(() => {
        async function fetchCues() {
            try {
                const response = await axios.get("http://localhost:3001/cues");
                const fetchedCues = response.data;
                console.log("Fetched", fetchedCues);
                setCues(fetchedCues);
                const generateSongTimeRanges = (cues) => {
                    const songRanges = [];
                    for (let i = 0; i < cues.length - 1; i++) {
                        const startTime = cues[i].time;
                        const endTime = cues[i + 1].time;
                        songRanges.push({
                            id: cues[i].id,
                            start_time: startTime,
                            end_time: endTime,
                        });
                    }
                    console.log("Ranges", songRanges);
                    return songRanges;
                };

                const generatedSongRange = generateSongTimeRanges(fetchedCues);
                setSongRange(generatedSongRange);
            } catch (error) {
                console.error("Error fetching cues:", error);
            }
        }
        fetchCues();
    }, []);

    useEffect(() => {
        console.log("Ranges", songRange);
    }, [songRange]);

    const startPlaying = async () => {
        try {
            const response = await axios.get("http://localhost:3001/start-playing");
            console.log(response.data.message);
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };
    const stopPlaying = async () => {
        try {
            const response = await axios.get("http://localhost:3001/stop-playing");
            console.log(response.data.message);
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    const sendCueData = async (cueData) => {
        try {
            console.log("Sending cue data:", cueData);

            const response = await axios.post("http://localhost:3001/send-cue", cueData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            console.log(response.data);
        } catch (error) {
            console.error("Error sending cue:", error);
        }
    };


    const sendSelectedCue = async () => {
        if (selectedSongId !== null) {
            const selectedCue = cues.find((cue) => cue.id === selectedSongId);
            if (selectedCue) {
                sendCueData(selectedCue);
            } else {
                console.error("Selected cue not found");
            }
        }
    };

    useEffect(() => {
        sendSelectedCue();
    }, [selectedSongId]);

    const fetchIsPlaying = async () => {
        try {
            const response = await axios.get("http://localhost:3001/is-playing");
            const isPlayingValue = response.data.isPlaying;
            setIsPlaying(isPlayingValue);
        } catch (error) {
            console.error("Error fetching playing status:", error);
        }
    };
    const fetchCurrentTime = async () => {
        try {
            const response = await axios.get("http://localhost:3001/current-time");
            const currentTimeValue = response.data.currentTime;
            setCurrentTime(currentTimeValue);
        } catch (error) {
            console.error("Error fetching playing status:", error);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(async () => {
            await fetchIsPlaying();
            await fetchCurrentTime();
        }, 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const advanceToNextSong = () => {
        console.log("Current time: ", currentTime);
        console.log("Selected id: ", selectedSongId);
        if (selectedSongId !== "") {
            const currentSongIndex = cues.findIndex(song => song.id === selectedSongId);
            if (currentSongIndex !== -1) {
                const currentSongRange = songRange[currentSongIndex];
                console.log("end_time", currentSongRange.end_time);
                if (currentTime >= currentSongRange.end_time) {
                    if (currentSongIndex < cues.length - 1) {
                        setSelectedSongId(cues[currentSongIndex + 1].id);
                    }
                }
            }
        }
    };

    useEffect(() => {
        advanceToNextSong();
    }, [currentTime]);

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

    const handlePlayClick = () => {
        startPlaying();
    }
    const handleStopClick = () => {
        stopPlaying();
    }

    return (
        <div className={styles.setlistSectionBody}>
            <img src={logo} alt={"Ableton Logo"} className={styles.logo}/>
            <h2>Setlist Management</h2>
            <div className={styles.tableWrapper}>
                <SongsTable songs={cues} selectedSong={selectedSongId} setSelectedSong={setSelectedSongId}/>
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
            <div className={styles.mediaButtonsWrapper}>
                <IoMdPlay
                    className={`${isPlaying ? styles.mediaButtonPlaying : styles.mediaButton}`}
                    onClick={handlePlayClick}/>
                <BiSolidSquare
                    className={styles.mediaButton}
                    onClick={handleStopClick}/>
            </div>
        </div>
    )
}