import React from "react";
import { useNavigate } from "react-router-dom";

function Mystery({ data, handleMysteryClick }) {
  return (
    <div className="mystery-container">
      <img className="pic" src={data.image} alt={data.title} />
      <p className="text">{data.title}</p>
      <div className="mystery-button-container">
        <button
          className="mystery-button"
          onClick={() => handleMysteryClick(data)}
        >
          Choose
        </button>
      </div>
    </div>
  );
}

function ChooseMystery() {
  var operation = sessionStorage.getItem("operation");

  const mysteries = [
    {
      title: "Aloha Scooby-Doo!",
      image: "https://i.postimg.cc/zv11N7VF/temp-Image7wj-Xi-R.jpg",
      story: [
        [
          "The Mystery Team arrives on the sunny beaches of Hawaii for a famous surfing competition.",
          "https://i.postimg.cc/NFhdHdX9/temp-Image0-Shus-U.jpg",
        ],
        // Additional parts of the story...
      ],
    },
    {
      title: "Scooby-Doo! Haunted Holidays",
      image: "https://i.postimg.cc/yxNQ28cK/temp-Image-GIXOS3.jpg",
      story: [
        [
          "Scooby-Doo and the Mystery Team decide to spend Christmas with Daphne's uncle, who owns a toy store.",
          "https://i.postimg.cc/Gt9ssHZH/temp-Imageq-HM4-MD.jpg",
        ],
        // Additional parts of the story...
      ],
    },
    {
      title: "Scooby-Doo! The Loch Ness Monster",
      image: "https://i.postimg.cc/8zwWrnGs/temp-Image2-Ns-W2z.jpg",
      story: [
        [
          "Scooby-Doo and the Mystery Team travel to Loch Ness in Scotland to visit Daphne's cousin at the famous Blake Castle.",
          "https://i.postimg.cc/v8N3B6cT/temp-Image-Kbzorl.jpg",
        ],
        // Additional parts of the story...
      ],
    },
    {
      title: "Scooby-Doo! Pirates Ahoy!",
      image: "https://i.postimg.cc/FsvFv0zG/temp-Imageo-Gg-AYL.jpg",
      story: [
        [
          "Scooby-Doo and the Mystery Team go on a cruise with Fred's family to celebrate his birthday.",
          "https://i.postimg.cc/gj2p7bGh/temp-Imageg-JGub-U.jpg",
        ],
        // Additional parts of the story...
      ],
    },
    {
      title: "Scooby-Doo! Where's My Mummy?",
      image: "https://i.postimg.cc/KYStryTc/temp-Imagelz3y-Xl.jpg",
      story: [
        [
          "The Mystery Team is in Egypt attending the opening of a museum dedicated to Cleopatra.",
          "https://i.postimg.cc/HxL0j95b/temp-Image-S5-Dc-ZI.jpg",
        ],
        // Additional parts of the story...
      ],
    },
    {
      title: "Scooby-Doo! Trick or Treat?",
      image: "https://i.postimg.cc/fRzYHhTM/temp-Image-Ew-OE1i.jpg",
      story: [
        [
          "The Mystery Team goes to a Halloween carnival.",
          null,
          "https://www.youtube.com/embed/PQKHtdElMng?si=c28EHwYhUEgr8e-t",
        ],
        // Additional parts of the story...
      ],
    },
  ];

  const navigate = useNavigate();

  const handleMysteryClick = (mystery) => {
    sessionStorage.setItem("mystery", JSON.stringify(mystery.story));
    sessionStorage.setItem("operation", operation);
    navigate(operation);
  };

  const navigateToStartPage = () => {
    navigate("/");
  };

  return (
    <div className="start">
      <div className="choose-container">
        <img
          className="choose-scooby-logo"
          src="https://i.postimg.cc/y860LbcC/temp-Image-WV2-VSI.jpg"
          alt="choose-scooby-logo"
        />
      </div>
      <p className="choose-scooby-text">Choose a mystery: </p>
      <div className="choose-scooby">
        {mysteries.map((mystery, index) => (
          <Mystery
            key={index}
            data={mystery}
            handleMysteryClick={handleMysteryClick}
          />
        ))}
      </div>
      <button className="go-to-start-button" onClick={navigateToStartPage}>
        Back
      </button>
      <img
        className="scooby-crew"
        src="https://i.postimg.cc/JzD0C8nd/temp-Image-YIf-Wn-B.jpg"
        alt="scooby-crew"
      />
    </div>
  );
}

export default ChooseMystery;
