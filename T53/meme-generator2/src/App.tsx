import React, { useState } from 'react';
import html2canvas from 'html2canvas';

function App() {
  const [image, setImage] = useState<string>('');
  const [topText, setTopText] = useState<string>('');
  const [bottomText, setBottomText] = useState<string>('');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        setImage(e.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    const memeContainer = document.getElementById('meme-container');

    if (memeContainer) {
      html2canvas(memeContainer, {
        allowTaint: true,
        useCORS: true,
      }).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'my-meme.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  return (
    <div className="app">
      <h1>Meme Generator</h1>

      <input type="file" accept="image/*" onChange={handleImageChange} />
      <div id="meme-container" className="meme-container">
        {image && <img src={image} alt="Meme Image" />}
        <input
          type="text"
          className="text top-text"
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
          placeholder="Top Text"
        />
        <input
          type="text"
          className="text bottom-text"
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value)}
          placeholder="Bottom Text"
        />
      </div>

      <button onClick={handleDownload}>Download Meme</button>
    </div>
  );
}

export default App;
