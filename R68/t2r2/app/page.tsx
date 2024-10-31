"use client"

// SongManagementApp.tsx
import React, { useState, useEffect } from "react";

// Song interface
interface Song {
  name: string;
  duration: number; // in seconds
  price: number;
  artist: string;
  album: string;
  releaseDate: string;
}

// Predefined list of available songs
const availableSongs: Song[] = [
  {
    name: "Song 1",
    duration: 180,
    price: 1.99,
    artist: "Artist 1",
    album: "Album 1",
    releaseDate: "2020-01-01",
  },
  {
    name: "Song 2",
    duration: 240,
    price: 2.49,
    artist: "Artist 2",
    album: "Album 2",
    releaseDate: "2020-02-01",
  },
  {
    name: "Song 3",
    duration: 300,
    price: 2.99,
    artist: "Artist 3",
    album: "Album 3",
    releaseDate: "2020-03-01",
  },
];

// SongManagementApp component
const SongManagementApp = () => {
  // State to store purchased songs
  const [purchasedSongs, setPurchasedSongs] = useState<Song[]>([]);
  // State to store liked songs
  const [likedSongs, setLikedSongs] = useState<Song[]>([]);
  // State to store wallet balance
  const [balance, setBalance] = useState<number>(100);
  // State to store the playing song and its remaining time
  const [playingSong, setPlayingSong] = useState<{
    song: Song;
    remainingTime: number;
  } | null>(null);
  // State to store the current tab
  const [currentTab, setCurrentTab] = useState<string>("all-songs");
  // State to store the song details popup visibility
  const [songDetailsVisible, setSongDetailsVisible] = useState<boolean>(false);
  // State to store the selected song details
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  // Function to purchase a song
  const purchaseSong = (song: Song) => {
    if (balance >= song.price) {
      setBalance(balance - song.price);
      setPurchasedSongs([...purchasedSongs, song]);
    } else {
      alert("Insufficient balance");
    }
  };

  // Function to like a song
  const likeSong = (song: Song) => {
    if (purchasedSongs.find((purchasedSong) => purchasedSong.name === song.name)) {
      setLikedSongs([...likedSongs, song]);
    } else {
      alert("You need to purchase the song first");
    }
  };

  // Function to play a song
  const playSong = (song: Song) => {
    setPlayingSong({ song, remainingTime: song.duration });
  };

  // Function to show song details
  const showSongDetails = (song: Song) => {
    setSelectedSong(song);
    setSongDetailsVisible(true);
  };

  // Function to hide song details
  const hideSongDetails = () => {
    setSongDetailsVisible(false);
  };

  // Use effect to decrement the remaining time of the playing song
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (playingSong) {
        setPlayingSong({
          song: playingSong.song,
          remainingTime: playingSong.remainingTime - 1,
        });
        if (playingSong.remainingTime <= 0) {
          setPlayingSong(null);
        }
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [playingSong]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Song Management App</h1>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Wallet Balance: ${balance.toFixed(2)}</h2>
        <div className="flex justify-end">
          <button
            className={`mr-2 ${currentTab === "all-songs" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"}`}
            onClick={() => setCurrentTab("all-songs")}
          >
            All Songs
          </button>
          <button
            className={`mr-2 ${currentTab === "liked-songs" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"}`}
            onClick={() => setCurrentTab("liked-songs")}
          >
            Liked Songs
          </button>
        </div>
      </div>
      {currentTab === "all-songs" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">All Songs</h2>
          <ul>
            {availableSongs.map((song, index) => (
              <li key={index} className="mb-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{song.name}</h3>
                    <p className="text-gray-600">{song.artist}</p>
                  </div>
                  <div>
                    {purchasedSongs.find((purchasedSong) => purchasedSong.name === song.name) ? (
                      <button className="bg-green-500 text-white" onClick={() => playSong(song)}>
                        Play
                      </button>
                    ) : (
                      <button className="bg-blue-500 text-white" onClick={() => purchaseSong(song)}>
                        Purchase
                      </button>
                    )}
                    <button className="bg-gray-300 text-gray-600 ml-2" onClick={() => showSongDetails(song)}>
                      Details
                    </button>
                    {likedSongs.find((likedSong) => likedSong.name === song.name) ? (
                      <button className="bg-red-500 text-white ml-2" disabled>
                        Liked
                      </button>
                    ) : (
                      <button className="bg-orange-500 text-white ml-2" onClick={() => likeSong(song)}>
                        Like
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {currentTab === "liked-songs" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Liked Songs</h2>
          <ul>
            {likedSongs.map((song, index) => (
              <li key={index} className="mb-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{song.name}</h3>
                    <p className="text-gray-600">{song.artist}</p>
                  </div>
                  <div>
                    <button className="bg-green-500 text-white" onClick={() => playSong(song)}>
                      Play
                    </button>
                    <button className="bg-gray-300 text-gray-600 ml-2" onClick={() => showSongDetails(song)}>
                      Details
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {songDetailsVisible && selectedSong && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 w-1/2">
            <h2 className="text-2xl font-bold mb-4">{selectedSong.name}</h2>
            <p className="text-gray-600 mb-2">Artist: {selectedSong.artist}</p>
            <p className="text-gray-600 mb-2">Album: {selectedSong.album}</p>
            <p className="text-gray-600 mb-2">Release Date: {selectedSong.releaseDate}</p>
            <button className="bg-gray-300 text-gray-600" onClick={hideSongDetails}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SongManagementApp;
