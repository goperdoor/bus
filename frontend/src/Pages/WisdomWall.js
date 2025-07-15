import React, { useState } from 'react';
import { Send, X, Upload, Heart, Eye } from 'lucide-react';

const WisdomWall = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    content: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample data - in real app, this would come from your backend
  const [posts] = useState([
    {
      id: 1,
      name: "Sarah M.",
      type: "art",
      content: "Beautiful sunset painting",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
      likes: 24,
      views: 89
    },
    {
      id: 2,
      name: "Alex R.",
      type: "quote",
      content: "The best time to plant a tree was 20 years ago. The second best time is now.",
      likes: 18,
      views: 67
    },
    {
      id: 3,
      name: "Maya K.",
      type: "drawing",
      content: "Pencil sketch of a flower",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      likes: 31,
      views: 104
    },
    {
      id: 4,
      name: "John D.",
      type: "song",
      content: "🎵 Original melody about hope and dreams. 'When the morning light breaks through the clouds, I remember all the dreams I've found...'",
      likes: 15,
      views: 43
    },
    {
      id: 5,
      name: "Priya S.",
      type: "art",
      content: "Watercolor landscape",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      likes: 22,
      views: 78
    },
    {
      id: 6,
      name: "David L.",
      type: "quote",
      content: "Creativity is intelligence having fun. - Albert Einstein",
      likes: 28,
      views: 92
    }
  ]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.content) {
      alert('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);

    // EmailJS configuration
    const templateParams = {
      from_name: formData.name,
      message: formData.content,
      to_email: 'admin@yoursite.com', // Replace with your admin email
      // Note: Image handling with EmailJS requires additional setup
    };

    try {
      // Initialize EmailJS (you'll need to replace these with your actual IDs)
      // await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID');
      
      // For demo purposes, we'll simulate the email sending
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Your submission has been sent to admin for review!');
      setIsPopupOpen(false);
      setFormData({ name: '', content: '', image: null });
      setImagePreview(null);
    } catch (error) {
      alert('Error sending submission. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPostIcon = (type) => {
    switch(type) {
      case 'art': return '🎨';
      case 'drawing': return '✏️';
      case 'song': return '🎵';
      case 'quote': return '💭';
      default: return '✨';
    }
  };

  const containerStyle = {
    background: 'linear-gradient(135deg, rgb(243, 231, 255) 0%, rgb(224, 242, 254) 50%, rgb(252, 228, 236) 100%)',
    minHeight: '100vh',
    padding: '20px 0'
  };

  const mainContentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 16px',
    marginTop:'100px'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '32px'
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '8px'
  };

  const subtitleStyle = {
    color: '#6b7280',
    fontSize: '1rem'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '16px',
    marginBottom: '96px'
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    overflow: 'hidden',
    transition: 'box-shadow 0.3s ease',
    cursor: 'pointer'
  };

  const cardHoverStyle = {
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
  };

  const cardImageStyle = {
    width: '100%',
    height: '192px',
    objectFit: 'cover'
  };

  const cardContentStyle = {
    padding: '16px'
  };

  const cardHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '8px'
  };

  const userInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const userIconStyle = {
    fontSize: '1.25rem'
  };

  const userNameStyle = {
    fontWeight: '500',
    color: '#1f2937',
    fontSize: '0.875rem'
  };

  const postTypeStyle = {
    fontSize: '0.75rem',
    color: '#6b7280',
    textTransform: 'capitalize'
  };

  const postContentStyle = {
    color: '#374151',
    fontSize: '0.875rem',
    marginBottom: '12px',
    lineHeight: '1.4',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  };

  const statsStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '0.75rem',
    color: '#6b7280'
  };

  const statsItemsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const statStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  };

  const sendButtonStyle = {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    background: 'linear-gradient(to right, #8b5cf6, #ec4899)',
    color: 'white',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    border: 'none',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    zIndex: 1000
  };

  const sendButtonHoverStyle = {
    background: 'linear-gradient(to right, #7c3aed, #db2777)',
    transform: 'scale(1.1)'
  };

  const popupOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    zIndex: 50
  };

  const popupContentStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '448px',
    maxHeight: '90vh',
    overflowY: 'auto'
  };

  const popupHeaderStyle = {
    padding: '24px',
    paddingBottom: '16px'
  };

  const popupTitleRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  };

  const popupTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1f2937'
  };

  const closeButtonStyle = {
    color: '#6b7280',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    transition: 'color 0.2s ease'
  };

  const closeButtonHoverStyle = {
    color: '#374151'
  };

  const formStyle = {
    padding: '0 24px 24px 24px'
  };

  const formGroupStyle = {
    marginBottom: '16px'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '4px'
  };

  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    boxSizing: 'border-box'
  };

  const inputFocusStyle = {
    borderColor: '#8b5cf6',
    boxShadow: '0 0 0 2px rgba(139, 92, 246, 0.2)'
  };

  const textareaStyle = {
    ...inputStyle,
    resize: 'none',
    minHeight: '80px'
  };

  const uploadAreaStyle = {
    border: '2px dashed #d1d5db',
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'border-color 0.2s ease'
  };

  const uploadAreaHoverStyle = {
    borderColor: '#8b5cf6'
  };

  const uploadLabelStyle = {
    cursor: 'pointer',
    color: '#6b7280',
    transition: 'color 0.2s ease'
  };

  const uploadLabelHoverStyle = {
    color: '#8b5cf6'
  };

  const uploadIconStyle = {
    width: '32px',
    height: '32px',
    margin: '0 auto 8px auto'
  };

  const uploadTextStyle = {
    fontSize: '0.875rem'
  };

  const previewImageStyle = {
    marginTop: '8px',
    maxHeight: '128px',
    borderRadius: '4px',
    display: 'block',
    margin: '8px auto 0 auto'
  };

  const submitButtonStyle = {
    width: '100%',
    background: 'linear-gradient(to right, #8b5cf6, #ec4899)',
    color: 'white',
    padding: '12px 16px',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const submitButtonHoverStyle = {
    background: 'linear-gradient(to right, #7c3aed, #db2777)'
  };

  const submitButtonDisabledStyle = {
    opacity: 0.5,
    cursor: 'not-allowed'
  };

  // Media queries for mobile responsiveness
  const mobileStyles = `
    @media (max-width: 768px) {
      .title { font-size: 1.5rem !important; }
      .subtitle { font-size: 0.875rem !important; }
      .grid { grid-template-columns: 1fr !important; }
      .send-button { bottom: 16px !important; right: 16px !important; width: 48px !important; height: 48px !important; }
      .popup-content { margin: 16px !important; }
    }
    @media (max-width: 480px) {
      .title { font-size: 1.25rem !important; }
      .main-content { padding: 0 12px !important; }
      .grid { margin-bottom: 80px !important; }
    }
  `;

  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredSendButton, setHoveredSendButton] = useState(false);
  const [hoveredCloseButton, setHoveredCloseButton] = useState(false);
  const [hoveredSubmitButton, setHoveredSubmitButton] = useState(false);
  const [hoveredUploadArea, setHoveredUploadArea] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  return (
    <>
      <style>{mobileStyles}</style>
      <div style={containerStyle}>
        <div style={mainContentStyle} className="main-content">
          <div style={headerStyle}>
            <h1 style={titleStyle} className="title">
              Community Skills Gallery
            </h1>
            <p style={subtitleStyle} className="subtitle">
              Share your talents with the world - art, drawings, songs, quotes & more
            </p>
          </div>

          {/* Posts Grid */}
          <div style={gridStyle} className="grid">
            {posts.map((post) => (
              <div 
                key={post.id} 
                style={hoveredCard === post.id ? {...cardStyle, ...cardHoverStyle} : cardStyle}
                onMouseEnter={() => setHoveredCard(post.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {post.image && (
                  <img 
                    src={post.image} 
                    alt={post.content}
                    style={cardImageStyle}
                  />
                )}
                <div style={cardContentStyle}>
                  <div style={cardHeaderStyle}>
                    <div style={userInfoStyle}>
                      <span style={userIconStyle}>{getPostIcon(post.type)}</span>
                      <span style={userNameStyle}>{post.name}</span>
                    </div>
                    <span style={postTypeStyle}>{post.type}</span>
                  </div>
                  <p style={postContentStyle}>{post.content}</p>
                  <div style={statsStyle}>
                    <div style={statsItemsStyle}>
                      <span style={statStyle}>
                        <Heart style={{ width: '12px', height: '12px' }} />
                        <span>{post.likes}</span>
                      </span>
                      <span style={statStyle}>
                        <Eye style={{ width: '12px', height: '12px' }} />
                        <span>{post.views}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Floating Send Button */}
          <button
            onClick={() => setIsPopupOpen(true)}
            style={hoveredSendButton ? {...sendButtonStyle, ...sendButtonHoverStyle} : sendButtonStyle}
            onMouseEnter={() => setHoveredSendButton(true)}
            onMouseLeave={() => setHoveredSendButton(false)}
            className="send-button"
          >
            <Send style={{ width: '24px', height: '24px' }} />
          </button>

          {/* Popup Form */}
          {isPopupOpen && (
            <div style={popupOverlayStyle}>
              <div style={popupContentStyle} className="popup-content">
                <div style={popupHeaderStyle}>
                  <div style={popupTitleRowStyle}>
                    <h2 style={popupTitleStyle}>Share Your Skill</h2>
                    <button
                      onClick={() => setIsPopupOpen(false)}
                      style={hoveredCloseButton ? {...closeButtonStyle, ...closeButtonHoverStyle} : closeButtonStyle}
                      onMouseEnter={() => setHoveredCloseButton(true)}
                      onMouseLeave={() => setHoveredCloseButton(false)}
                    >
                      <X style={{ width: '24px', height: '24px' }} />
                    </button>
                  </div>
                </div>

                <div style={formStyle}>
                  <div style={formGroupStyle}>
                    <label style={labelStyle}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={focusedInput === 'name' ? {...inputStyle, ...inputFocusStyle} : inputStyle}
                      onFocus={() => setFocusedInput('name')}
                      onBlur={() => setFocusedInput(null)}
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div style={formGroupStyle}>
                    <label style={labelStyle}>
                      Share Your Content
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      style={focusedInput === 'content' ? {...textareaStyle, ...inputFocusStyle} : textareaStyle}
                      onFocus={() => setFocusedInput('content')}
                      onBlur={() => setFocusedInput(null)}
                      placeholder="Share your art, drawing, song, quote, or any creative work..."
                      required
                    />
                  </div>

                  <div style={formGroupStyle}>
                    <label style={labelStyle}>
                      Upload Image (Optional)
                    </label>
                    <div 
                      style={hoveredUploadArea ? {...uploadAreaStyle, ...uploadAreaHoverStyle} : uploadAreaStyle}
                      onMouseEnter={() => setHoveredUploadArea(true)}
                      onMouseLeave={() => setHoveredUploadArea(false)}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        style={hoveredUploadArea ? {...uploadLabelStyle, ...uploadLabelHoverStyle} : uploadLabelStyle}
                      >
                        <Upload style={uploadIconStyle} />
                        <span style={uploadTextStyle}>Click to upload image</span>
                      </label>
                      {imagePreview && (
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          style={previewImageStyle}
                        />
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    style={
                      isSubmitting 
                        ? {...submitButtonStyle, ...submitButtonDisabledStyle}
                        : hoveredSubmitButton 
                          ? {...submitButtonStyle, ...submitButtonHoverStyle} 
                          : submitButtonStyle
                    }
                    onMouseEnter={() => setHoveredSubmitButton(true)}
                    onMouseLeave={() => setHoveredSubmitButton(false)}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit for Review'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WisdomWall;
