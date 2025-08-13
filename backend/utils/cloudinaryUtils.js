const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Extract public_id from Cloudinary URL
const getPublicIdFromUrl = (imageUrl) => {
  if (!imageUrl || !imageUrl.includes('cloudinary.com')) {
    return null;
  }
  
  try {
    // Extract the public_id from the URL
    // Format: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/public_id.jpg
    const urlParts = imageUrl.split('/');
    const uploadIndex = urlParts.findIndex(part => part === 'upload');
    
    if (uploadIndex === -1) return null;
    
    // Get the part after 'upload' (skip version if present)
    let publicIdPart = urlParts.slice(uploadIndex + 1).join('/');
    
    // Remove version (v1234567890) if present
    publicIdPart = publicIdPart.replace(/^v\d+\//, '');
    
    // Remove file extension
    const publicId = publicIdPart.replace(/\.[^/.]+$/, '');
    
    return publicId;
  } catch (error) {
    console.error('Error extracting public_id from URL:', error);
    return null;
  }
};

// Delete single image from Cloudinary
const deleteImageFromCloudinary = async (imageUrl) => {
  const publicId = getPublicIdFromUrl(imageUrl);
  
  if (!publicId) {
    console.log('No valid public_id found for URL:', imageUrl);
    return false;
  }
  
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(`Cloudinary deletion result for ${publicId}:`, result);
    return result.result === 'ok';
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    return false;
  }
};

// Delete multiple images from Cloudinary
const deleteImagesFromCloudinary = async (imageUrls) => {
  if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
    return [];
  }
  
  const results = [];
  
  for (const imageUrl of imageUrls) {
    if (imageUrl && imageUrl.trim()) {
      const success = await deleteImageFromCloudinary(imageUrl);
      results.push({ imageUrl, success });
    }
  }
  
  return results;
};

module.exports = {
  deleteImageFromCloudinary,
  deleteImagesFromCloudinary,
  getPublicIdFromUrl
};
