import React from "react";
import { BiSolidSquare } from "react-icons/bi";
import styles from "../styles/mediaButtons.module.css";
import { IoMdPlay } from "react-icons/io";

export default function MediaButtons({ isPlaying, handlePlayClick, handleStopClick }) {
    return (
        <div className={styles.mediaButtonsWrapper}>
            <IoMdPlay
                className={`${isPlaying ? styles.mediaButtonPlaying : styles.mediaButton}`}
                onClick={handlePlayClick}
            />
            <BiSolidSquare
                className={styles.mediaButton}
                onClick={handleStopClick}
            />
        </div>
    );
}

