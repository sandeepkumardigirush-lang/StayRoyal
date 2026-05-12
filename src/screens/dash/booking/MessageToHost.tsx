import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../../constants/colors';
import { scale, moderateScale } from 'react-native-size-matters';
import BookingHeader from './components/BookingHeader';
import BookingFooter from './components/BookingFooter';

const MessageToHost = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [message, setMessage] = useState('');

  return (
    <View style={styles.container}>
      <BookingHeader
        insetsTop={insets.top}
        onBack={() => navigation.goBack()}
        onClose={() => navigation.popToTop()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Write a message to the host</Text>
        <Text style={styles.subtitle}>
          Before you can continue, let Deepika know a little about your trip and why their place is a good fit.
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            multiline
            placeholder='Example: "Hi Deepika, my partner and I are going to a friend’s wedding and your place is just down the road."'
            placeholderTextColor={COLORS.GRAY2}
            value={message}
            onChangeText={setMessage}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      <BookingFooter
        bottomInset={insets.bottom}
        onNext={() => navigation.navigate('PaymentReview')}
        totalSteps={3}
        currentStep={2}
      />
    </View>
  );
};

export default MessageToHost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  scrollContent: {
    padding: scale(20),
  },
  title: {
    fontSize: scale(22),
    fontWeight: '600',
    color: COLORS.BLACK,
    marginBottom: scale(10),
  },
  subtitle: {
    fontSize: scale(14),
    color: COLORS.SECONDARY,
    lineHeight: scale(19),
    marginBottom: scale(20),
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: COLORS.GRAY2,
    borderRadius: scale(12),
    padding: scale(15),
    maxHeight: scale(130),
  },
  input: {
    fontSize: scale(13),
    color: COLORS.BLACK,
    height: '100%',
    lineHeight: scale(17),
  },
});
