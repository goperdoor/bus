// Simple Push Notification Service

class PushNotificationService {
  constructor() {
    this.isSupported = 'Notification' in window;
    this.permission = this.isSupported ? Notification.permission : 'denied';
  }

  async requestPermission() {
    if (!this.isSupported) {
      console.log('Push notifications not supported');
      return false;
    }

    if (this.permission === 'granted') {
      return true;
    }

    const permission = await Notification.requestPermission();
    this.permission = permission;
    return permission === 'granted';
  }

  showNotification(title, options = {}) {
    if (!this.isSupported || this.permission !== 'granted') {
      console.log('Cannot show notification: permission not granted');
      return;
    }

    const defaultOptions = {
      icon: '/favicon.ico',
      badge: '/favicon-96x96.png',
      tag: 'goperdoor-store',
      requireInteraction: false,
      ...options
    };

    return new Notification(title, defaultOptions);
  }

  // Store-specific notifications
  notifyStoreUpdate(storeName, message) {
    return this.showNotification(`${storeName} Update`, {
      body: message,
      icon: '/web-app-manifest-192x192.png',
      tag: `store-${storeName.toLowerCase().replace(/\s+/g, '-')}`
    });
  }

  notifyNewProduct(storeName, productName) {
    return this.showNotification(`New Product at ${storeName}!`, {
      body: `Check out "${productName}" - now available!`,
      icon: '/web-app-manifest-192x192.png',
      tag: 'new-product'
    });
  }

  notifyStoreOpen(storeName) {
    return this.showNotification(`${storeName} is now Open!`, {
      body: 'Visit now for the best products and services.',
      icon: '/web-app-manifest-192x192.png',
      tag: 'store-open'
    });
  }

  // Check if notifications are enabled
  isEnabled() {
    return this.isSupported && this.permission === 'granted';
  }

  // Get permission status
  getPermissionStatus() {
    return this.permission;
  }
}

// Export singleton instance
const pushNotificationService = new PushNotificationService();
export default pushNotificationService;
