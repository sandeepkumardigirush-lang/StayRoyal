import React, { useCallback, useMemo, useState, useEffect, forwardRef } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BottomSheetModal, BottomSheetBackdrop, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { scale, moderateScale } from 'react-native-size-matters';
import { Star, X } from 'lucide-react-native';
import { COLORS } from '../../../../constants/colors';

interface Review {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  date: string;
  comment: string;
}

interface ReviewsSheetProps {
  reviews: Review[];
}

const CHUNK_SIZE = 5;

const ReviewItem = React.memo(({ item }: { item: Review }) => (
  <View style={styles.reviewItem}>
    <View style={styles.userInfo}>
      <FastImage source={{ uri: item.user.avatar }} style={styles.avatar} />
      <View>
        <Text style={styles.userName}>{item.user.name}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </View>
    <View style={styles.stars}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={scale(12)}
          color={i < item.rating ? COLORS.BLACK : COLORS.GRAY}
          fill={i < item.rating ? COLORS.BLACK : 'transparent'}
        />
      ))}
    </View>
    <Text style={styles.comment}>{item.comment}</Text>
  </View>
));

const ReviewsSheet = forwardRef<BottomSheetModal, ReviewsSheetProps>(({ reviews }, ref) => {
  const [displayReviews, setDisplayReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  const snapPoints = useMemo(() => ['85%'], []);

  useEffect(() => {
    setDisplayReviews(reviews.slice(0, CHUNK_SIZE));
  }, [reviews]);

  const loadMore = useCallback(() => {
    if (loading || displayReviews.length >= reviews.length) return;

    setLoading(true);
    setTimeout(() => {
      setDisplayReviews(prev => {
        const nextBatch = reviews.slice(prev.length, prev.length + CHUNK_SIZE);
        // Filter out any potential duplicates just in case
        const existingIds = new Set(prev.map(r => r.id));
        const filteredBatch = nextBatch.filter(r => !existingIds.has(r.id));
        return [...prev, ...filteredBatch];
      });
      setLoading(false);
    }, 600);
  }, [loading, displayReviews.length, reviews]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsAt={-1}
        appearsAt={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    []
  );

  const renderItem = useCallback(({ item }: { item: Review }) => (
    <ReviewItem item={item} />
  ), []);

  const keyExtractor = useCallback((item: Review) => item.id, []);

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      enableDynamicSizing={false}
      enableOverDrag={false}
      style={styles.sheetShadow}
      handleComponent={null}
      backgroundStyle={styles.background}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{reviews.length} reviews</Text>
          <TouchableOpacity onPress={() => (ref as any)?.current?.dismiss()}>
            <X size={scale(24)} color={COLORS.BLACK} />
          </TouchableOpacity>
        </View>

        <BottomSheetFlatList
          data={displayReviews}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          contentContainerStyle={styles.listContent}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={10}
          ListFooterComponent={() =>
            loading ? (
              <View style={styles.footerLoader}>
                <ActivityIndicator color={COLORS.BLACK} />
              </View>
            ) : null
          }
        />
      </View>
    </BottomSheetModal>
  );
});

export default ReviewsSheet;

const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: scale(32),
    borderTopRightRadius: scale(32),
  },
  sheetShadow: {
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale(16),
    paddingHorizontal: scale(24),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: COLORS.BLACK,
  },
  listContent: {
    paddingHorizontal: scale(24),
    paddingBottom: scale(40),
  },
  reviewItem: {
    paddingVertical: scale(20),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(12),
  },
  avatar: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    marginRight: scale(16),
    backgroundColor: '#F0F0F0',
  },
  userName: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  date: {
    fontSize: moderateScale(13),
    color: COLORS.SECONDARY,
    marginTop: scale(2),
  },
  stars: {
    flexDirection: 'row',
    marginBottom: scale(8),
  },
  comment: {
    fontSize: moderateScale(14),
    color: COLORS.BLACK,
    lineHeight: scale(20),
  },
  footerLoader: {
    paddingVertical: scale(20),
    alignItems: 'center',
  },
});
