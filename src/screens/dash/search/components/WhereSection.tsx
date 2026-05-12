import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { Search, MapPin, X } from 'lucide-react-native';
import { COLORS } from '../../../../constants/colors';

interface WhereSectionProps {
  isActive: boolean;
  searchQuery: string;
  onSearchChange: (text: string) => void;
  loading: boolean;
  searchResults: any[];
  onResultPress: (item: any) => void;
  selectedLocation: string | null;
  onPress: () => void;
}

const WhereSection = ({
  isActive,
  searchQuery,
  onSearchChange,
  loading,
  searchResults,
  onResultPress,
  selectedLocation,
  onPress
}: WhereSectionProps) => {
  if (!isActive) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={styles.stepCard}
      >
        <View style={styles.collapsedRow}>
          <Text style={styles.collapsedLabel}>Where</Text>
          <Text style={styles.collapsedValue} numberOfLines={1}>
            {selectedLocation ? selectedLocation : "I'm flexible"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.stepCard, styles.activeStepCard]}>
      <Text style={styles.stepTitle}>Where to?</Text>
      <View style={styles.searchBar}>
        <Search size={scale(16)} color={COLORS.BLACK} style={{ marginRight: scale(10) }} />
        <TextInput
          placeholder="Search destinations"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={onSearchChange}
          autoFocus
        />
        {loading ? (
          <ActivityIndicator color={COLORS.GRAY} size="small" />
        ) : (
          searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => onSearchChange('')}>
              <X size={scale(16)} color={COLORS.BLACK} />
            </TouchableOpacity>
          )
        )}
      </View>

      {searchResults.length > 0 ? (
        <View>
          <Text style={styles.sectionTitle}>Search results</Text>
          {searchResults.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.suggestionItem}
              onPress={() => onResultPress(item)}
            >
              <View style={styles.suggestionIconWrapper}>
                <MapPin size={scale(20)} color={COLORS.BLACK} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.suggestionTitle} numberOfLines={1}>{item.display_name}</Text>
                <Text style={styles.suggestionSubtitle}>{item.type}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : selectedLocation && searchQuery === selectedLocation && (
        <View style={styles.selectedLocationInfo}>
          <View style={styles.suggestionIconWrapper}>
            <MapPin size={scale(20)} color={COLORS.PURPLE1} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.suggestionTitle, { color: COLORS.PURPLE1 }]} numberOfLines={1}>
              Selected: {selectedLocation}
            </Text>
            <Text style={styles.suggestionSubtitle}>Tap the 'X' to change</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default WhereSection;

const styles = StyleSheet.create({
  stepCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: scale(15),
    padding: scale(15),
    marginBottom: scale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  activeStepCard: {
    elevation: 4,
    shadowOpacity: 0.1,
  },
  stepTitle: {
    fontSize: moderateScale(21),
    fontWeight: '600',
    color: COLORS.BLACK,
    marginBottom: scale(15),
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.GRAY_BORDER,
    borderRadius: scale(10),
    paddingHorizontal: scale(12),
    height: scale(45),
    marginBottom: scale(20),
  },
  searchInput: {
    flex: 1,
    fontSize: moderateScale(14),
    color: COLORS.BLACK,
  },
  sectionTitle: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: COLORS.BLACK,
    marginBottom: scale(12),
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(15),
  },
  suggestionIconWrapper: {
    width: scale(45),
    height: scale(45),
    borderRadius: scale(10),
    backgroundColor: COLORS.LIGHT_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  suggestionTitle: {
    fontSize: moderateScale(15),
    fontWeight: '500',
    color: COLORS.BLACK,
  },
  suggestionSubtitle: {
    fontSize: moderateScale(13),
    color: COLORS.GRAY,
  },
  collapsedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  collapsedLabel: {
    fontSize: moderateScale(13),
    color: COLORS.GRAY,
    fontWeight: '500',
  },
  collapsedValue: {
    fontSize: moderateScale(13),
    color: COLORS.BLACK,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
    marginLeft: scale(10),
  },
  selectedLocationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.PURPLE_LIGHT,
    padding: scale(10),
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: COLORS.PURPLE_BORDER,
  },
});


