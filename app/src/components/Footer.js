import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Footer = () => {
  const handleEmailPress = () => {
    Linking.openURL('mailto:goperdoor576124@gmail.com');
  };

  const handleInstagramPress = () => {
    Linking.openURL('https://www.instagram.com/goperdoor?igsh=NzdnNnVpbjJrN3Fh');
  };

  return (
    <View style={styles.footer}>
      <View style={styles.brandSection}>
        <View style={styles.brandHeader}>
          <Ionicons name="bus" size={24} color="#60a5fa" />
          <Text style={styles.brandTitle}>GoPerdoor</Text>
        </View>
        <Text style={styles.brandDescription}>
          Your reliable companion for bus schedules and real-time updates.
          Never miss your bus again with our accurate timing information.
        </Text>
        
        <View style={styles.socialSection}>
          <TouchableOpacity style={styles.socialIcon} onPress={handleEmailPress}>
            <Ionicons name="mail" size={20} color="#e2e8f0" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon} onPress={handleInstagramPress}>
            <Ionicons name="logo-instagram" size={20} color="#e2e8f0" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contactSection}>
        <View style={styles.contactItem}>
          <Ionicons name="location" size={16} color="#cbd5e0" />
          <Text style={styles.contactText}>Perdoor Udupi, Karnataka</Text>
        </View>
        
        <View style={styles.contactItem}>
          <Ionicons name="mail" size={16} color="#cbd5e0" />
          <Text style={styles.contactText}>goperdoor576124@gmail.com</Text>
        </View>

        <View style={styles.contactItem}>
          <Ionicons name="code" size={14} color="#cbd5e0" />
          <Text style={styles.developerText}>Developed by Anvith Shetty & Rohan Shetty</Text>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.copyrightText}>
          © 2024 GoPerdoor. All rights reserved.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#1a202c',
    padding: 30,
    paddingBottom: 20,
  },
  brandSection: {
    marginBottom: 30,
  },
  brandHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#60a5fa',
    marginLeft: 10,
  },
  brandDescription: {
    color: '#a0aec0',
    lineHeight: 20,
    marginBottom: 15,
  },
  socialSection: {
    flexDirection: 'row',
    gap: 15,
  },
  socialIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#2d3748',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactSection: {
    marginBottom: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactText: {
    color: '#cbd5e0',
    marginLeft: 10,
    fontSize: 14,
  },
  developerText: {
    color: '#cbd5e0',
    marginLeft: 10,
    fontSize: 13,
  },
  bottomSection: {
    borderTopWidth: 1,
    borderTopColor: '#2d3748',
    paddingTop: 20,
    alignItems: 'center',
  },
  copyrightText: {
    color: '#a0aec0',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default Footer;
