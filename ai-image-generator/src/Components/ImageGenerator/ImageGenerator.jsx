import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import default_image from '../Assets/default_image.svg';

const ImageGenerator = () => {
  const [image_url, setImage_url] = useState("/");
  let inputRef = useRef(null);

  const imageGenerator = async () => {
    const prompt = inputRef.current.value.trim();
    if (prompt === "") {
      // Handle empty input case
      alert("Please enter a description.");
      return;
    }

    try {
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            'Authorization': `Bearer sk-proj-lY6twcs9v7H8ItVAbTVvT3BlbkFJ05MEjjZww4cv8xelsaH9`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            prompt: prompt,
            n: 1,
            size: "512x512",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }

      let data = await response.json();
      let data_array = data.data;
      setImage_url(data_array[0].url);
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to generate image. Please try again later.");
    }
  }

  return (
    <div className='ai-image-generator'>
      <div className='header'>AI Image <span>Generator</span></div>

      <div className="img-loading">
        <div className="image">
          <img src={image_url === "/" ? default_image : image_url} alt="" className="src" />
        </div>
      </div>

      <div className="search-box">
        <input type="text" ref={inputRef} className="search-input" placeholder='Describe what you want to see...' />
        <div className="generate-btn" onClick={imageGenerator}>Generate!</div>
      </div>
    </div>
  )
}

export default ImageGenerator;


