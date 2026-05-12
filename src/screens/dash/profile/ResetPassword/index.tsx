import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Phone, KeyRound } from 'lucide-react-native';
import { scale, moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../../../constants/colors';
import InputField from '../../../../components/inputField';
import CustomButton from '../../../../components/commonButton';
import SettingHeader from '../../../../components/headers/SettingHeader';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { RootStackParamList } from '../../../../navigation/types';

type Step = 'CHANGE_PASSWORD' | 'OTP_METHOD' | 'OTP_VERIFY' | 'RESET_PASSWORD' | 'SUCCESS';

const ResetPassword = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { userInfo } = useSelector((state: RootState) => state.user);

  const [step, setStep] = useState<Step>('CHANGE_PASSWORD');
  const [otpMethod, setOtpMethod] = useState<'EMAIL' | 'PHONE' | null>(null);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleBack = () => {
    setError(null);
    if (step === 'CHANGE_PASSWORD') {
      navigation.goBack();
    } else if (step === 'OTP_METHOD') {
      setStep('CHANGE_PASSWORD');
    } else if (step === 'OTP_VERIFY') {
      setStep('OTP_METHOD');
    } else if (step === 'RESET_PASSWORD') {
      setStep('OTP_VERIFY');
    } else if (step === 'SUCCESS') {
      navigation.goBack();
    }
  };

  const validatePasswords = () => {
    if (!newPassword) {
      setError('Please enter a new password');
      return false;
    }
    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    setError(null);
    return true;
  };

  const handleUpdate = () => {
    if (validatePasswords()) setStep('SUCCESS');
  };

  const renderContent = () => {
    switch (step) {
      case 'CHANGE_PASSWORD':
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.title}>Update Password</Text>
            <Text style={styles.subtitle}>Enter your current password and set a new one to update your account.</Text>

            <InputField placeholder="Old Password" value={oldPassword} onChangeText={(t) => { setOldPassword(t); setError(null); }} secureTextEntry />
            <InputField placeholder="New Password" value={newPassword} onChangeText={(t) => { setNewPassword(t); setError(null); }} secureTextEntry />
            <InputField placeholder="Confirm New Password" value={confirmPassword} onChangeText={(t) => { setConfirmPassword(t); setError(null); }} secureTextEntry />

            {error && <Text style={styles.errorText}>{error}</Text>}

            <TouchableOpacity style={styles.forgotBtn} onPress={() => setStep('OTP_METHOD')}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>

            <CustomButton title="Update Password" onPress={handleUpdate} style={styles.actionBtn} disabled={!oldPassword} />
          </View>
        );

      case 'OTP_METHOD':
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.title}>Verification Method</Text>
            <Text style={styles.subtitle}>Where should we send the 6-digit verification code?</Text>

            <MethodCard icon={<Mail size={scale(20)} color={COLORS.BLACK} />} title="Email" desc={userInfo?.email || 'r***p@gmail.com'} onPress={() => { setOtpMethod('EMAIL'); setStep('OTP_VERIFY'); }} />
            <MethodCard icon={<Phone size={scale(20)} color={COLORS.BLACK} />} title="Phone number" desc={`+91 ${userInfo?.phone || '91*** *6533'}`} onPress={() => { setOtpMethod('PHONE'); setStep('OTP_VERIFY'); }} />
          </View>
        );

      case 'OTP_VERIFY':
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.title}>Enter Code</Text>
            <Text style={styles.subtitle}>A 6-digit code has been sent to your {otpMethod === 'EMAIL' ? 'email' : 'phone'}.</Text>

            <InputField placeholder="6-digit code" value={otpCode} onChangeText={setOtpCode} keyboardType="number-pad" maxLength={6} />
            <CustomButton title="Verify Code" onPress={() => setStep('RESET_PASSWORD')} style={styles.actionBtn} disabled={otpCode.length !== 6} />
            <TouchableOpacity style={styles.resendBtn}><Text style={styles.resendText}>Didn't receive code? <Text style={styles.linkText}>Resend</Text></Text></TouchableOpacity>
          </View>
        );

      case 'RESET_PASSWORD':
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.title}>Set New Password</Text>
            <Text style={styles.subtitle}>Verification successful. Please set your new secure password.</Text>

            <InputField placeholder="New Password" value={newPassword} onChangeText={(t) => { setNewPassword(t); setError(null); }} secureTextEntry />
            <InputField placeholder="Confirm New Password" value={confirmPassword} onChangeText={(t) => { setConfirmPassword(t); setError(null); }} secureTextEntry />
            {error && <Text style={styles.errorText}>{error}</Text>}
            <CustomButton title="Reset Password" onPress={handleUpdate} style={styles.actionBtn} />
          </View>
        );

      case 'SUCCESS':
        return (
          <View style={[styles.stepContainer, styles.centerContent]}>
            <View style={styles.successCircle}><KeyRound size={scale(40)} color={COLORS.WHITE} /></View>
            <Text style={styles.successTitle}>Password Updated!</Text>
            <Text style={styles.successDesc}>Your password has been successfully updated. Please use your new password for future logins.</Text>
            <CustomButton title="Back to Settings" onPress={() => navigation.goBack()} style={{ width: '100%', marginTop: scale(30) }} />
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {step !== 'SUCCESS' && <SettingHeader title="Reset Password" onBack={handleBack} />}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

const MethodCard = ({ icon, title, desc, onPress }: any) => (
  <TouchableOpacity style={styles.methodCard} onPress={onPress}>
    <View style={styles.methodLeft}>
      <View style={styles.iconCircle}>{icon}</View>
      <View>
        <Text style={styles.methodTitle}>{title}</Text>
        <Text style={styles.methodDesc}>{desc}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default ResetPassword;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.WHITE },
  scrollContent: { flexGrow: 1, paddingHorizontal: scale(25), paddingBottom: scale(40) },
  stepContainer: { marginTop: scale(20) },
  centerContent: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  title: { fontSize: moderateScale(26), fontWeight: '600', color: COLORS.BLACK, marginBottom: scale(8) },
  subtitle: { fontSize: moderateScale(14), color: COLORS.SECONDARY, lineHeight: scale(20), marginBottom: scale(30) },
  forgotBtn: { alignSelf: 'flex-start', marginTop: scale(5), marginBottom: scale(20) },
  forgotText: { fontSize: moderateScale(14), color: COLORS.BLACK, fontWeight: '600', textDecorationLine: 'underline' },
  errorText: { color: COLORS.RED, fontSize: moderateScale(13), marginBottom: scale(15), fontWeight: '500' },
  methodCard: { flexDirection: 'row', alignItems: 'center', padding: scale(18), borderRadius: scale(15), borderWidth: 1, borderColor: COLORS.BORDER_GRAY, marginBottom: scale(15), backgroundColor: COLORS.WHITE },
  methodLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconCircle: { width: scale(40), height: scale(40), borderRadius: scale(20), backgroundColor: '#F7F7F7', justifyContent: 'center', alignItems: 'center', marginRight: scale(15) },
  methodTitle: { fontSize: moderateScale(15), fontWeight: '600', color: COLORS.BLACK, marginBottom: scale(2) },
  methodDesc: { fontSize: moderateScale(12), color: COLORS.SECONDARY },
  actionBtn: { marginTop: scale(10) },
  resendBtn: { marginTop: scale(20), alignItems: 'center' },
  resendText: { fontSize: moderateScale(13), color: COLORS.SECONDARY },
  linkText: { color: COLORS.BLACK, fontWeight: '700', textDecorationLine: 'underline' },
  successCircle: { width: scale(80), height: scale(80), borderRadius: scale(40), backgroundColor: COLORS.BLACK, justifyContent: 'center', alignItems: 'center', marginBottom: scale(25) },
  successTitle: { fontSize: moderateScale(22), fontWeight: '700', color: COLORS.BLACK, marginBottom: scale(10) },
  successDesc: { fontSize: moderateScale(14), color: COLORS.SECONDARY, textAlign: 'center', lineHeight: scale(20), paddingHorizontal: scale(20) },
});
