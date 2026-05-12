import React, { memo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { DoorOpen, Dog, Award, ChevronRight, Wifi, Briefcase, Car, UtensilsCrossed, AlarmSmoke } from 'lucide-react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { COLORS } from '../../../../constants/colors';
import FastImage from 'react-native-fast-image';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { FlashList } from '@shopify/flash-list';

const AMENITIES = [
  { id: '1', icon: UtensilsCrossed, title: 'Kitchen' },
  { id: '2', icon: Wifi, title: 'Wifi' },
  { id: '3', icon: Briefcase, title: 'Dedicated workspace' },
  { id: '4', icon: Car, title: 'Free parking on premises' },
  { id: '5', icon: Dog, title: 'Pets allowed' },
  { id: '6', icon: AlarmSmoke, title: 'Smoke alarm' },
];


const InfoRow = memo(({ icon: Icon, title, subtitle }: { icon: any; title: string; subtitle: string }) => (
  <View style={styles.infoRow}>
    <Icon size={scale(24)} color={COLORS.BLACK} strokeWidth={1.5} />
    <View style={styles.infoTextContainer}>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoSubtitle}>{subtitle}</Text>
    </View>
  </View>
));

const AmenityItem = memo(({ icon: Icon, title }: { icon: any; title: string }) => (
  <View style={styles.amenityItem}>
    <Icon size={scale(22)} color={COLORS.BLACK} strokeWidth={1.5} />
    <Text style={styles.amenityText}>{title}</Text>
  </View>
));


interface Props {
  villa: any;
}

const VillaDetailSections = memo(({ villa }: Props) => (
  <View>
    {/* Features */}
    <View style={styles.sectionDivider} />
    <InfoRow icon={DoorOpen} title="Self check-in" subtitle="Check yourself in with the lockbox." />
    <InfoRow icon={Dog} title="Furry friends welcome" subtitle="Bring your pets along for the stay." />
    <InfoRow icon={Award} title="Shaminder is a Superhost" subtitle="Superhosts are experienced, highly rated Hosts." />

    {/* Description */}
    <View style={styles.sectionDivider} />

    <Text style={styles.description} numberOfLines={6}>
      Spacious studio apartment in the heart of Zirakpur on famous Oxford Street—ideal for food & shopping. Features attached bathroom, private kitchen with wooden partition, and premium amenities. Perfect for couples, business travel, and short stays. Central location, easy access, modern comfort and luxury ....
    </Text>

    {/* Where you'll sleep */}
    <View style={styles.sectionDivider} />
    <Text style={styles.sectionTitle}>Where you'll sleep</Text>
    <View style={styles.sleepCard}>
      <FastImage
        source={{ uri: villa.images[0] }}
        style={styles.sleepImage}
      />
      <Text style={styles.sleepTitle}>Bedroom</Text>
      <Text style={styles.sleepSubtitle}>1 king bed</Text>
    </View>

    {/* Amenities */}
    <View style={styles.sectionDivider} />
    <Text style={styles.sectionTitle}>What this place offers</Text>
    <View style={styles.amenitiesListContainer}>
      <FlashList
        data={AMENITIES}
        renderItem={({ item }) => <AmenityItem icon={item.icon} title={item.title} />}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </View>
    <TouchableOpacity style={styles.outlineBtn}>
  
      <Text style={styles.outlineBtnText}>Show all 23 amenities</Text>
    </TouchableOpacity>

    {/* Location / Map */}
    <View style={styles.sectionDivider} />
    <Text style={styles.sectionTitle}>Where you'll be</Text>
    <Text style={styles.locationSubText}>Zirakpur, Punjab, India</Text>
    <View style={styles.mapContainer}>
      {villa?.coordinate && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.miniMap}
          initialRegion={{
            ...villa.coordinate,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          scrollEnabled={false}
          zoomEnabled={false}
        >
          <Marker coordinate={villa.coordinate}>
            <View style={styles.customMarker}>
              <View style={styles.markerInner}>
                <DoorOpen size={scale(16)} color={COLORS.WHITE} />
              </View>
              <View style={styles.markerTriangle} />
            </View>
          </Marker>
        </MapView>
      )}
    </View>
  </View>
));

export default VillaDetailSections;

const styles = StyleSheet.create({
  sectionDivider: {
    height: 1,
    backgroundColor: COLORS.SECTION_DIVIDER,
    marginVertical: scale(32),
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: scale(24),
  },
  infoTextContainer: {
    marginLeft: scale(16),
    flex: 1,
  },
  infoTitle: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  infoSubtitle: {
    fontSize: moderateScale(14),
    color: COLORS.GRAY,
    marginTop: scale(2),
  },

  showOriginal: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  description: {
    fontSize: moderateScale(16),
    color: COLORS.BLACK,
    lineHeight: scale(24),
  },

  sectionTitle: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: COLORS.BLACK,
    marginBottom: scale(24),
  },
  sleepCard: {
    width: scale(160),
  },
  sleepImage: {
    width: '100%',
    height: scale(120),
    borderRadius: scale(12),
    marginBottom: scale(12),
  },
  sleepTitle: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  sleepSubtitle: {
    fontSize: moderateScale(14),
    color: COLORS.GRAY,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(20),
  },
  amenityText: {
    fontSize: moderateScale(14),
    color: COLORS.BLACK,
    marginLeft: scale(16),
  },
  amenitiesListContainer: {
    minHeight: scale(260),
    width: '100%',
  },
  outlineBtn: {
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    borderRadius: scale(8),
    paddingVertical: scale(12),
    alignItems: 'center',
    marginTop: scale(12),
  },
  outlineBtnText: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  locationSubText: {
    fontSize: moderateScale(16),
    color: COLORS.BLACK,
    marginBottom: scale(16),
  },
  mapContainer: {
    height: scale(200),
    borderRadius: scale(12),
    overflow: 'hidden',
  },
  miniMap: {
    flex: 1,
  },
  customMarker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerInner: {
    backgroundColor: COLORS.BLACK,
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  markerTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: scale(6),
    borderRightWidth: scale(6),
    borderTopWidth: scale(8),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: COLORS.BLACK,
    marginTop: -scale(2),
  },
});
