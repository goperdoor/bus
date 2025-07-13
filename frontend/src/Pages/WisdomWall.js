import React, { useState, useRef } from 'react';
import { Send, Upload, Heart, User, X } from 'lucide-react';

const WisdomWall = () => {
  const [quotes, setQuotes] = useState([
    {
      id: 1,
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      likes: 12,
      image: null
    },
    {
      id: 2,
      text: "Innovation distinguishes between a leader and a follower.",
      author: "Steve Jobs",
      likes: 8,
      image: null
    }
  ]);
  
  const [quoteText, setQuoteText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  
  const fileInputRef = useRef(null);

  const handleImageUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!quoteText.trim() || !authorName.trim()) {
      alert('Please fill in both quote and author fields');
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      const newQuote = {
        id: Date.now(),
        text: quoteText,
        author: authorName,
        likes: 0,
        image: selectedImage
      };
      
      setQuotes(prev => [newQuote, ...prev]);
      setQuoteText('');
      setAuthorName('');
      setSelectedImage(null);
      setIsSubmitting(false);
    }, 500);
  };

  const handleLike = (id) => {
    setQuotes(prev => prev.map(quote => 
      quote.id === id ? { ...quote, likes: quote.likes + 1 } : quote
    ));
  };

  const handleKeyDown = (e, isTextarea = false) => {
    if (isTextarea && e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    } else if (!isTextarea && e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const QuoteIcon = ({ className = "" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
    </svg>
  );

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerTitle}>
            <QuoteIcon className="quote-icon" />
            <h1 style={styles.mainTitle}>Wisdom Wall</h1>
          </div>
          <p style={styles.subtitle}>Share your favorite quotes and inspire others</p>
        </div>
      </div>

      <div style={styles.mainContent}>
        {/* Submission Form */}
        <div style={styles.submissionForm}>
          <h2 style={styles.formTitle}>
            <Send style={styles.sendIcon} />
            Share Your Quote
          </h2>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Your Quote</label>
            <textarea
              value={quoteText}
              onChange={(e) => setQuoteText(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, true)}
              style={styles.formTextarea}
              placeholder="Enter an inspiring quote..."
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Author Name</label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, false)}
              style={styles.formInput}
              placeholder="Who said this?"
            />
          </div>

          {/* Image Upload */}
          <div style={styles.imageUploadContainer}>
            <label style={styles.formLabel}>Add an Image (Optional)</label>
            
            {!selectedImage ? (
              <div
                style={{
                  ...styles.imageUploadArea,
                  ...(isDragOver ? styles.imageUploadAreaDragOver : {})
                }}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload style={styles.uploadIcon} />
                <div style={styles.uploadText}>Click to upload or drag and drop</div>
                <div style={styles.uploadSubtext}>PNG, JPG, GIF up to 5MB</div>
              </div>
            ) : (
              <div style={styles.imagePreview}>
                <img
                  src={selectedImage}
                  alt="Preview"
                  style={styles.previewImage}
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  style={styles.removeImage}
                >
                  <X style={styles.removeIcon} />
                </button>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files[0] && handleImageUpload(e.target.files[0])}
              style={styles.hiddenInput}
            />
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            style={{
              ...styles.submitBtn,
              ...(isSubmitting ? styles.submitBtnDisabled : {})
            }}
          >
            {isSubmitting ? (
              <>
                <div style={styles.loadingSpinner} />
                Submitting...
              </>
            ) : (
              <>
                <Send style={styles.sendIcon} />
                Submit Quote
              </>
            )}
          </button>
        </div>

        {/* Quotes Section */}
        <div style={styles.quotesSection}>
          <h2 style={styles.quotesHeader}>
            <QuoteIcon className="quote-icon" />
            Recent Quotes ({quotes.length})
          </h2>
          
          <div style={styles.quotesContainer}>
            {quotes.length === 0 ? (
              <div style={styles.emptyState}>
                <QuoteIcon className="empty-icon" />
                <p style={styles.emptyText}>No quotes yet. Be the first to share!</p>
              </div>
            ) : (
              quotes.map((quote) => (
                <div key={quote.id} style={styles.quoteCard}>
                  <div style={quote.image ? styles.quoteContentWithImage : styles.quoteContent}>
                    {quote.image && (
                      <img
                        src={quote.image}
                        alt="Quote"
                        style={styles.quoteImage}
                      />
                    )}
                    
                    <div style={styles.quoteBody}>
                      <div style={styles.quoteAvatar}>
                        <QuoteIcon className="quote-icon-white" />
                      </div>
                      
                      <div style={styles.quoteTextContainer}>
                        <blockquote style={styles.quoteText}>
                          "{quote.text}"
                        </blockquote>
                        
                        <div style={styles.quoteFooter}>
                          <div style={styles.quoteAuthor}>
                            <User style={styles.userIcon} />
                            <span>{quote.author}</span>
                          </div>
                          
                          <button
                            onClick={() => handleLike(quote.id)}
                            style={styles.likeBtn}
                          >
                            <Heart style={styles.heartIcon} />
                            <span>{quote.likes}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <style>{`
        .quote-icon {
          width: 2rem;
          height: 2rem;
          color: #9333ea;
        }
        
        .quote-icon-white {
          width: 1.5rem;
          height: 1.5rem;
          color: white;
        }
        
        .empty-icon {
          width: 4rem;
          height: 4rem;
          color: #d1d5db;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          .main-content {
            padding: 1rem !important;
          }
          
          .submission-form {
            padding: 1.5rem !important;
          }
          
          .main-title {
            font-size: 1.5rem !important;
          }
          
          .quote-content {
            flex-direction: column !important;
            gap: 0.75rem !important;
          }
          
          .quote-avatar {
            align-self: flex-start !important;
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    fontFamily: 'Arial, sans-serif',
    background: 'linear-gradient(135deg, #f3e7ff 0%, #e0f2fe 50%, #fce4ec 100%)',
    minHeight: '100vh',
    lineHeight: 1.6
  },
  header: {
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(147, 51, 234, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    padding: '1rem 0'
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem'
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '0.5rem'
  },
  mainTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    background: 'linear-gradient(45deg, #9333ea, #ec4899)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: 0
  },
  subtitle: {
    color: '#6b7280',
    fontSize: '1rem',
    margin: 0
  },
  mainContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1.5rem'
  },
  submissionForm: {
    background: 'white',
    borderRadius: '1rem',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(147, 51, 234, 0.1)',
    padding: '2rem',
    marginBottom: '2rem',
    transition: 'transform 0.3s ease'
  },
  formTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    margin: '0 0 1.5rem 0'
  },
  sendIcon: {
    width: '1.5rem',
    height: '1.5rem',
    color: '#9333ea'
  },
  formGroup: {
    marginBottom: '1.5rem'
  },
  formLabel: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '0.5rem'
  },
  formTextarea: {
    width: '100%',
    height: '8rem',
    padding: '0.75rem 1rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    resize: 'none',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
    boxSizing: 'border-box'
  },
  formInput: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
    boxSizing: 'border-box'
  },
  imageUploadContainer: {
    position: 'relative',
    marginBottom: '1.5rem'
  },
  imageUploadArea: {
    border: '2px dashed #d1d5db',
    borderRadius: '0.5rem',
    padding: '2rem',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    background: '#f9fafb'
  },
  imageUploadAreaDragOver: {
    borderColor: '#9333ea',
    background: '#f3e7ff',
    transform: 'scale(1.02)'
  },
  uploadIcon: {
    width: '3rem',
    height: '3rem',
    color: '#9ca3af',
    margin: '0 auto 1rem'
  },
  uploadText: {
    color: '#6b7280',
    fontSize: '1rem',
    marginBottom: '0.5rem'
  },
  uploadSubtext: {
    color: '#9ca3af',
    fontSize: '0.875rem'
  },
  imagePreview: {
    marginTop: '1rem',
    position: 'relative',
    display: 'inline-block'
  },
  previewImage: {
    maxWidth: '200px',
    maxHeight: '200px',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  },
  removeImage: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    width: '24px',
    height: '24px',
    background: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  removeIcon: {
    width: '14px',
    height: '14px'
  },
  hiddenInput: {
    display: 'none'
  },
  submitBtn: {
    width: '100%',
    background: 'linear-gradient(45deg, #9333ea, #ec4899)',
    color: 'white',
    fontWeight: '600',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  },
  submitBtnDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed'
  },
  loadingSpinner: {
    width: '1.25rem',
    height: '1.25rem',
    border: '2px solid white',
    borderTop: '2px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  quotesSection: {
    marginTop: '2rem'
  },
  quotesHeader: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    margin: '0 0 1.5rem 0'
  },
  quotesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  quoteCard: {
    background: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(147, 51, 234, 0.1)',
    padding: '1.5rem',
    transition: 'all 0.3s ease',
    animation: 'fadeInUp 0.5s ease forwards'
  },
  quoteContent: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem'
  },
  quoteContentWithImage: {
    display: 'block'
  },
  quoteImage: {
    width: '100%',
    maxWidth: '300px',
    height: 'auto',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  },
  quoteBody: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem'
  },
  quoteAvatar: {
    width: '3rem',
    height: '3rem',
    background: 'linear-gradient(45deg, #9333ea, #ec4899)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  quoteTextContainer: {
    flex: 1
  },
  quoteText: {
    fontSize: '1.125rem',
    color: '#374151',
    fontStyle: 'italic',
    lineHeight: 1.6,
    marginBottom: '0.75rem',
    margin: '0 0 0.75rem 0'
  },
  quoteFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  quoteAuthor: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#6b7280'
  },
  userIcon: {
    width: '1rem',
    height: '1rem',
    color: '#6b7280'
  },
  likeBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    background: '#fce4ec',
    color: '#ec4899',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '0.875rem',
    fontWeight: '500'
  },
  heartIcon: {
    width: '1rem',
    height: '1rem',
    color: '#ec4899'
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem 0'
  },
  emptyText: {
    color: '#6b7280',
    fontSize: '1.125rem',
    margin: '1rem 0 0 0'
  }
};

export default WisdomWall;