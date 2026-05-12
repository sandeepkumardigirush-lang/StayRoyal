import React, { useState, useRef } from 'react';
import { StyleSheet, View, FlatList, Dimensions, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { scale, moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../constants/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ImageCarouselProps {
  images: string[];
  containerWidth?: number;
  showCounter?: boolean;
  showDots?: boolean;
}

const ImageCarousel = ({
  images,
  containerWidth = SCREEN_WIDTH,
  showCounter = false,
  showDots = true
}: ImageCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const maxDots = 5;
  const totalImages = images.length;

  const getDots = () => {
    if (totalImages <= maxDots) return images;

    let start = Math.max(0, activeIndex - Math.floor(maxDots / 2));
    let end = Math.min(totalImages, start + maxDots);

    if (end === totalImages) {
      start = Math.max(0, end - maxDots);
    }

    return Array.from({ length: maxDots }, (_, i) => i + start);
  };

  return (
    <View style={styles.carouselWrapper}>
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <FastImage
            source={{ uri: item }}
            style={[styles.carouselImage, { width: containerWidth }]}
            resizeMode={FastImage.resizeMode.cover}
          />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        keyExtractor={(item, index) => index.toString()}
        removeClippedSubviews={true}
      />
      {showDots && (
        <View style={styles.pagination}>
          {getDots().map((dotIndex, i) => {
            const isActive = typeof dotIndex === 'number' ? dotIndex === activeIndex : i === activeIndex;
            return (
              <View
                key={i}
                style={[
                  styles.paginationDot,
                  isActive ? styles.paginationDotActive : styles.paginationDotInactive,
                  totalImages > maxDots && !isActive && { transform: [{ scale: 0.8 }] }
                ]}
              />
            );
          })}
        </View>
      )}
      {showCounter && (
        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>{activeIndex + 1} / {totalImages}</Text>
        </View>
      )}
    </View>
  );
};

export default React.memo(ImageCarousel);

const styles = StyleSheet.create({
  carouselWrapper: {
    flex: 1,
  },
  carouselImage: {
    height: '100%',
  },
  pagination: {
    position: 'absolute',
    bottom: scale(10),
    flexDirection: 'row',
    alignSelf: 'center',
  },
  paginationDot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    marginHorizontal: scale(3),
  },
  paginationDotActive: {
    backgroundColor: COLORS.WHITE,
  },
  paginationDotInactive: {
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  counterContainer: {
    position: 'absolute',
    bottom: scale(30),
    right: scale(15),
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
    borderRadius: scale(4),
  },
  counterText: {
    color: COLORS.WHITE,
    fontSize: moderateScale(12),
    fontWeight: '500',
  },
});
