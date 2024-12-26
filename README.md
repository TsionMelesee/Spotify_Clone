# Spotify_Clone with React

This project is a simplified Spotify clone built with React, Axios, and React Router. It interacts with the Spotify API to display trending albums, album details, and tracks. Users can preview tracks and manage a local playlist stored in the browser's local storage.

Features

1. Trending Albums

Fetches and displays new releases using Spotify's API.

Allows users to explore trending albums.

2. Album Details and Tracks

Displays detailed information about albums.

Users can preview tracks and add them to their playlist.

3. Playlist Management

Users can view and manage their playlist stored locally in the browser.

4. Responsive Design

Mobile-first design with responsiveness for all screen sizes.

Tech Stack

React: For building the user interface.

Axios: For making API requests.

React Router: For navigation and routing between pages.

Tailwind CSS: For styling.

Spotify Web API: For fetching album and track data.

Getting Started

Prerequisites

Node.js and npm installed.

Spotify Developer Account.

Installation

Clone the repository:

git clone https://github.com/yourusername/spotify-clone.git
cd spotify-clone

Install dependencies:

npm install

Set up environment variables:
Create a .env file in the root directory with your Spotify API credentials:

REACT_APP_SPOTIFY_CLIENT_ID=your_client_id
REACT_APP_SPOTIFY_CLIENT_SECRET=your_client_secret

Start the development server:

npm run dev

Open the app in your browser:
Navigate to http://localhost:5173 (if using Vite).

Folder Structure
