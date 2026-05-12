import React, { useState, useCallback, useMemo } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Modal, FlatList, Dimensions } from 'react-native';
import { scale } from 'react-native-size-matters';
import { X } from 'lucide-react-native';
import { COLORS } from '../../../../constants/colors';

const { width, height } = Dimensions.get('window');

interface ImageStackProps {
  images: string[];
}

const ImageStack = ({ images }: ImageStackProps) => {
  const [showCarousel, setShowCarousel] = useState(false);

  const toggleCarousel = useCallback(() => {
    setShowCarousel(prev => !prev);
  }, []);

  const visibleImages = useMemo(() => images.slice(0, 3), [images]);

  const stackContent = useMemo(() => {
    if (!images || images.length === 0) return null;

    if (images.length === 1) {
      return <Image source={{ uri: images[0] }} style={styles.stackImage} />;
    }

    return visibleImages.map((img, index) => {
      let zIndex = 1;
      let translateX = 0;
      let rotate = '0deg';

      if (visibleImages.length === 2) {
        zIndex = index === 0 ? 1 : 2;
        translateX = index === 0 ? -scale(15) : scale(15);
        rotate = index === 0 ? '-8deg' : '8deg';
      } else if (visibleImages.length === 3) {
        if (index === 0) {
          zIndex = 1;
          translateX = -scale(25);
          rotate = '-12deg';
        } else if (index === 1) {
          zIndex = 3;
          translateX = 0;
          rotate = '0deg';
        } else {
          zIndex = 2;
          translateX = scale(25);
          rotate = '12deg';
        }
      }

      return (
        <Image 
          key={index} 
          source={{ uri: img }} 
          style={[
            styles.stackImage, 
            { 
              zIndex, 
              transform: [{ translateX }, { rotate }] 
            }
          ]} 
        />
      );
    });
  }, [images, visibleImages]);

  const renderCarouselItem = useCallback(({ item }: { item: string }) => (
    <View style={styles.carouselImageWrapper}>
      <Image source={{ uri: item }} style={styles.fullImage} resizeMode="contain" />
    </View>
  ), []);

  const keyExtractor = useCallback((_: string, index: number) => index.toString(), []);

  return (
    <>
      <TouchableOpacity 
        style={styles.imageStack} 
        onPress={toggleCarousel}
        activeOpacity={0.9}
      >
        {stackContent}
      </TouchableOpacity>

      <Modal visible={showCarousel} transparent={false} animationType="fade" onRequestClose={toggleCarousel}>
        <View style={styles.carouselContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleCarousel}>
            <X color={COLORS.WHITE} size={scale(22)} />
          </TouchableOpacity>

          <FlatList
            data={images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={keyExtractor}
            renderItem={renderCarouselItem}
            getItemLayout={(_, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            windowSize={5}
            initialNumToRender={3}
            maxToRenderPerBatch={3}
          />
        </View>
      </Modal>
    </>
  );
};

export default React.memo(ImageStack);

const styles = StyleSheet.create({
  imageStack: {
    height: scale(90),
    marginBottom: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  stackImage: {
    width: scale(85),
    height: scale(85),
    borderRadius: scale(12),
    borderWidth: 2,
    borderColor: COLORS.WHITE,
    position: 'absolute',
    backgroundColor: COLORS.IMAGE_BG,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  carouselContainer: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  closeButton: {
    position: 'absolute',
    top: scale(50),
    right: scale(20),
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: scale(20),
    padding: scale(8),
  },
  carouselImageWrapper: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: width,
    height: height * 0.8,
  },
});
