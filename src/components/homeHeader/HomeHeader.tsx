import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { Bell, Search } from 'lucide-react-native';
import { COLORS } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface HomeHeaderProps {
  user: { name: string } | null;
  onNotificationPress?: () => void;
}

const HomeHeader = ({ user, onNotificationPress }: HomeHeaderProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning 👋';
    if (hour < 17) return 'Good Afternoon 👋';
    if (hour < 21) return 'Good Evening 👋';
    return 'Good Night 👋';
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerTop}>
        <View style={styles.userInfo}>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          {user && <Text style={styles.name}>{user.name}</Text>}
        </View>
        <TouchableOpacity style={styles.notificationBtn} onPress={onNotificationPress}>
          <Bell color={COLORS.BLACK} size={scale(20)} />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.searchBar}
        onPress={() => navigation.navigate('Search')}
      >
        <View style={styles.searchIconWrapper}>
          <Search color={COLORS.BLACK} size={scale(18)} />
        </View>
        <View style={styles.searchTextWrapper}>
          <Text style={styles.searchTitle}>Where to?</Text>
          <Text style={styles.searchSubtitle}>Anywhere • Any week • Add guests</Text>
        </View>

      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: scale(20),
    paddingBottom: scale(15),
    paddingTop: scale(10),
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(20),
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: moderateScale(13),
    color: COLORS.GRAY,
    marginBottom: scale(2),
  },
  name: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  notificationBtn: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E2E2',
  },
  notificationDot: {
    position: 'absolute',
    top: scale(10),
    right: scale(10),
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: '#E51D4F',
    borderWidth: 1.5,
    borderColor: COLORS.WHITE,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: scale(30),
    paddingHorizontal: scale(15),
    paddingVertical: scale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  searchIconWrapper: {
    marginRight: scale(15),
  },
  searchTextWrapper: {
    flex: 1,
  },
  searchTitle: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  searchSubtitle: {
    fontSize: moderateScale(12),
    color: COLORS.GRAY,
  },
  filterBtn: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: '#E2E2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(HomeHeader);
