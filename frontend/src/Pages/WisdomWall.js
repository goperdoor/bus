import React, { useState } from 'react';
import { Send, X, Upload, Heart, Eye } from 'lucide-react';
import { useEffect } from 'react';

const WisdomWall = () => {

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    content: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  // EmailJS Configuration - Replace with your actual values
  const EMAILJS_SERVICE_ID = 'service_87ck1xf';
  const EMAILJS_TEMPLATE_ID = 'template_kwuq4ws';
  const EMAILJS_PUBLIC_KEY = '9WRF-7T0ePeDybk-U';

  // Cloudinary Configuration - Replace with your actual values
  const CLOUDINARY_CLOUD_NAME = 'dm4u0c7ga';
  const CLOUDINARY_UPLOAD_PRESET = 'unsigned_preset';

  // Sample data - in real app, this would come from your backend
const [posts, setPosts] = useState([
  {
    id: 1,
    name: "Rohini Bhat",
    type: "art",
    content: "Yakshagana face painting for 'Kaurava Vesha' performed at Perdoor Temple festival",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Yakshagana_face_painting.jpg/640px-Yakshagana_face_painting.jpg",
    likes: 54,
    views: 210
  },
  {
    id: 2,
    name: "Avinash Rai",
    type: "quote",
    content: "Tulunadu is not just a place, it’s a heartbeat that dances with the waves of the sea and the beats of Chende.",
    likes: 32,
    views: 150
  },
  {
    id: 3,
    name: "Keerthi Shetty",
    type: "drawing",
    content: "Sketch of St. Mary's Island at sunset",
    image: "https://images.unsplash.com/photo-1605531613064-3cc3b7a5a04b?w=400&h=300&fit=crop",
    likes: 47,
    views: 178
  },
  {
    id: 4,
    name: "Yathin Hegde",
    type: "song",
    content: "🎵 Tulu Folk Song: 'Bale Thelikeda Bolli' – A melody about monsoon and coconut palms swaying in the wind.",
    likes: 29,
    views: 112
  },
  {
    id: 5,
    name: "Divya Poojary",
    type: "art",
    content: "Kolam design inspired by Perdoor temple chariot carvings",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/28/Kolam_2019.jpg",
    likes: 33,
    views: 141
  },
  {
    id: 6,
    name: "Pranav Kamath",
    type: "quote",
    content: "Ooru da gindi, marada thudi – that’s where my story begins. #TuluNad",
    likes: 39,
    views: 120
  },
  {
    id: 7,
    name: "Sneha D'Souza",
    type: "art",
    content: "Acrylic painting of Ullal Beach during twilight",
    image: "https://images.unsplash.com/photo-1582076956117-0fa2e2c84a2d?w=400&h=300&fit=crop",
    likes: 26,
    views: 96
  },
  {
    id: 8,
    name: "Ganesh Kotian",
    type: "quote",
    content: "Namma Tulu, namma nadu, namma hemme! Let’s preserve what we proudly call Tulunadu.",
    likes: 44,
    views: 133
  },
  {
    id: 9,
    name: "Meghana Nayak",
    type: "quote",
    content: "Perdooru yochchi, muttu onji buthi – peace lives in Perdoor’s breeze.",
    likes: 37,
    views: 111
  },
  {
    id: 10,
    name: "Rakesh Shetty",
    type: "art",
    content: "Captured this photo during Rathotsava at Sri Ananthapadmanabha Temple, Perdoor",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Temple_car.jpg/640px-Temple_car.jpg",
    likes: 61,
    views: 219
  },
  {
    id: 11,
    name: "Harshini D.",
    type: "drawing",
    content: "Pen sketch of Perdoor bridge over river Swarna",
    image: "https://images.unsplash.com/photo-1602779136942-daf594edb9d2?w=400&h=300&fit=crop",
    likes: 45,
    views: 142
  },
  {
    id: 12,
    name: "Ajith Karkera",
    type: "quote",
    content: "Perdoor is where the temple bell rings louder than traffic – and that’s how I like it.",
    likes: 49,
    views: 172
  },
    {
    id: 13,
    name: "Nitin Salian",
    type: "sports",
    content: "🏏 Perdoor Premier League 2025 – Team Namma Tigers took the win in a thrilling final!",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=300&fit=crop",
    likes: 58,
    views: 190
  },
  {
    id: 14,
    name: "Sandhya Poojary",
    type: "quote",
    content: "ಒಳ್ಳೆಯ ದಿನಗಳು ಹತ್ತಿರದಲ್ಲಿವೆ. ಸ್ವಲ್ಪ ಧೈರ್ಯವಿಟ್ಟು ಮುಂದುವರಿಯಿರಿ.",
    likes: 42,
    views: 123
  },
  {
    id: 15,
    name: "Rajeev Nayak",
    type: "motivational",
    content: "Don’t wait for inspiration. Be the reason someone believes in change. 💫",
    likes: 39,
    views: 110
  },
  {
    id: 16,
    name: "Prajwal Hegde",
    type: "sports",
    content: "🏐 Evening volleyball matches near Perdoor High School bring together all age groups. Pure joy!",
    image: "https://images.unsplash.com/photo-1600093463592-44b0e8b682d4?w=400&h=300&fit=crop",
    likes: 33,
    views: 102
  },
  {
    id: 17,
    name: "Aishwarya Shenoy",
    type: "quote",
    content: "ತುಂಬಾ ದೂರದ ಕನಸು ಕಾಣಿರಿ, ದಾರಿ ಸಿಗುತ್ತೆ.",
    likes: 48,
    views: 128
  },
  {
    id: 18,
    name: "Roshan Shetty",
    type: "motivational",
    content: "Success isn’t a one-day event. It’s the small steps, taken daily, in silence.",
    likes: 51,
    views: 150
  },
  {
    id: 19,
    name: "Bhavya D'Souza",
    type: "quote",
    content: "Nenepuga onji gadyānta, gathaka onji parisar – Perdoor gattava ulladu. 🙏 (Memories are poems, Perdoor is heritage.)",
    likes: 36,
    views: 97
  },
  {
    id: 20,
    name: "Sharan Poojary",
    type: "sports",
    content: "🥇 Winners of the rural-level kabaddi tournament held near Perdoor Bus Stand. Great crowd energy!",
    image: "https://images.unsplash.com/photo-1597751102935-73b0b546da1f?w=400&h=300&fit=crop",
    likes: 62,
    views: 204
  },
  {
    id: 21,
    name: "Chaitra Udupa",
    type: "quote",
    content: "ಜೀವನದಲ್ಲಿ ಯಶಸ್ಸು ಬೇಕಾದರೆ ಮೊದಲಿಗೆ ನಂಬಿಕೆ ಬೇಕು.",
    likes: 41,
    views: 120
  },
  {
    id: 22,
    name: "Anvith Shetty",
    type: "motivational",
    content: "🌱 From the roots of small towns grow the tallest dreams. Proud to be from Perdoor!",
    likes: 59,
    views: 201
  }

]);



  // Track which posts user has liked (in a real app, this would be stored in backend/localStorage)
  const [likedPosts, setLikedPosts] = useState(new Set());

  // Handle like/unlike functionality
  const handleLike = (postId) => {
    const isCurrentlyLiked = likedPosts.has(postId);
    
    // Update liked posts set
    const newLikedPosts = new Set(likedPosts);
    if (isCurrentlyLiked) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);

    // Update post likes count
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + (isCurrentlyLiked ? -1 : 1) }
          : post
      )
    );

    // Optional: Add a small animation or feedback here
    // You could also send this to your backend API
  };

  // Upload image to Cloudinary
  const uploadImageToCloudinary = async (imageFile) => {
  const formData = new FormData();
  formData.append('file', imageFile);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET); // ✅ this is required for unsigned uploads

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Cloudinary error response:", errorData); // helpful log
      throw new Error('Failed to upload image to Cloudinary');
    }

    const data = await response.json();
    return {
      url: data.secure_url,
      public_id: data.public_id
    };
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};

  // Send email using EmailJS
  const sendEmailNotification = async (templateParams) => {
    try {
      // Load EmailJS if not already loaded
      if (!window.emailjs) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        script.onload = () => {
          window.emailjs.init(EMAILJS_PUBLIC_KEY);
        };
        document.head.appendChild(script);
        
        // Wait for script to load
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      const response = await window.emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      return response;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }

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

    try {
      let imageInfo = null;

      // Upload image to Cloudinary if provided
      if (formData.image) {
        try {
          const uploadResult = await uploadImageToCloudinary(formData.image);
          imageInfo = {
            url: uploadResult.url,
            public_id: uploadResult.public_id
          };
          setUploadedImageUrl(uploadResult.url);
        } catch (error) {
          alert('Failed to upload image. Please try again.');
          setIsSubmitting(false);
          return;
        }
      }

      // Prepare email template parameters
      const templateParams = {
        from_name: formData.name,
        user_name: formData.name,
        message: formData.content,
        content: formData.content,
        submission_date: new Date().toLocaleDateString(),
        submission_time: new Date().toLocaleTimeString(),
        has_image: imageInfo ? 'Yes' : 'No',
        image_url: imageInfo ? imageInfo.url : 'No image uploaded',
        image_name: imageInfo ? imageInfo.public_id : 'No image',
        cloudinary_public_id: imageInfo ? imageInfo.public_id : 'N/A',
        to_email: 'admin@yoursite.com' // Replace with your admin email
      };

      // Send email notification
      await sendEmailNotification(templateParams);
      
      alert('Your submission has been sent successfully! The admin will review it shortly.');
      
      // Reset form
      setIsPopupOpen(false);
      setFormData({ name: '', content: '', image: null });
      setImagePreview(null);
      setUploadedImageUrl(null);
      
    } catch (error) {
      console.error('Submission error:', error);
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
    fontSize: '2.3rem',
    fontWeight: 'bolder',
    color: '#6F5AFF',
    marginBottom: '8px',
    
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

  const likeButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    transition: 'all 0.2s ease'
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

  const configWarningStyle = {
    backgroundColor: '#fef3c7',
    border: '1px solid #fbbf24',
    borderRadius: '6px',
    padding: '12px',
    marginBottom: '16px',
    fontSize: '0.875rem',
    color: '#92400e'
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

  // Check if configuration is needed
  const needsConfig = EMAILJS_SERVICE_ID === 'your_service_id' || 
                     CLOUDINARY_CLOUD_NAME === 'your_cloud_name';

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
                      <button 
                        onClick={() => handleLike(post.id)}
                        style={{
                          ...likeButtonStyle,
                          color: likedPosts.has(post.id) ? '#ef4444' : '#6b7280'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#f3f4f6';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                        }}
                      >
                        <Heart 
                          style={{ 
                            width: '12px', 
                            height: '12px',
                            fill: likedPosts.has(post.id) ? '#ef4444' : 'none'
                          }} 
                        />
                        <span>{post.likes}</span>
                      </button>
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
                  {needsConfig && (
                    <div style={configWarningStyle}>
                      ⚠️ Configuration needed: Please update EmailJS and Cloudinary settings in the code.
                    </div>
                  )}
                  
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
                        <span style={uploadTextStyle}>Click to upload image (Max 5MB)</span>
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
