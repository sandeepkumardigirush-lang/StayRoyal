import React, { memo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { COLORS } from '../../../../constants/colors';
import CommonButton from '../../../../components/commonButton';
import { useNavigation } from '@react-navigation/native';

interface Props {
  price: number;
  bottomInset: number;
}

const VillaDetailFooter = memo(({ price, bottomInset }: Props) => {
  const navigation = useNavigation<any>();

  return (
    <View style={[styles.footer, { paddingBottom: Math.max(bottomInset, scale(15)) }]}>
      <View>
        <Text style={styles.footerPrice}>
          ₹{price.toLocaleString()}{' '}
          <Text style={styles.footerNight}>night</Text>
        </Text>
        <Text style={styles.footerDates}>14–21 May</Text>
      </View>
      <CommonButton
        title="Reserve"
        onPress={() => navigation.navigate('BookingReview')}
        width={'40%'}
      />
    </View>
  );
});

export default VillaDetailFooter;

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.WHITE,
    borderTopWidth: 1,
    borderTopColor: COLORS.SECTION_DIVIDER,
    paddingHorizontal: scale(24),
    paddingTop: scale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerPrice: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  footerNight: {
    fontWeight: 'normal',
    fontSize: moderateScale(16),
  },
  footerDates: {
    fontSize: moderateScale(12),
    fontWeight: '400',
    color: COLORS.BLACK,
    textAlign: 'center',
    marginTop: scale(2),
  },
  reserveBtn: {
    backgroundColor: COLORS.BRAND_PINK,
    paddingHorizontal: scale(32),
    paddingVertical: scale(14),
    borderRadius: scale(8),
  },
  reserveBtnText: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
});
