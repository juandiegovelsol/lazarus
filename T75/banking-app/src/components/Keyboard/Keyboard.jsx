import React, { useState, useEffect } from "react";
import "./keyboard-styles.css";
import CryptoJS from "crypto-js";

const Keyboard = () => {
  // Generate a random array of numbers from 0 to 9
  const [numbers, setNumbers] = useState([]);
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Shuffle the numbers array when the component mounts
    const shuffledNumbers = shuffleArray([...Array(10).keys()].slice(0, 10));
    setNumbers(shuffledNumbers);
  }, []);

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Function to handle number button clicks
  const handleNumberClick = (number) => {
    setPassword(password + number.toString());
  };

  // Function to handle erase button click
  const handleEraseClick = () => {
    setPassword(password.slice(0, -1));
  };

  // Function to handle submit button click
  const handleSubmitClick = () => {
    // Encrypt the password using AES encryption
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      "secretKey123"
    ).toString();
    console.log(encryptedPassword);
  };

  return (
    <div className="keyboard-container">
      <input
        type="text"
        value={password
          .split("")
          .map(() => "*")
          .join("")}
        readOnly
      />
      <div className="keyboard-grid">
        {numbers.slice(0, 3).map((number, index) => (
          <button key={index} onClick={() => handleNumberClick(number)}>
            {number}
          </button>
        ))}
        {numbers.slice(3, 6).map((number, index) => (
          <button key={index} onClick={() => handleNumberClick(number)}>
            {number}
          </button>
        ))}
        {numbers.slice(6, 9).map((number, index) => (
          <button key={index} onClick={() => handleNumberClick(number)}>
            {number}
          </button>
        ))}
        <button disabled></button>
        <button onClick={() => handleNumberClick(numbers[9])}>
          {numbers[9]}
        </button>
        <button onClick={handleEraseClick}>Erase</button>
      </div>
      <button onClick={handleSubmitClick}>Submit</button>
    </div>
  );
};

export default Keyboard;
