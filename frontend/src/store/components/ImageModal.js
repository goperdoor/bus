
import React from 'react';
import { X } from 'lucide-react';
import '../styles/ImageModal.css';

const ImageModal = ({ isOpen, imageUrl, imageName, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="image-modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        <img 
          src={imageUrl} 
          alt={imageName || 'Product image'} 
          className="image-modal-img"
        />
        {imageName && (
          <div className="image-modal-title">
            {imageName}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModal;
