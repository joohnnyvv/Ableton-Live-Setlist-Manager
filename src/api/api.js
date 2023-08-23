import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export async function startPlaying(){
    try {
        const response = await axios.get(`${API_BASE_URL}/start-playing`);
        console.log(response.data.message);
    } catch (error) {
        console.error("An error occurred:", error);
    }
};
export async function stopPlaying() {
    try {
        const response = await axios.get(`${API_BASE_URL}/stop-playing`);
        console.log(response.data.message);
    } catch (error) {
        console.error("An error occurred:", error);
    }
};

export async function sendCueData(cueData){
    try {
        const response = await axios.post(`${API_BASE_URL}/send-cue`, cueData, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log(response.data);
    } catch (error) {
        console.error("Error sending cue:", error);
    }
};

export async function fetchIsPlaying() {
    try {
        const response = await axios.get(`${API_BASE_URL}/is-playing`);
        return response.data.isPlaying;
    } catch (error) {
        console.error("Error fetching playing status:", error);
    }
};
export async function fetchCurrentTime(){
    try {
        const response = await axios.get(`${API_BASE_URL}/current-time`);
        return response.data.currentTime;
    } catch (error) {
        console.error("Error fetching playing status:", error);
    }
};