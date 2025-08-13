import React from 'react';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import '../styles/ImageModal.css';

const ImageModal = ({ isOpen, imageUrl, imageName, onClose }) => {
  const [isZoomed, setIsZoomed] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyPress = React.useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isOpen, handleKeyPress]);

  if (!isOpen) return null;

  return (
    <div className="image-modal-overlay" onClick={handleBackdropClick}>
      <div className="image-modal-container">
        <div className="image-modal-header">
          <h3>{imageName || 'Product Image'}</h3>
          <div className="image-modal-controls">
            <button
              className="zoom-button"
              onClick={() => setIsZoomed(!isZoomed)}
              title={isZoomed ? 'Zoom Out' : 'Zoom In'}
            >
              {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
            </button>
            <button
              className="close-button"
              onClick={onClose}
              title="Close (ESC)"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="image-modal-content">
          <img
            src={imageUrl}
            alt={imageName || 'Product Image'}
            className={`modal-image ${isZoomed ? 'zoomed' : ''}`}
            onClick={() => setIsZoomed(!isZoomed)}
          />
        </div>

        <div className="image-modal-footer">
          <p>Click image to zoom • Press ESC to close</p>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
