import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { scale } from 'react-native-size-matters';
import { COLORS } from '../../../../constants/colors';

interface WishlistGridProps {
  items: any[];
}

const WishlistGrid: React.FC<WishlistGridProps> = ({ items }) => {
  const displayItems = items.slice(0, 4);
  const count = displayItems.length;

  if (count === 0) return <View style={[styles.wishlistImage, styles.emptyImage]} />;
  if (count === 1) return <FastImage source={{ uri: displayItems[0].image || displayItems[0].images?.[0] }} style={styles.wishlistImage} />;
  
  if (count === 2) {
    return (
      <View style={styles.gridContainer}>
        <FastImage source={{ uri: displayItems[0].image || displayItems[0].images?.[0] }} style={styles.gridImageHalf} />
        <FastImage source={{ uri: displayItems[1].image || displayItems[1].images?.[0] }} style={styles.gridImageHalf} />
      </View>
    );
  }

  if (count === 3) {
    return (
      <View style={styles.gridContainer}>
        <FastImage source={{ uri: displayItems[0].image || displayItems[0].images?.[0] }} style={styles.gridImageHalf} />
        <View style={styles.gridColumn}>
          <FastImage source={{ uri: displayItems[1].image || displayItems[1].images?.[0] }} style={styles.gridImageQuarter} />
          <FastImage source={{ uri: displayItems[2].image || displayItems[2].images?.[0] }} style={styles.gridImageQuarter} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.gridContainer}>
      <View style={styles.gridColumn}>
        <FastImage source={{ uri: displayItems[0].image || displayItems[0].images?.[0] }} style={styles.gridImageQuarter} />
        <FastImage source={{ uri: displayItems[1].image || displayItems[1].images?.[0] }} style={styles.gridImageQuarter} />
      </View>
      <View style={styles.gridColumn}>
        <FastImage source={{ uri: displayItems[2].image || displayItems[2].images?.[0] }} style={styles.gridImageQuarter} />
        <FastImage source={{ uri: displayItems[3].image || displayItems[3].images?.[0] }} style={styles.gridImageQuarter} />
      </View>
    </View>
  );
};

export default React.memo(WishlistGrid);

const styles = StyleSheet.create({
  wishlistImage: {
    width: '100%',
    height: '100%',
  },
  gridContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    gap: 2,
  },
  gridImageHalf: {
    flex: 1,
    height: '100%',
  },
  gridColumn: {
    flex: 1,
    height: '100%',
    gap: 2,
  },
  gridImageQuarter: {
    flex: 1,
    width: '100%',
  },
  emptyImage: {
    backgroundColor: COLORS.DIVIDER,
  },
});
