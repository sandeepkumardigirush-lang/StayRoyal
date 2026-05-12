import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import { X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform, PermissionsAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale } from 'react-native-size-matters';
import CommonButton from '../../../components/commonButton';
import { COLORS } from '../../../constants/colors';

import WhenSection from './components/WhenSection';
import WhereSection from './components/WhereSection';
import WhoSection from './components/WhoSection';
import { RootStackParamList } from '../../../navigation/types';
import { NavigationProp } from '@react-navigation/native';

const SearchScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [activeStep, setActiveStep] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [markedDates, setMarkedDates] = useState<any>({});
  const [guests, setGuests] = useState({ adults: 0, children: 0, infants: 0, pets: 0 });

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
    } else {
      try {
        const hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (hasPermission) {
          console.log('Location permission already granted');
          return;
        }

        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'StayRoyal needs access to your location to find nearby villas.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  // Geo Search Logic
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.length > 2) {
        handleSearch(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Geo Search Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const onDayPress = (day: any) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day.dateString);
      setEndDate(null);
      setMarkedDates({
        [day.dateString]: { startingDay: true, color: COLORS.BLACK, textColor: COLORS.WHITE }
      });
    } else {
      let start = new Date(startDate);
      let end = new Date(day.dateString);
      if (end < start) {
        setStartDate(day.dateString);
        setMarkedDates({
          [day.dateString]: { startingDay: true, color: COLORS.BLACK, textColor: COLORS.WHITE }
        });
      } else {
        setEndDate(day.dateString);
        setMarkedDates(getDatesInRange(startDate, day.dateString));
      }
    }
  };

  const getDatesInRange = (startStr: string, endStr: string) => {
    const dates: any = {};
    const start = new Date(startStr);
    const end = new Date(endStr);
    let current = new Date(start);
    while (current <= end) {
      const dateStr = current.toISOString().split('T')[0];
      if (dateStr === startStr) {
        dates[dateStr] = { startingDay: true, color: COLORS.BLACK, textColor: COLORS.WHITE };
      } else if (dateStr === endStr) {
        dates[dateStr] = { endingDay: true, color: COLORS.BLACK, textColor: COLORS.WHITE };
      } else {
        dates[dateStr] = { color: 'rgba(0,0,0,0.08)', textColor: COLORS.BLACK };
      }
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  const handleNext = () => {
    if (!selectedLocation) {
      Geolocation.getCurrentPosition(
        (position) => {
          navigation.navigate('SearchResults', {
            location: 'Current Location',
            guests: guests,
            startDate,
            endDate,
            coords: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          });
        },
        (error) => {
          console.log('Location error:', error);
          // Fallback if location fails
          navigation.navigate('SearchResults', {
            location: 'Los Angeles',
            guests,
            startDate,
            endDate
          });
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } else {
      navigation.navigate('SearchResults', {
        location: selectedLocation,
        guests,
        startDate,
        endDate
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
          <X size={scale(20)} color={COLORS.BLACK} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <WhereSection
          isActive={activeStep === 0}
          searchQuery={searchQuery}
          onSearchChange={(text) => {
            setSearchQuery(text);
            if (text === '') setSelectedLocation(null);
          }}
          loading={loading}
          searchResults={searchResults}
          selectedLocation={selectedLocation}
          onPress={() => setActiveStep(0)}
          onResultPress={(item) => {
            setSelectedLocation(item.display_name);
            setSearchQuery(item.display_name);
            setSearchResults([]);
            setActiveStep(1);
          }}
        />

        <WhenSection
          isActive={activeStep === 1}
          startDate={startDate}
          endDate={endDate}
          markedDates={markedDates}
          onDayPress={onDayPress}
          onPress={() => setActiveStep(1)}
        />

        <WhoSection
          isActive={activeStep === 2}
          guests={guests}
          onPress={() => setActiveStep(2)}
          onUpdateGuests={(type, val) => setGuests(prev => ({ ...prev, [type]: val }))}
        />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => {
          setSearchQuery('');
          setSelectedLocation(null);
          setStartDate(null);
          setEndDate(null);
          setMarkedDates({});
          setGuests({ adults: 0, children: 0, infants: 0, pets: 0 });
          setActiveStep(0);
        }}>
          <Text style={styles.clearAll}>Reset</Text>
        </TouchableOpacity>
        <CommonButton
          onPress={() => {
            if (activeStep < 2) {
              setActiveStep(activeStep + 1);
            } else {
              handleNext();
            }
          }}
          title={activeStep === 2 ? "Search" : "Next"}
          width={'40%'}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  header: {
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
  },
  closeBtn: {
    width: scale(35),
    height: scale(35),
    borderRadius: scale(20),
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.BORDER_GRAY,
  },
  scrollContent: {
    padding: scale(15),
  },
  footer: {
    backgroundColor: COLORS.WHITE,
    padding: scale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clearAll: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: COLORS.BLACK,
  },
});