import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { X, ArrowLeft } from 'lucide-react-native';
import { scale, moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../constants/colors';

interface SettingHeaderProps {
  title?: string;
  onBack: () => void;
  type?: 'close' | 'back';
}

const SettingHeader: React.FC<SettingHeaderProps> = ({ 
  title, 
  onBack, 
  type = 'close' 
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
        {type === 'close' ? (
          <X size={scale(17)} color={COLORS.BLACK} />
        ) : (
          <ArrowLeft size={scale(20)} color={COLORS.BLACK} />
        )}
      </TouchableOpacity>
      {title && <Text style={styles.headerTitle}>{title}</Text>}
      <View style={{ width: scale(30) }} />
    </View>
  );
};

export default SettingHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
    paddingVertical: scale(10),
  },
  backButton: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    borderWidth: 1,
    borderColor: COLORS.BORDER_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: COLORS.BLACK,
  },
});
