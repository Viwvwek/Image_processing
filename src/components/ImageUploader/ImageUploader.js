import React, { useState } from 'react';
import './ImageUploader.css';

const ImageUploader = ({ onImageSelect }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onImageSelect(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-uploader">
      <h2>Upload Image</h2>
      <div className="upload-area">
        {preview ? (
          <img src={preview} alt="Preview" className="image-preview" />
        ) : (
          <div className="upload-placeholder">
            <span>Click to select an image</span>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file-input"
        />
      </div>
    </div>
  );
};

export default ImageUploader;