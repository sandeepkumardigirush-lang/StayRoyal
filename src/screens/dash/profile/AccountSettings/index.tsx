import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  Switch,
  Alert,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Bell,
  ChevronRight,
  Hand,
  KeyRound,
  LogOut,
  Shield,
  User,
  UserX,
} from 'lucide-react-native';
import { scale, moderateScale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { COLORS } from '../../../../constants/colors';
import { logout } from '../../../../redux/userSlice';
import { RootStackParamList } from '../../../../navigation/types';
import SettingHeader from '../../../../components/headers/SettingHeader';

const AccountSettings = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const menuItems = [
    { id: 'personal', title: 'Personal information', icon: <User color={COLORS.BLACK} size={scale(24)} strokeWidth={1.2} /> },
    { id: 'security', title: 'Login & security', icon: <Shield color={COLORS.BLACK} size={scale(24)} strokeWidth={1.2} /> },
    { id: 'privacy', title: 'Privacy', icon: <Hand color={COLORS.BLACK} size={scale(24)} strokeWidth={1.2} /> },
    { id: 'notifications', title: 'Notifications', icon: <Bell color={COLORS.BLACK} size={scale(24)} strokeWidth={1.2} /> },
    { id: 'reset_password', title: 'Reset Password', icon: <KeyRound color={COLORS.BLACK} size={scale(24)} strokeWidth={1.2} /> },
    { id: 'logout', title: 'Logout', icon: <LogOut color={COLORS.BLACK} size={scale(24)} strokeWidth={1.2} /> },
    { id: 'delete_account', title: 'Delete Account', icon: <UserX color={COLORS.BLACK} size={scale(24)} strokeWidth={1.2} /> },
  ];

  const handlePress = (id: string) => {
    switch (id) {
      case 'personal': return navigation.navigate('PersonalInfo');
      case 'reset_password': return navigation.navigate('ResetPassword');
      case 'logout': 
        dispatch(logout());
        return navigation.goBack();
      case 'delete_account':
        return Alert.alert('Delete Account', 'Are you sure you want to delete your account? This action cannot be undone.', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive', onPress: () => { dispatch(logout()); navigation.goBack(); } }
        ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SettingHeader onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Account Settings</Text>
        <View style={styles.menuList}>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.id}>
              {item.id === 'logout' && <View style={styles.menuDivider} />}
              <TouchableOpacity 
                style={[styles.menuItem, (index !== menuItems.length - 1 && item.id !== 'notifications' && item.id !== 'reset_password') && styles.menuItemBorder]} 
                activeOpacity={0.6} 
                onPress={() => handlePress(item.id)}
              >
                <View style={styles.menuItemLeft}>
                  <View style={styles.iconContainer}>{item.icon}</View>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                </View>
                {item.id === 'notifications' ? (
                  <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} trackColor={{ false: '#767577', true: COLORS.BLACK }} thumbColor={Platform.OS === 'ios' ? undefined : COLORS.WHITE} />
                ) : (
                  <ChevronRight color="#A0A0A0" size={scale(20)} strokeWidth={1.5} />
                )}
              </TouchableOpacity>
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountSettings;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.WHITE },
  scrollContent: { paddingHorizontal: scale(25), paddingBottom: scale(40) },
  title: { fontSize: moderateScale(28), fontWeight: '600', color: COLORS.BLACK, marginTop: scale(5), marginBottom: scale(10), letterSpacing: -0.5 },
  menuList: { marginTop: scale(5) },
  menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: scale(18) },
  menuItemBorder: { borderBottomWidth: 0.5, borderBottomColor: '#EEEEEE' },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
  iconContainer: { width: scale(32), alignItems: 'flex-start' },
  menuItemTitle: { fontSize: moderateScale(15), color: COLORS.BLACK, fontWeight: '400', marginLeft: scale(10) },
  menuDivider: { height: scale(10), backgroundColor: '#F7F7F7', marginHorizontal: scale(-25), marginVertical: scale(10) },
});
