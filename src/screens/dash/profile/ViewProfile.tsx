import React, { useRef, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import { ChevronLeft, GraduationCap, Globe, Briefcase, Baby, Clock, Wand2, Music, Lightbulb, BookOpen, Heart, Languages, MapPin } from 'lucide-react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { COLORS } from '../../../constants/colors';
import EditProfileSheet from './components/EditProfileSheet';
import CustomButton from '../../../components/commonButton';

const ProfileDetailItem = ({ icon, title, value, showLine }: { icon: any, title: string, value: string, showLine?: boolean }) => (
  <View style={[styles.detailItemContainer, showLine && styles.withBorder]}>
    <View style={styles.detailItem}>
      <View style={styles.detailIconWrapper}>
        {icon}
      </View>
      <View style={styles.detailTextWrapper}>
        <Text style={styles.detailTitle}>{title}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  </View>
);

const ViewProfile = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const sheetRef = useRef<BottomSheetModal>(null);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  const userImage = userInfo?.profileImage || "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=256&h=256&auto=format&fit=crop";

  const handleOpenSheet = useCallback(() => {
    sheetRef.current?.present();
  }, []);

  // This is called AFTER the sheet has already dismissed — do NOT call dismiss() here
  const handleCloseSheet = useCallback(() => {
    // sheet already closed, nothing to do
  }, []);

  const profileOptions = [
    { id: 'school', title: 'Went to school at', icon: <GraduationCap size={scale(20)} color={COLORS.BLACK} /> },
    { id: 'travel', title: "Wants to go to", icon: <Globe size={scale(20)} color={COLORS.BLACK} /> },
    { id: 'work', title: 'Work', icon: <Briefcase size={scale(20)} color={COLORS.BLACK} /> },
    { id: 'born', title: 'Born in', icon: <Baby size={scale(20)} color={COLORS.BLACK} /> },
    { id: 'time', title: 'Spends too much time', icon: <Clock size={scale(20)} color={COLORS.BLACK} /> },
    { id: 'skill', title: 'Useless skill', icon: <Wand2 size={scale(20)} color={COLORS.BLACK} /> },
    { id: 'song', title: 'Favourite school song', icon: <Music size={scale(20)} color={COLORS.BLACK} /> },
    { id: 'fact', title: 'Fun fact', icon: <Lightbulb size={scale(20)} color={COLORS.BLACK} /> },
    { id: 'bio', title: 'Biography title', icon: <BookOpen size={scale(20)} color={COLORS.BLACK} /> },
    { id: 'obsessed', title: 'Obsessed with', icon: <Heart size={scale(20)} color={COLORS.BLACK} /> },
    { id: 'languages', title: 'Speaks', icon: <Languages size={scale(20)} color={COLORS.BLACK} /> },
    { id: 'live', title: 'Lives in', icon: <MapPin size={scale(20)} color={COLORS.BLACK} /> },
  ];

  const filledDetails = profileOptions.filter(opt => (userInfo as any)?.[opt.id]);
  const hasStartedProfile = filledDetails.length > 0;

  return (
    <View style={styles.container}>

      <View style={[styles.header, { paddingTop: insets.top + scale(10) }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft color={COLORS.BLACK} size={scale(24)} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.editBtn} onPress={handleOpenSheet}>
          <Text style={styles.editBtnText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <FastImage 
            source={{ 
              uri: userImage,
              priority: FastImage.priority.normal 
            }} 
            style={styles.avatar} 
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text style={styles.name}>{userInfo?.firstName || 'Guest'} {userInfo?.lastName || ''}</Text>
          <Text style={styles.role}>Guest</Text>
        </View>

        {!hasStartedProfile ? (
          <View style={styles.completeSection}>
            <Text style={styles.completeTitle}>Complete your profile</Text>
            <Text style={styles.completeSubtitle}>
              Your StayRoyal profile is an important part of every reservation. Create yours to help other hosts and guests get to know you.
            </Text>
            <CustomButton title="Get started" onPress={handleOpenSheet} width={'55%'} />
          </View>
        ) : (
          <View style={styles.detailsSection}>
            <Text style={styles.detailsMainTitle}>About {userInfo?.firstName || 'you'}</Text>
            <View style={styles.detailsList}>
              {filledDetails.map((detail, index) => (
                <ProfileDetailItem
                  key={detail.id}
                  icon={detail.icon}
                  title={detail.title}
                  value={(userInfo as any)[detail.id]}
                  showLine={index !== filledDetails.length - 1}
                />
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Edit Profile Sheet */}
      <EditProfileSheet
        ref={sheetRef}
        onClose={handleCloseSheet}
      />
    </View>
  );
};

export default ViewProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingBottom: scale(10),
  },
  backBtn: {
    padding: scale(5),
  },
  editBtn: {
    backgroundColor: '#F7F7F7',
    paddingHorizontal: scale(20),
    paddingVertical: scale(8),
    borderRadius: scale(20),
    borderWidth: 1,
    borderColor: '#EBEBEB',
  },
  editBtnText: {
    fontSize: scale(14),
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  scrollContent: {
    paddingHorizontal: scale(20),
    paddingTop: scale(20),
    paddingBottom: scale(40),
  },
  profileCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: scale(24),
    padding: scale(30),
    alignItems: 'center',
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: scale(30),
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  avatar: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    marginBottom: scale(15),
  },
  name: {
    fontSize: scale(23),
    fontWeight: '600',
    color: COLORS.BLACK,
    marginBottom: scale(4),
  },
  role: {
    fontSize: scale(14),
    color: COLORS.TAB_GRAY,
    fontWeight: '400',
  },
  completeSection: {
    alignItems: 'center',
    paddingHorizontal: scale(10),
  },
  completeTitle: {
    fontSize: scale(22),
    fontWeight: '600',
    color: COLORS.BLACK,
    marginBottom: scale(15),
    textAlign: 'center',
  },
  completeSubtitle: {
    fontSize: scale(13),
    color: COLORS.TAB_GRAY,
    lineHeight: scale(18),
    textAlign: 'center',
    marginBottom: scale(30),
  },
  detailsSection: {
    marginTop: scale(10),
  },
  detailsMainTitle: {
    fontSize: scale(20),
    fontWeight: '600',
    color: COLORS.BLACK,
    marginBottom: scale(20),
  },
  detailsList: {
    // No gap here so lines touch edges if needed
  },
  detailItemContainer: {
    paddingVertical: scale(15),
  },
  withBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(15),
  },
  detailIconWrapper: {
    width: scale(35),
    alignItems: 'center',
  },
  detailTextWrapper: {
    flex: 1,
  },
  detailTitle: {
    fontSize: scale(12),
    color: COLORS.TAB_GRAY,
    marginBottom: scale(2),
  },
  detailValue: {
    fontSize: scale(14),
    color: COLORS.BLACK,
    fontWeight: '500',
  },
});

