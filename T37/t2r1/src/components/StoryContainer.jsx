import React, { useState } from "react";
import "./StoryContainer.css";
import QuestionContainer from "./QuestionContainer";

const story = {
  1: {
    text: "You enter the forest. After a few minutes, you see an abandoned cabin. What would you like to do?",
    options: [
      { choice: "Enter the cabin", next: 3 },
      { choice: "Keep exploring the forest", next: 4 },
    ],
  },
  2: {
    text: "You follow the illuminated path. In the distance, you hear a strange melody. You approach and discover a lake with a figure in the distance. What would you like to do?",
    options: [
      { choice: "Walk towards the figure", next: 5 },
      { choice: "Avoid the lake and keep walking", next: 6 },
    ],
  },
  3: {
    text: "You enter the cabin. It's dark and full of dust. Suddenly, you hear a noise behind you. What do you do?",
    options: [
      { choice: "Run out of the cabin", next: 7 },
      { choice: "Face the noise", next: 8 },
    ],
  },
  4: {
    text: "You keep exploring and suddenly find a magical fountain. The water glows brightly. What would you like to do?",
    options: [
      { choice: "Drink water from the fountain", next: 9 },
      { choice: "Ignore the fountain and keep walking", next: 10 },
    ],
  },
  5: {
    text: "You approach the figure and realize it's a mysterious old man offering you a potion. Do you accept it?",
    options: [
      { choice: "Accept the potion", next: 11 },
      { choice: "Reject the potion and leave", next: 12 },
    ],
  },
  6: {
    text: "You keep walking and discover a hidden city among the trees. Would you like to explore the city or go back?",
    options: [
      { choice: "Explore the city", next: 13 },
      { choice: "Return the way you came", next: 14 },
    ],
  },
  7: {
    text: "You run out of the cabin and get lost in the forest. You cannot find your way back. THE END.",
    options: [],
  },
  8: {
    text: "You face the noise, but it was just a window being blown by the wind. You relax and decide to rest in the cabin. THE END.",
    options: [],
  },
  9: {
    text: "You drink water from the magical fountain and feel revitalized. You find your way out of the forest. THE END.",
    options: [],
  },
  10: {
    text: "You ignore the fountain but get lost in the dark forest. You never find the exit. THE END.",
    options: [],
  },
  11: {
    text: "You drink the potion and become immortal, wandering the forest forever. THE END.",
    options: [],
  },
  12: {
    text: "You reject the potion and the old man disappears. You decide to go back home, confused by what you've experienced. THE END.",
    options: [],
  },
  13: {
    text: "You explore the hidden city and discover it's a refuge for those lost in time. You stay there forever. THE END.",
    options: [],
  },
  14: {
    text: "You decide to return, but on the way back, you realize the path has disappeared. THE END.",
    options: [],
  },
};

const StoryContainer = () => {
  const [currentStory, setCurrentStory] = useState(story[1]);
  const [storyHistory, setStoryHistory] = useState([]);

  const makeChoice = (choice) => {
    const nextPart = story[choice];
    setCurrentStory(nextPart);

    setStoryHistory((prevHistory) => [
      ...prevHistory,
      {
        question: currentStory.text,
        options: currentStory.options.map((option) => ({
          choice: option.choice,
          next: option.next,
          chosen: option.next === choice,
        })),
      },
    ]);
  };

  const restartStory = () => {
    setCurrentStory(story[1]);
    setStoryHistory([]);
  };

  return (
    <div className="story-container">
      <h1>Interactive Story Generator</h1>
      {storyHistory.map((item, index) => (
        <QuestionContainer
          key={index}
          storyText={item.question}
          options={item.options}
          makeChoice={makeChoice}
          restartStory={restartStory}
        />
      ))}

      <QuestionContainer
        storyText={currentStory.text}
        options={currentStory.options}
        makeChoice={makeChoice}
        restartStory={restartStory}
      />
    </div>
  );
};

export default StoryContainer;
