"use client";

import { useState, useCallback } from 'react';
import { UploadCloud, Image as ImageIcon, X } from 'lucide-react';
import styles from './ImageUpload.module.css';

export default function ImageUpload({ onFilesChange }) {
  const [images, setImages] = useState([]);

  const handleFiles = useCallback((files) => {
    const newImages = Array.from(files)
      .filter(file => file.type.startsWith('image/'))
      .map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));

    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);
    onFilesChange(updatedImages.map(img => img.file));
  }, [images, onFilesChange]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleFileInput = (e) => {
    handleFiles(e.target.files);
  };

  const removeImage = (indexToRemove) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    setImages(updatedImages);
    onFilesChange(updatedImages.map(img => img.file));
  };

  return (
    <div className={styles.container}>
      <label 
        htmlFor="file-upload"
        className={styles.dropzone}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <UploadCloud size={48} />
        <p>Arraste e solte as imagens aqui, ou clique para selecionar</p>
        <input id="file-upload" type="file" multiple accept="image/*" onChange={handleFileInput} />
      </label>

      {images.length > 0 && (
        <div className={styles.previewContainer}>
          {images.map((image, index) => (
            <div key={index} className={styles.previewItem}>
              <img src={image.preview} alt={`Preview ${index}`} />
              <button onClick={() => removeImage(index)}><X size={16} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}   