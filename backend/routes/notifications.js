const express = require('express');
const User = require('../models/User');
const webpush = require('web-push');
const router = express.Router();

// Configure web-push (you'll need to set your VAPID keys in environment variables)
webpush.setVapidDetails(
  'mailto:admin@goperdoor.com', // Change this to your email
  process.env.VAPID_PUBLIC_KEY || 'BCvTbCaj8DKVB7C4fJTQ0Io0hCI0JK_q8TWQA7XvdBDuSwR31_YkdqWRY1Oj5Bs2LQEKRc7e-wSQKGZaTk5v1Js',
  process.env.VAPID_PRIVATE_KEY || 'm9S9oiax0ckrxAFxWHPxUIUJsEC2JHSVchvRJBE3K80'
);

// Register or update user notification subscription
router.post('/subscribe', async (req, res) => {
  try {
    const { userId, subscription } = req.body;
    
    let user = await User.findOne({ userId });
    
    if (!user) {
      user = new User({
        userId,
        notificationsEnabled: true,
        pushSubscription: subscription
      });
    } else {
      user.notificationsEnabled = true;
      user.pushSubscription = subscription;
    }
    
    await user.save();
    
    res.json({ 
      success: true, 
      message: 'Notification subscription saved successfully' 
    });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to save subscription' 
    });
  }
});

// Unsubscribe user from notifications
router.post('/unsubscribe', async (req, res) => {
  try {
    const { userId } = req.body;
    
    const user = await User.findOne({ userId });
    if (user) {
      user.notificationsEnabled = false;
      user.pushSubscription = undefined;
      await user.save();
    }
    
    res.json({ 
      success: true, 
      message: 'Successfully unsubscribed from notifications' 
    });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to unsubscribe' 
    });
  }
});

// Get notification statistics (for super admin)
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const subscribedUsers = await User.countDocuments({ notificationsEnabled: true });
    const recentUsers = await User.countDocuments({
      lastSeen: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } // Last 7 days
    });
    
    res.json({
      totalUsers,
      subscribedUsers,
      recentUsers,
      subscriptionRate: totalUsers > 0 ? ((subscribedUsers / totalUsers) * 100).toFixed(1) : 0
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ message: 'Failed to fetch notification statistics' });
  }
});

// Get all subscribed users (for super admin)
router.get('/subscribers', async (req, res) => {
  try {
    const subscribers = await User.find({ notificationsEnabled: true })
      .select('userId lastSeen preferences createdAt')
      .sort({ lastSeen: -1 });
    
    res.json(subscribers);
  } catch (error) {
    console.error('Subscribers error:', error);
    res.status(500).json({ message: 'Failed to fetch subscribers' });
  }
});

// Send manual notification to all subscribers (Super Admin only)
router.post('/send-manual', async (req, res) => {
  try {
    const { title, message, superAdminPassword } = req.body;
    
    // Verify super admin password
    if (superAdminPassword !== 'admin123') {
      return res.status(401).json({ message: 'Invalid super admin credentials' });
    }
    
    if (!title || !message) {
      return res.status(400).json({ message: 'Title and message are required' });
    }
    
    const subscribers = await User.find({ 
      notificationsEnabled: true,
      pushSubscription: { $exists: true }
    });
    
    if (subscribers.length === 0) {
      return res.json({ 
        success: true, 
        message: 'No subscribers to send notifications to',
        sentCount: 0,
        failedCount: 0
      });
    }
    
    const notificationPayload = JSON.stringify({
      title,
      body: message,
      icon: '/web-app-manifest-192x192.png',
      badge: '/favicon-96x96.png',
      tag: 'admin-notification',
      requireInteraction: false,
      actions: [
        {
          action: 'view',
          title: 'View Store'
        }
      ]
    });
    
    let sentCount = 0;
    let failedCount = 0;
    
    const sendPromises = subscribers.map(async (user) => {
      try {
        await webpush.sendNotification(user.pushSubscription, notificationPayload);
        sentCount++;
      } catch (error) {
        console.error(`Failed to send notification to user ${user.userId}:`, error);
        failedCount++;
        
        // If subscription is no longer valid, disable notifications for this user
        if (error.statusCode === 410 || error.statusCode === 404) {
          user.notificationsEnabled = false;
          user.pushSubscription = undefined;
          await user.save();
        }
      }
    });
    
    await Promise.all(sendPromises);
    
    res.json({
      success: true,
      message: `Notification sent successfully to ${sentCount} users`,
      sentCount,
      failedCount,
      totalSubscribers: subscribers.length
    });
    
  } catch (error) {
    console.error('Manual notification error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send notifications' 
    });
  }
});

// Send notification to specific user (Super Admin only)
router.post('/send-to-user', async (req, res) => {
  try {
    const { userId, title, message, superAdminPassword } = req.body;
    
    // Verify super admin password
    if (superAdminPassword !== 'admin123') {
      return res.status(401).json({ message: 'Invalid super admin credentials' });
    }
    
    if (!userId || !title || !message) {
      return res.status(400).json({ message: 'User ID, title and message are required' });
    }
    
    const user = await User.findOne({ 
      userId,
      notificationsEnabled: true,
      pushSubscription: { $exists: true }
    });
    
    if (!user) {
      return res.status(404).json({ 
        message: 'User not found or notifications not enabled' 
      });
    }
    
    const notificationPayload = JSON.stringify({
      title,
      body: message,
      icon: '/web-app-manifest-192x192.png',
      badge: '/favicon-96x96.png',
      tag: 'admin-user-notification'
    });
    
    try {
      await webpush.sendNotification(user.pushSubscription, notificationPayload);
      
      res.json({
        success: true,
        message: `Notification sent successfully to user ${userId}`
      });
    } catch (error) {
      console.error(`Failed to send notification to user ${userId}:`, error);
      
      // If subscription is no longer valid, disable notifications for this user
      if (error.statusCode === 410 || error.statusCode === 404) {
        user.notificationsEnabled = false;
        user.pushSubscription = undefined;
        await user.save();
        
        return res.status(400).json({ 
          message: 'User subscription is no longer valid' 
        });
      }
      
      res.status(500).json({ 
        success: false, 
        message: 'Failed to send notification' 
      });
    }
    
  } catch (error) {
    console.error('Send to user error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send notification' 
    });
  }
});

module.exports = router;
