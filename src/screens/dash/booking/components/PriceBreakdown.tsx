import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { scale, moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../../../constants/colors';

interface PriceRowProps {
  label: string | React.ReactNode;
  value: string;
  isBold?: boolean;
  color?: string;
}

const PriceRow = React.memo(({ label, value, isBold, color }: PriceRowProps) => (
  <View style={styles.priceRow}>
    <Text style={[styles.priceLabel, isBold && styles.boldText]}>{label}</Text>
    <Text style={[styles.priceValue, isBold && styles.boldText, color ? { color } : {}]}>{value}</Text>
  </View>
));

interface PriceBreakdownProps {
  nights: number;
  pricePerNight: number;
  discount?: number;
  taxes: number;
  total: number;
  onShowDetails?: () => void;
  isInline?: boolean;
}

const PriceBreakdown = ({
  nights,
  pricePerNight,
  discount,
  taxes,
  total,
  onShowDetails,
  isInline = false
}: PriceBreakdownProps) => {
  return (
    <View style={[styles.container, isInline && styles.inlineContainer]}>
      {isInline && <Text style={styles.sectionTitle}>Price details</Text>}
      
      <PriceRow 
        label={`${nights} nights x ₹${pricePerNight.toLocaleString()}`} 
        value={`₹${(nights * pricePerNight).toLocaleString()}`} 
      />
      
      {discount && (
        <PriceRow 
          label="Weekly stay discount" 
          value={`-₹${discount.toLocaleString()}`} 
          color={COLORS.SUCCESS_TEXT} 
        />
      )}
      
      <PriceRow label="Taxes" value={`₹${taxes.toLocaleString()}`} />
      
      <View style={styles.divider} />
      
      <PriceRow 
        label={
          <Text style={styles.totalLabel}>
            Total <Text style={styles.underline}>INR</Text>
          </Text>
        } 
        value={`₹${total.toLocaleString()}`} 
        isBold 
      />
      
      <TouchableOpacity style={styles.breakdownBtn} onPress={onShowDetails}>
        <Text style={styles.breakdownText}>Price breakdown</Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(PriceBreakdown);

const styles = StyleSheet.create({
  container: {
    paddingTop: scale(10),
  },
  inlineContainer: {
    marginTop: scale(30),
    paddingTop: scale(20),
    borderTopWidth: 1,
    borderTopColor: COLORS.SECTION_DIVIDER,
  },
  sectionTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    color: COLORS.BLACK,
    marginBottom: scale(15),
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scale(8),
  },
  priceLabel: {
    fontSize: scale(13),
    color: COLORS.BLACK,
  },
  priceValue: {
    fontSize: scale(13),
    color: COLORS.BLACK,
  },
  boldText: {
    fontWeight: '600',
    fontSize: scale(14),
  },
  totalLabel: {
    fontSize: scale(14),
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.SECTION_DIVIDER,
    marginVertical: scale(15),
  },
  breakdownBtn: {
    marginTop: scale(10),
    marginBottom: scale(15),
  },
  breakdownText: {
    fontSize: scale(13),
    fontWeight: '600',
    color: COLORS.BLACK,
    textDecorationLine: 'underline',
  },
});
