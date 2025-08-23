import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  FlatList,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { busAPI } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomeScreen = () => {
  const [destination, setDestination] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [buses, setBuses] = useState([]);
  const [allBuses, setAllBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchDestinations();
    fetchAllBuses();
  }, []);

  const fetchDestinations = async () => {
    try {
      const data = await busAPI.getDestinations();
      setDestinations(data);
    } catch (error) {
      console.error('Error fetching destinations:', error);
      Alert.alert('Error', 'Failed to fetch destinations');
    }
  };

  const fetchAllBuses = async () => {
    try {
      const data = await busAPI.getAllBuses();
      setAllBuses(data);
    } catch (error) {
      console.error('Error fetching all buses:', error);
    }
  };

  const handleSearch = async () => {
    if (!destination.trim()) {
      Alert.alert('Error', 'Please enter a destination');
      return;
    }

    setLoading(true);
    setSearched(true);
    setMessage('');

    try {
      const response = await busAPI.searchBuses(destination);
      setBuses(response.buses || []);
      setMessage(response.message || '');
      
      if (!response.buses || response.buses.length === 0) {
        setMessage(response.message || 'No buses found for this destination.');
      } else {
        setMessage('');
      }
    } catch (error) {
      console.error('Error searching buses:', error);
      setMessage('Error searching for buses. Please try again.');
      setBuses([]);
      Alert.alert('Error', 'Failed to search buses');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time) => {
    return moment(time, 'HH:mm').format('h:mm A');
  };

  const getMinutesText = (minutes) => {
    if (minutes < 0) return 'Tomorrow';
    if (minutes < 60) return `${minutes} minutes`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
    return `${hours}ಗಂಟೆ ${remainingMinutes}ನಿಮಿಷ`;
  };

  const renderBusItem = ({ item }) => (
    <View style={styles.busCard}>
      <View style={styles.busHeader}>
        <Text style={styles.busName}>{item.busName}</Text>
        <Text style={styles.busNumber}>{item.busNumber}</Text>
      </View>

      <View style={styles.busDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>ಪೆರ್ಡೂರಿಗೆ ಆಗಮಿಸುವ ಸಮಯ</Text>
          <Text style={styles.detailValue}>{formatTime(item.arrivalTimeToPerdoor)}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>ಪೆರ್ಡೂರಿನಿಂದ ಹೊರಡುವ ಸಮಯ</Text>
          <Text style={styles.detailValue}>{formatTime(item.leavingTimeFromPerdoor)}</Text>
        </View>
      </View>

      <View style={styles.nextDeparture}>
        <Text style={styles.minutesLeft}>
          {getMinutesText(item.minutesUntilDeparture)} ನಂತರ ಪೆರ್ಡೂರಿನಿಂದ ಹೊರಡುತ್ತದೆ
        </Text>
      </View>

      <View style={styles.availabilityContainer}>
        <View style={[
          styles.availabilityBadge, 
          item.availability === 'daily' ? styles.availabilityDaily : styles.availabilityWeekdays
        ]}>
          <Text style={styles.availabilityText}>
            {item.availability === 'daily' ? 'ಪ್ರತಿದಿನ' : 'ಕೆವಲ ವಾರದ ದಿನಗಳಲ್ಲಿ'}
          </Text>
        </View>
      </View>
    </View>
  );


  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={[{ type: 'content' }]}
        renderItem={() => (
          <View style={styles.content}>
            {/* Search Section */}
            <View style={styles.searchSection}>
              <Text style={styles.sectionTitle}>
                <Ionicons name="search" size={24} color="#485eff" /> ಎಲ್ಲಿಗೆ ಹೋಗಬೇಕು?
              </Text>
              
              <View style={styles.searchForm}>
                <Text style={styles.inputLabel}>ಎಲ್ಲಿಗೆ ಹೋಗಬೇಕು? (Where do you want to go?)</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={destination}
                    style={styles.picker}
                    onValueChange={(itemValue) => setDestination(itemValue)}
                  >
                    <Picker.Item label="ಆಯ್ಕೆಮಾಡಿ (Select)" value="" />
                    {destinations.map((dest, index) => (
                      <Picker.Item key={index} label={dest} value={dest} />
                    ))}
                  </Picker>
                </View>
                
                <TouchableOpacity
                  style={[styles.searchButton, !destination && styles.searchButtonDisabled]}
                  onPress={handleSearch}
                  disabled={loading || !destination}
                >
                  {loading ? (
                    <ActivityIndicator color="white" size="small" />
                  ) : (
                    <Text style={styles.searchButtonText}>
                      {loading ? 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...' : 'ಬಸ್ ಹುಡುಕಿ'}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>

              {/* Search Results */}
              {searched && (
                <View style={styles.resultsSection}>
                  <View style={styles.resultsHeader}>
                    <Text style={styles.resultsTitle}>"{destination}" ಫಲಿತಾಂಶಗಳು</Text>
                  </View>

                  {message && buses.length === 0 && (
                    <View style={styles.noResults}>
                      <Text style={styles.messageText}>{message}</Text>
                    </View>
                  )}

                  {buses.length > 0 && (
                    <View style={styles.busResults}>
                      {buses.map((item, index) => (
                        <View key={item._id || index.toString()}>
                          {renderBusItem({ item })}
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
        )}
        ListFooterComponent={() => <Footer />}
        keyExtractor={() => 'content'}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 20,
  },
  searchSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#485eff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 60,
  },
  resultsContainer: {
    marginTop: 15,
  },
  messageText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    fontStyle: 'italic',
    padding: 20,
  },
  busCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  busHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  busNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  scheduleContainer: {
    backgroundColor: '#485eff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  scheduleText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  busDetails: {
    gap: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeText: {
    fontSize: 14,
    color: '#495057',
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  routeText: {
    fontSize: 14,
    color: '#495057',
  },
  busNameCell: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    width: 80,
  },
  timingCell: {
    flex: 1,
  },
  timingText: {
    fontSize: 15,
    color: '#495057',
    fontWeight: '500',
  },
  intervalText: {
    fontSize: 13,
    color: '#6c757d',
    marginTop: 2,
  },
  // New Search Form Styles
  searchForm: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: '#f8f9fa',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  searchButtonDisabled: {
    backgroundColor: '#ccc',
  },
  // New Bus Card Styles
  busName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  detailItem: {
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#485eff',
  },
  nextDeparture: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  minutesLeft: {
    fontSize: 14,
    color: '#2c3e50',
    textAlign: 'center',
  },
  availabilityContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  availabilityBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  availabilityDaily: {
    backgroundColor: '#e3f2fd',
  },
  availabilityWeekdays: {
    backgroundColor: '#fff3e0',
  },
  availabilityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  // Results Styles
  resultsSection: {
    marginTop: 20,
  },
  resultsHeader: {
    marginBottom: 15,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  noResults: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  busResults: {
    marginTop: 10,
  },
});

export default HomeScreen;
