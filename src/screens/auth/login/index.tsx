import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetScrollView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { scale } from 'react-native-size-matters';
import { COLORS } from '../../../constants/colors';
import { ArrowLeft, X } from 'lucide-react-native';
import ContactStep from './components/ContactStep';
import OtpStep from './components/OtpStep';
import ProfileStep from './components/ProfileStep';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/userSlice';

type AuthStep = 'CONTACT' | 'OTP' | 'PROFILE';
type AuthMethod = 'PHONE' | 'EMAIL';

type ProfileFormState = {
  firstName: string;
  surname: string;
  dob: string;
  email: string;
  phone: string;
};

type ProfileErrors = Partial<
  Record<'firstName' | 'dob' | 'email' | 'phone' | 'terms', string>
>;

const OTP_LENGTH = 6;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9]{8,15}$/;

const LoginBottomSheet = forwardRef<BottomSheetModal>((_props, ref) => {
  const dispatch = useDispatch();
  const [contactInput, setContactInput] = useState('');
  const [activeSocial, setActiveSocial] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [authStep, setAuthStep] = useState<AuthStep>('CONTACT');
  const [authMethod, setAuthMethod] = useState<AuthMethod | null>(null);
  const [otpCode, setOtpCode] = useState('');
  const [profileErrors, setProfileErrors] = useState<ProfileErrors>({});
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [profileForm, setProfileForm] = useState<ProfileFormState>({
    firstName: '',
    surname: '',
    dob: '',
    email: '',
    phone: '',
  });

  const maskedContactValue = useMemo(() => {
    if (authMethod === 'EMAIL') {
      const [name = '', domain = ''] = contactInput.split('@');
      const safeName = name.length > 2 ? `${name[0]}***${name[name.length - 1]}` : '***';
      return `${safeName}@${domain}`;
    }

    const visibleDigits = contactInput.slice(-3);
    return `+91 ${'*'.repeat(Math.max(0, contactInput.length - 3))}${visibleDigits}`;
  }, [authMethod, contactInput]);

  const handleContactContinue = () => {
    const trimmedValue = contactInput.trim();
    const normalizedPhone = trimmedValue.replace(/\D/g, '');

    if (EMAIL_REGEX.test(trimmedValue)) {
      setAuthMethod('EMAIL');
      setAuthStep('OTP');
      setError(null);
      return;
    }

    if (PHONE_REGEX.test(normalizedPhone)) {
      setAuthMethod('PHONE');
      setContactInput(normalizedPhone);
      setAuthStep('OTP');
      setError(null);
      return;
    }

    setError('Please enter a valid phone number or email');
  };

  const handleOtpContinue = () => {
    if (otpCode.length !== OTP_LENGTH) {
      setError(`Enter ${OTP_LENGTH}-digit verification code`);
      return;
    }

    setError(null);
    setAuthStep('PROFILE');
  };

  const updateProfileField = (key: keyof ProfileFormState, value: string) => {
    setProfileForm(prev => ({ ...prev, [key]: value }));
    if (key === 'firstName' || key === 'dob' || key === 'email' || key === 'phone') {
      setProfileErrors(prev => ({ ...prev, [key]: undefined }));
    }
  };

  const toggleTerms = () => {
    setHasAcceptedTerms(prev => !prev);
    setProfileErrors(prev => ({ ...prev, terms: undefined }));
  };

  const handleProfileContinue = () => {
    const nextErrors: ProfileErrors = {};
    const isPhoneRegistration = authMethod === 'PHONE';
    const secondaryFieldValue = isPhoneRegistration ? profileForm.email.trim() : profileForm.phone.trim();

    if (!profileForm.firstName.trim()) {
      nextErrors.firstName = 'First name is required';
    }

    if (!profileForm.dob.trim()) {
      nextErrors.dob = 'Date of birth is required';
    }

    if (isPhoneRegistration) {
      if (!secondaryFieldValue) {
        nextErrors.email = 'Email is required';
      } else if (!EMAIL_REGEX.test(secondaryFieldValue)) {
        nextErrors.email = 'Please enter a valid email address';
      }
    } else {
      const normalizedPhone = secondaryFieldValue.replace(/\D/g, '');
      if (!secondaryFieldValue) {
        nextErrors.phone = 'Phone number is required';
      } else if (!PHONE_REGEX.test(normalizedPhone)) {
        nextErrors.phone = 'Please enter a valid phone number';
      }
    }

    if (!hasAcceptedTerms) {
      nextErrors.terms = 'Please accept terms to continue';
    }

    if (Object.keys(nextErrors).length > 0) {
      setProfileErrors(nextErrors);
      return;
    }

    setProfileErrors({});

    // Store user info in Redux
    dispatch(login({
      firstName: profileForm.firstName,
      lastName: profileForm.surname,
      email: authMethod === 'EMAIL' ? contactInput : profileForm.email,
      phoneNumber: authMethod === 'PHONE' ? contactInput : profileForm.phone,
      dob: profileForm.dob
    }));

    if (ref && 'current' in ref) {
      ref.current?.dismiss();
    }
    setAuthStep('CONTACT');
    setAuthMethod(null);
    setOtpCode('');
    setContactInput('');
    setProfileErrors({});
    setHasAcceptedTerms(false);
    setProfileForm({
      firstName: '',
      surname: '',
      dob: '',
      email: '',
      phone: '',
    });
    setError(null);
  };

  const handleBack = () => {
    setError(null);
    if (authStep === 'PROFILE') {
      setAuthStep('OTP');
      return;
    }
    if (authStep === 'OTP') {
      setAuthStep('CONTACT');
      return;
    }
    if (ref && 'current' in ref) {
      ref.current?.dismiss();
    }
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={['85%']}
      enableDynamicSizing={false}
      enablePanDownToClose={true}
      handleComponent={null}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.bottomSheetBackground}
    >
      <BottomSheetScrollView contentContainerStyle={styles.scrollContent}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.main}
        >
          <View style={styles.headerActions}>
            {authStep !== 'CONTACT' ? (
              <TouchableOpacity style={styles.navBtn} onPress={handleBack}>
                <ArrowLeft color={COLORS.BLACK} size={scale(20)} strokeWidth={2.3} />
              </TouchableOpacity>
            ) : (
              <View style={styles.navBtnPlaceholder} />
            )}
            <TouchableOpacity
              style={styles.navBtn}
              onPress={() => ref && 'current' in ref && ref.current?.dismiss()}
            >
              <X color={COLORS.BLACK} size={scale(20)} strokeWidth={2.5} />
            </TouchableOpacity>
          </View>

          {authStep === 'CONTACT' && (
            <ContactStep
              contactInput={contactInput}
              setContactInput={setContactInput}
              error={error}
              setError={setError}
              activeSocial={activeSocial}
              setActiveSocial={setActiveSocial}
              handleContactContinue={handleContactContinue}
            />
          )}
          {authStep === 'OTP' && (
            <OtpStep
              otpCode={otpCode}
              setOtpCode={setOtpCode}
              error={error}
              setError={setError}
              maskedContactValue={maskedContactValue}
              otpLength={OTP_LENGTH}
              onContinue={handleOtpContinue}
            />
          )}
          {authStep === 'PROFILE' && (
            <ProfileStep
              authMethod={authMethod}
              profileForm={profileForm}
              profileErrors={profileErrors}
              hasAcceptedTerms={hasAcceptedTerms}
              onUpdateField={updateProfileField}
              onToggleTerms={toggleTerms}
              onContinue={handleProfileContinue}
            />
          )}
        </KeyboardAvoidingView>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

export default LoginBottomSheet;

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 25,
  },
  scrollContent: {
    flexGrow: 1,
  },
  main: {
    flex: 1,
    paddingHorizontal: scale(30),
    paddingVertical: scale(20),
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  navBtn: {
    padding: scale(5),
  },
  navBtnPlaceholder: {
    width: scale(30),
  },
});
