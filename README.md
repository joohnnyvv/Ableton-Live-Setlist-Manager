
# Ableton Live Setlist Manager
![Zrzut ekranu 2023-08-15 235238](https://github.com/joohnnyvv/Ableton-Live-Setlist-Manager/assets/110868938/6be63a7a-42a3-4e31-af1c-397c14016c18)


The Ableton Live Setlist Manager is a user-friendly application designed to help musicians, DJs, and performers efficiently manage their setlists within Ableton Live, the renowned digital audio workstation. This app aims to simplify the process of organizing and navigating through your performance, offering essential features to enhance your live shows.


## Features

- **Seamless Integration**: Effortlessly import your Ableton Live markers, cues, and segments into the app, ensuring perfect synchronization between the app and your Ableton Live set.

- **Intuitive Setlist Creation**: Create and arrange setlists with ease, allowing you to sequence songs, cues, and segments in the desired order for a smooth performance flow.

- **Playback Control**: Control playback directly from the app, eliminating the need to switch between Ableton Live and other tools.

- **Flexible Stop-On-Finish Option**: Choose whether each song stops automatically after completion or seamlessly transitions to the next, providing a versatile approach to your performance dynamics.


## Getting Started

- Install the Ableton Live Setlist Manager app on your device.
- Run a server to communicate with Ableton Live: https://github.com/joohnnyvv/setlist-mgmt-server
- Organize your setlist by arranging songs to create your performance sequence.
- You can decide if you want to stop the set after the song is over by clicking the icon on the right side.
- Configure settings to align with your live show preferences.
- Experience a streamlined setlist management process during your live performances.
## Requirements

- Ableton Live installed.
- [ableton-js](https://github.com/leolabs/ableton-js) remote scripts added. You can find instructions on how to configure the ableton-js library in its repository.
- Device with the Ableton Live Setlist Manager app installed
## Run Locally

Follow these steps to get the setlist management app up and running on your local machine:

1. **Clone the Repository:**
  
        git clone https://github.com/joohnnyvv/Ableton-Live-Setlist-Manager.git
  

2. **Clone and Configure [Server Repository](https://github.com/joohnnyvv/setlist-mgmt-server)**

3. **Install Dependencies:**
  
        npm install
  

4. **Run the [Server](https://github.com/joohnnyvv/setlist-mgmt-server)**

5. **Run the Application:**
  
        npm start
  

Now you have the setlist management app up and running locally. The client-side web application will be accessible at http://localhost:3000 and the server will be running on http://localhost:3001.
## Contributing

Contributions to the Ableton Live Setlist Manager app are encouraged! Feel free to share feature suggestions, bug reports, or improvements by opening an issue or submitting a pull request.
