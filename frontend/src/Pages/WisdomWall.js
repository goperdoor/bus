import React, { useState } from 'react';
import { Send, X, Upload, Heart, Eye } from 'lucide-react';
import { useEffect } from 'react';
import './WisdomWall.css';

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
  id: 2,
  name: "Unknown",
  type: "quote",
  content: "Felt like a child again 💙 Celebrated Independence Day at my childhood school 🇮🇳. Memories that never fade.",
  likes: 122,
  views: 241,

  image: "https://res.cloudinary.com/dm4u0c7ga/image/upload/v1755314457/ixinfvcrfy4uuolo9j2x.jpg",
}
,
{
  id: 1,
  name: "Shreyas",
  type: "quote",
  content: "🙏🪅 The biggest festival for the people of Perdoor is the Perdoor Fair, which we celebrate on March 16th. 🎆🎇",
  likes: 11,
  views: 32,
  image: "https://res.cloudinary.com/dm4u0c7ga/image/upload/v1765449380/hyjmuoi88ijcefohutm8.jpg"
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
    id: 18,
    name: "Roshan Shetty",
    type: "motivational",
    content: "Success isn’t a one-day event. It’s the small steps, taken daily, in silence.",
    likes: 51,
    views: 150
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

  // Check if configuration is needed
  const needsConfig = EMAILJS_SERVICE_ID === 'your_service_id' || 
                     CLOUDINARY_CLOUD_NAME === 'your_cloud_name';

  return (
    <div className="wisdom-wall-page" style={{ marginTop: '-80px' }}>
      <div className="wisdom-wall-container">
        {/* Hero Header */}
        <div className="hero-header">
          <h1 className="page-title">✨ Perdoor Skills Gallery</h1>
          <p className="page-subtitle">
            Share your talents with the world - art, drawings, songs, quotes & more
          </p>
        </div>

        {/* Posts Grid */}
        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              {post.image && (
                <div className="post-image-container">
                  <img 
                    src={post.image} 
                    alt={post.content}
                    className="post-image"
                  />
                </div>
              )}
              <div className="post-content">
                <div className="post-header">
                  <div className="user-info">
                    <span className="post-icon">{getPostIcon(post.type)}</span>
                    <span className="user-name">{post.name}</span>
                  </div>
                  <span className="post-type">{post.type}</span>
                </div>
                <p className="post-text">{post.content}</p>
                <div className="post-stats">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className={`like-button ${likedPosts.has(post.id) ? 'liked' : ''}`}
                  >
                    <Heart className="stat-icon" />
                    <span>{post.likes}</span>
                  </button>
                  <div className="stat-item">
                    <Eye className="stat-icon" />
                    <span>{post.views}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Send Button */}
        <button
          onClick={() => setIsPopupOpen(true)}
          className="floating-send-button"
        >
          <Send className="send-icon" />
        </button>

        {/* Popup Form */}
        {isPopupOpen && (
          <div className="popup-overlay" onClick={() => setIsPopupOpen(false)}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <div className="popup-header">
                <h2 className="popup-title">Share Your Skill</h2>
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="close-button"
                >
                  <X className="close-icon" />
                </button>
              </div>

              <div className="popup-form">
                {needsConfig && (
                  <div className="config-warning">
                    ⚠️ Configuration needed: Please update EmailJS and Cloudinary settings in the code.
                  </div>
                )}
                
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Share Your Content</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="form-textarea"
                    placeholder="Share your art, drawing, song, quote, or any creative work..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Upload Image (Optional)</label>
                  <div className="upload-area">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="file-input"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="upload-label">
                      <Upload className="upload-icon" />
                      <span className="upload-text">Click to upload image (Max 5MB)</span>
                    </label>
                    {imagePreview && (
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="preview-image"
                      />
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`submit-button ${isSubmitting ? 'disabled' : ''}`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit for Review'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WisdomWall;


