"use client";

// SongManagementApp.tsx
import React, { useState, useEffect } from "react";

// Song interface
interface Song {
  name: string;
  duration: number; // in seconds
  price: number;
}

// Predefined list of available songs
const availableSongs: Song[] = [
  { name: "Song 1", duration: 180, price: 1.99 },
  { name: "Song 2", duration: 240, price: 2.49 },
  { name: "Song 3", duration: 300, price: 2.99 },
];

// SongManagementApp component
const SongManagementApp = () => {
  // State to store purchased songs
  const [purchasedSongs, setPurchasedSongs] = useState<Song[]>([]);
  // State to store wallet balance
  const [balance, setBalance] = useState<number>(100);
  // State to store the playing song and its remaining time
  const [playingSong, setPlayingSong] = useState<{
    song: Song;
    remainingTime: number;
  } | null>(null);

  // Function to purchase a song
  const purchaseSong = (song: Song) => {
    if (balance >= song.price) {
      setBalance(balance - song.price);
      setPurchasedSongs([...purchasedSongs, song]);
    } else {
      alert("Insufficient balance");
    }
  };

  // Function to play a song
  const playSong = (song: Song) => {
    setPlayingSong({ song, remainingTime: song.duration });
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
    <div>
      <h1>Song Management App</h1>
      <h2>Wallet Balance: ${balance.toFixed(2)}</h2>
      <h2>Purchased Songs:</h2>
      <ul>
        {purchasedSongs.map((song, index) => (
          <li key={index}>
            {song.name}{" "}
            {playingSong && playingSong.song.name === song.name ? (
              <span>
                {Math.floor(playingSong.remainingTime / 60)}:
                {playingSong.remainingTime % 60}
              </span>
            ) : (
              <button onClick={() => playSong(song)}>Play</button>
            )}
          </li>
        ))}
      </ul>
      <h2>Available Songs:</h2>
      <ul>
        {availableSongs.map((song, index) => (
          <li key={index}>
            {song.name} - ${song.price.toFixed(2)}{" "}
            {purchasedSongs.find(
              (purchasedSong) => purchasedSong.name === song.name
            ) ? (
              <span>Already purchased</span>
            ) : (
              <button onClick={() => purchaseSong(song)}>Purchase</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongManagementApp;