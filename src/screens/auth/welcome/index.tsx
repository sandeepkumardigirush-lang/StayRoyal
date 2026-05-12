import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { COLORS } from '../../../constants/colors';
import { IMAGES } from '../../../constants/images';

const { width } = Dimensions.get('window');

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SliderButton from '../../../components/slideButton/SliderButton';
import { RootStackParamList } from '../../../navigation/types';

const WelcomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSwipeComplete = () => {
    navigation.navigate('MainTabs');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={IMAGES.bg_image}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <View style={styles.safeArea}>
          <View style={styles.topSection}>
            <Text style={styles.title}>Find your dream home easily</Text>
            <Text style={styles.description}>
              Now you can find your dream house easily and quickly at a low
              price
            </Text>
          </View>

          <View style={styles.bottomSection}>
            <SliderButton onSwipeComplete={handleSwipeComplete} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1014',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  safeArea: {
    flex: 1,
  },
  topSection: {
    paddingHorizontal: scale(20),
    paddingTop: '20%',
  },
  title: {
    fontSize: moderateScale(35),
    fontWeight: 'bold',
    color: COLORS.WHITE,
    lineHeight: 48,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  description: {
    fontSize: moderateScale(16),
    color: COLORS.WHITE,
    marginTop: scale(10),
    opacity: 0.8,
    lineHeight: 24,
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
    paddingBottom: scale(40),
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(15),
    borderRadius: scale(12),
    shadowColor: COLORS.PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: COLORS.WHITE,
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginRight: scale(10),
  },
  icon: {
    marginLeft: scale(5),
  },
});
