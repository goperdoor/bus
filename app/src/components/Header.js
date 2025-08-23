import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
  return (
    <LinearGradient
      colors={['#485eff', '#a955ff']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.header}
    >
      <SafeAreaView>
        <View style={styles.headerContent}>
          <View style={styles.logo}>
            <View style={styles.logoRow}>
              <Ionicons name="bus" size={28} color="white" style={styles.logoIcon} />
              <Text style={styles.logoTitle}>GoPerdoor</Text>
            </View>
            <Text style={styles.logoSubtitle}>ಇಲ್ಲಿದೆ ಬಸ್ ಟೈಮ್ !</Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  logoIcon: {
    marginRight: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  logoTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  logoSubtitle: {
    fontSize: 13,
    color: 'white',
    opacity: 0.95,
    fontWeight: '500',
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 2,
  },
});

export default Header;
