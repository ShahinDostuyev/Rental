import React from "react";
import "./imageComponent.css"; 

function ImageComponent() {
  return (
    <div className="image-container">
      <img
        src="https://papers.co/wallpaper/papers.co-no06-audi-car-interior-dark-bw-29-wallpaper.jpg"
        alt="Background"
        className="background-image"
      />
    </div>
  );
}

export default ImageComponent;
