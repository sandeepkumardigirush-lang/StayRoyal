import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import { COLORS } from '../../../constants/colors';
import { RootStackParamList } from '../../../navigation/types';
import VillaDetailHeader from './components/VillaDetailHeader';
import VillaDetailInfo from './components/VillaDetailInfo';
import VillaDetailSections from './components/VillaDetailSections';
import VillaDetailFooter from './components/VillaDetailFooter';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const VillaDetail = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'VillaDetail'>>();
  const { villa } = route.params;
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <VillaDetailHeader
          images={villa.images}
          screenWidth={SCREEN_WIDTH}
          onBack={() => navigation.goBack()}
        />
        <View style={styles.body}>
          <VillaDetailInfo villa={villa} />
          <VillaDetailSections villa={villa} />
        </View>
      </ScrollView>

      <VillaDetailFooter
        price={villa.price}
        bottomInset={insets.bottom}
      />
    </View>
  );
};

export default VillaDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  scrollContent: {
    paddingBottom: scale(100),
  },
  body: {
    marginTop: -scale(24),          // pulls card up over carousel
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    paddingHorizontal: scale(24),
    paddingTop: scale(24),
  },
});
