import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import { moderateScale, scale } from 'react-native-size-matters';
import { COLORS } from '../../../../constants/colors';
import { ICONS, IMAGES } from '../../../../constants/images';
import InputField from '../../../../components/inputField';
import CustomButton from '../../../../components/commonButton';

interface ContactStepProps {
  contactInput: string;
  setContactInput: (val: string) => void;
  error: string | null;
  setError: (val: string | null) => void;
  activeSocial: string | null;
  setActiveSocial: (val: string | null) => void;
  handleContactContinue: () => void;
}

const ContactStep: React.FC<ContactStepProps> = ({
  contactInput,
  setContactInput,
  error,
  setError,
  activeSocial,
  setActiveSocial,
  handleContactContinue,
}) => {
  return (
    <View style={styles.bodyWrapper}>
      <FastImage source={IMAGES.logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Log in or sign up</Text>

      <View style={styles.fullWidth}>
        <InputField
          placeholder="Phone Number or email"
          value={contactInput}
          onChangeText={value => {
            setContactInput(value);
            setError(null);
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          error={error || undefined}
        />
        <CustomButton
          title="Continue"
          onPress={handleContactContinue}
          style={{ marginTop: scale(15) }}
        />
        <Text style={styles.disclosure}>
          We will send a confirmation code by text or email. Message and data rates apply.{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </View>

      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.or}>or</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socials}>
        {['google', 'apple'].map(social => (
          <TouchableOpacity
            key={social}
            style={[
              styles.socialIcon,
              activeSocial === social && styles.active,
            ]}
            onPress={() => setActiveSocial(social)}
          >
            <FastImage
              source={social === 'google' ? ICONS.googleIcon : ICONS.appleIcon}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ContactStep;

const styles = StyleSheet.create({
  bodyWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  logo: {
    width: scale(70),
    height: scale(70),
    marginBottom: scale(15),
  },
  title: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginBottom: scale(10),
    textAlign: 'center',
    width: '100%',
  },
  disclosure: {
    fontSize: moderateScale(11),
    color: COLORS.GRAY,
    marginTop: scale(12),
    lineHeight: moderateScale(16),
  },
  link: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: scale(25),
    width: '100%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.BORDER,
  },
  or: {
    paddingHorizontal: scale(15),
    color: COLORS.GRAY,
    fontSize: moderateScale(14),
  },
  socials: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  socialIcon: {
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    padding: scale(15),
    borderRadius: scale(12),
    marginHorizontal: scale(10),
    alignItems: 'center',
  },
  active: {
    borderColor: COLORS.DARKGRAY,
    borderWidth: 1,
  },
  icon: {
    height: scale(20),
    width: scale(20),
  },
});
