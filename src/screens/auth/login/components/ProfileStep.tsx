import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { moderateScale, scale } from 'react-native-size-matters';
import { Check } from 'lucide-react-native';
import { COLORS } from '../../../../constants/colors';
import InputField from '../../../../components/inputField';
import CustomButton from '../../../../components/commonButton';
import CommonDatePicker from '../../../../components/commonDatePicker';

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

interface ProfileStepProps {
  authMethod: AuthMethod | null;
  profileForm: ProfileFormState;
  profileErrors: ProfileErrors;
  hasAcceptedTerms: boolean;
  onUpdateField: (key: keyof ProfileFormState, value: string) => void;
  onToggleTerms: () => void;
  onContinue: () => void;
}

const ProfileStep: React.FC<ProfileStepProps> = ({
  authMethod,
  profileForm,
  profileErrors,
  hasAcceptedTerms,
  onUpdateField,
  onToggleTerms,
  onContinue,
}) => {
  const isPhoneRegistration = authMethod === 'PHONE';
  const secondaryPlaceholder = isPhoneRegistration ? 'Email' : 'Phone number';
  const secondaryValue = isPhoneRegistration ? profileForm.email : profileForm.phone;

  return (
    <View style={styles.bodyWrapper}>
      <Text style={styles.title}>Let's create your account</Text>
      <Text style={styles.subtitle}>This information is required to book or host.</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Legal name</Text>
        <View style={styles.stackedInputWrapper}>
          <InputField
            placeholder="First name"
            value={profileForm.firstName}
            onChangeText={value => onUpdateField('firstName', value)}
            error={profileErrors.firstName}
          />
          <InputField
            placeholder="Surname"
            value={profileForm.surname}
            onChangeText={value => onUpdateField('surname', value)}
          />
        </View>
        <Text style={styles.helpText}>
          Make sure it matches the name on your government ID.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Date of birth</Text>
        <CommonDatePicker
          value={profileForm.dob}
          placeholder="Select a date"
          maximumDate={new Date()}
          minimumDate={new Date(1900, 0, 1)}
          onChange={value => onUpdateField('dob', value)}
        />
        {!!profileErrors.dob && <Text style={styles.errorLabel}>{profileErrors.dob}</Text>}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{secondaryPlaceholder}</Text>
        <InputField
          placeholder={secondaryPlaceholder}
          value={secondaryValue}
          keyboardType={isPhoneRegistration ? 'email-address' : 'phone-pad'}
          autoCapitalize="none"
          onChangeText={value => onUpdateField(isPhoneRegistration ? 'email' : 'phone', value)}
          error={isPhoneRegistration ? profileErrors.email : profileErrors.phone}
        />
      </View>

      <TouchableOpacity style={styles.checkboxRow} activeOpacity={0.8} onPress={onToggleTerms}>
        <View style={[styles.checkbox, hasAcceptedTerms && styles.checkboxActive]}>
          {hasAcceptedTerms && <Check size={scale(14)} color={COLORS.WHITE} strokeWidth={3} />}
        </View>
        <Text style={styles.checkboxText}>
          By selecting <Text style={styles.boldText}>Agree and continue</Text>, I agree to StayRoyal's{' '}
          <Text style={styles.link}>Terms of Service</Text>, <Text style={styles.link}>Payments Terms</Text>, and{' '}
          <Text style={styles.link}>Privacy Policy</Text>.
        </Text>
      </TouchableOpacity>
      {!!profileErrors.terms && <Text style={styles.errorLabel}>{profileErrors.terms}</Text>}

      <CustomButton title="Agree and continue" onPress={onContinue} style={styles.primaryAction} />
    </View>
  );
};

export default ProfileStep;

const styles = StyleSheet.create({
  bodyWrapper: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: moderateScale(22),
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
    marginBottom: scale(10),
    textAlign: 'center',
    width: '100%',
  },
  subtitle: {
    fontSize: moderateScale(13),
    color: COLORS.GRAY,
    marginBottom: scale(22),
    textAlign: 'center',
    width: '100%',
  },
  section: {
    width: '100%',
    marginBottom: scale(12),
  },
  sectionTitle: {
    fontSize: moderateScale(13),
    color: COLORS.BLACK,
    fontWeight: '700',
    marginBottom: scale(8),
  },
  stackedInputWrapper: {
    width: '100%',
    borderRadius: scale(12),
    overflow: 'hidden',
  },

  helpText: {
    fontSize: moderateScale(11),
    color: COLORS.GRAY,
    marginTop: scale(4),
    lineHeight: scale(16),
  },
  errorLabel: {
    width: '100%',
    marginTop: scale(8),
    color: COLORS.RED,
    fontSize: moderateScale(12),
  },
  checkboxRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: scale(10),
    marginTop: scale(8),
  },
  checkbox: {
    width: scale(22),
    height: scale(22),
    borderRadius: scale(6),
    borderWidth: 1,
    borderColor: COLORS.GRAY_BORDER,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(1),
  },
  checkboxActive: {
    backgroundColor: COLORS.PURPLE1,
    borderColor: COLORS.BLACK,
  },
  checkboxText: {
    flex: 1,
    fontSize: moderateScale(11),
    color: COLORS.GRAY1,
    lineHeight: scale(16),
  },
  boldText: {
    fontWeight: '700',
    color: COLORS.BLACK,
  },
  link: {
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  primaryAction: {
    marginTop: scale(24),
    width: '100%',
  },
});
