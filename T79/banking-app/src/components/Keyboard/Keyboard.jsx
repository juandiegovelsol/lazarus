import React, { useState, useEffect } from "react";
import "./keyboard-styles.css";
import CryptoJS from "crypto-js";

const Keyboard = () => {
  // Generate a random array of numbers from 0 to 9
  const [numbers, setNumbers] = useState([]); // Initialize an empty array to store the shuffled numbers
  const [password, setPassword] = useState([]); // Initialize an empty array to store the encrypted password
  const [hideNumbers, setHideNumbers] = useState(false); // Initialize a flag to track whether numbers should be hidden

  useEffect(() => {
    // Shuffle the numbers array when the component mounts
    const shuffledNumbers = shuffleArray([...Array(10).keys()].slice(0, 10));
    setNumbers(shuffledNumbers); // Set the shuffled numbers in the state
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
    const encryptedNumber = CryptoJS.AES.encrypt(
      number.toString(),
      "secretKey123"
    ).toString();
    setPassword((prevPassword) => [...prevPassword, encryptedNumber]); // Append the encrypted number to the password state
  };

  // Function to handle number button hover
  const handleNumberHover = () => {
    setHideNumbers(true); // Set the flag to hide numbers when a number button is hovered
  };

  // Function to handle erase button click
  const handleEraseClick = () => {
    setPassword([]); // Reset the password state to empty
    setHideNumbers(false); // Reset the flag to show numbers
  };

  // Function to handle submit button click
  const handleSubmitClick = () => {
    console.log(password); // Print the encrypted password
    setPassword([]); // Reset the password state to empty
    setHideNumbers(false); // Reset the flag to show numbers
  };

  return (
    <div className="keyboard-container">
      <div className="keyboard-grid">
        <input
          type="text"
          value={password.map(() => "*").join("")}
          readOnly
          className="password-field"
        />
        {/* Converts the password array into * characters to display them in the UI */}
        <button onClick={handleSubmitClick} className="submit-button">
          Submit
        </button>
        {numbers.slice(0, 3).map((number, index) => (
          /* Slice the numbers state to show only the first 3 */
          <button
            key={index}
            onClick={() => handleNumberClick(number)}
            onMouseOver={handleNumberHover}
            className="number-button"
          >
            {hideNumbers ? "*" : number}
            {/* Display * if hideNumbers is true, otherwise display the number */}
          </button>
        ))}
        {numbers.slice(3, 6).map((number, index) => (
          /* Slice the numbers state to show only the next 3 */
          <button
            key={index}
            onClick={() => handleNumberClick(number)}
            onMouseOver={handleNumberHover}
            className="number-button"
          >
            {hideNumbers ? "*" : number}
            {/* Display * if hideNumbers is true, otherwise display the number */}
          </button>
        ))}
        {numbers.slice(6, 9).map((number, index) => (
          /* Slice the numbers state to show only the last 3 */
          <button
            key={index}
            onClick={() => handleNumberClick(number)}
            onMouseOver={handleNumberHover}
            className="number-button"
          >
            {hideNumbers ? "*" : number}
            {/* Display * if hideNumbers is true, otherwise display the number */}
          </button>
        ))}
        <button disabled className="number-button"></button>
        <button
          onClick={() => handleNumberClick(numbers[9])}
          onMouseOver={handleNumberHover}
          className="number-button"
        >
          {hideNumbers ? "*" : numbers[9]}
          {/* Display * if hideNumbers is true, otherwise display the number */}
        </button>
        <button onClick={handleEraseClick} className="erase-button">
          Erase
        </button>
      </div>
    </div>
  );
};

export default Keyboard;
