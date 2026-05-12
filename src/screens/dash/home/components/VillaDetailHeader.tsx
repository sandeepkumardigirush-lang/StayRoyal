import React, { memo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ChevronLeft, Share2, Heart } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import { COLORS } from '../../../../constants/colors';
import ImageCarousel from '../../../../components/imageCarousel';

interface Props {
  images: string[];
  screenWidth: number;
  onBack: () => void;
}

const VillaDetailHeader = memo(({ images, screenWidth, onBack }: Props) => (
  <View style={styles.imageContainer}>
    <ImageCarousel
      images={images}
      showDots={false}
      showCounter={true}
      containerWidth={screenWidth}
    />
    <SafeAreaView style={styles.headerButtons} edges={['top']}>
      <TouchableOpacity onPress={onBack} style={styles.circleBtn}>
        <ChevronLeft size={scale(20)} color={COLORS.BLACK} />
      </TouchableOpacity>
      <View style={styles.rightButtons}>
        <TouchableOpacity style={[styles.circleBtn, { marginLeft: scale(12) }]}>
          <Heart size={scale(18)} color={COLORS.BLACK} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  </View>
));

export default VillaDetailHeader;

const styles = StyleSheet.create({
  imageContainer: {
    height: scale(300),
    width: '100%',
  },
  headerButtons: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
  },
  rightButtons: {
    flexDirection: 'row',
  },
  circleBtn: {
    width: scale(35),
    height: scale(35),
    borderRadius: scale(20),
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
