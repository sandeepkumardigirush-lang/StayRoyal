import React, { useState, forwardRef, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import { X, GraduationCap, Globe, Briefcase, Baby, Clock, Wand2, Music, Lightbulb, BookOpen, Heart, Languages, MapPin } from 'lucide-react-native';
import { BottomSheetModal, BottomSheetScrollView, BottomSheetBackdrop, BottomSheetFooter } from '@gorhom/bottom-sheet';
import { COLORS } from '../../../../constants/colors';
import ProfileInputModal from '../../../../components/ProfileInputModal';
import AvatarPicker from '../../../../components/cameraPicker/cameraPicker';
import CustomButton from '../../../../components/commonButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { updateProfile } from '../../../../redux/userSlice';

const EditItem = ({ icon, title, value, onPress }: any) => (
  <TouchableOpacity style={styles.editItem} onPress={onPress}>
    <View style={styles.editItemLeft}>
      {icon}
      <Text style={styles.editItemTitle}>{value || title}</Text>
    </View>
  </TouchableOpacity>
);

const EditProfileSheet = forwardRef<BottomSheetModal, { onClose: () => void }>(({ onClose }, ref) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  const [activeModal, setActiveModal] = useState<string | null>(null);

  const profileOptions = [
    { id: 'school', title: 'Where I went to school', icon: <GraduationCap size={scale(22)} color={COLORS.BLACK} strokeWidth={1.5} />, description: "Whether it's home school, secondary school or trade school, name the school that made you who you are." },
    { id: 'travel', title: "Where I've always wanted to go", icon: <Globe size={scale(22)} color={COLORS.BLACK} strokeWidth={1.5} />, description: "Dreaming of the Eiffel Tower or the Great Wall of China? Share your bucket list destinations." },
    { id: 'work', title: 'My work', icon: <Briefcase size={scale(22)} color={COLORS.BLACK} strokeWidth={1.5} />, description: "What do you do for a living? Whether it's a dream job or a side hustle, tell us about it." },
    { id: 'born', title: 'Decade I was born', icon: <Baby size={scale(22)} color={COLORS.BLACK} strokeWidth={1.5} />, description: "Share the decade that shaped you." },
    { id: 'time', title: 'I spend too much time', icon: <Clock size={scale(22)} color={COLORS.BLACK} strokeWidth={1.5} />, description: "Are you a Netflix binger or a gym rat? Tell us where your hours go." },
    { id: 'skill', title: 'My most useless skill', icon: <Wand2 size={scale(22)} color={COLORS.BLACK} strokeWidth={1.5} />, description: "Can you touch your nose with your tongue? Share your quirky talents." },
    { id: 'song', title: 'My favourite song in secondary school', icon: <Music size={scale(22)} color={COLORS.BLACK} strokeWidth={1.5} />, description: "What was the anthem of your teenage years?" },
    { id: 'fact', title: 'My fun fact', icon: <Lightbulb size={scale(22)} color={COLORS.BLACK} strokeWidth={1.5} />, description: "Give us a quick tidbit that makes you unique." },
    { id: 'bio', title: 'My biography title would be', icon: <BookOpen size={scale(22)} color={COLORS.BLACK} strokeWidth={1.5} />, description: "If your life was a book, what would the cover say?" },
    { id: 'obsessed', title: "I'm obsessed with", icon: <Heart size={scale(22)} color={COLORS.BLACK} strokeWidth={1.5} />, description: "What can't you live without?" },
    { id: 'languages', title: 'Languages I speak', icon: <Languages size={scale(22)} color={COLORS.BLACK} strokeWidth={1.5} />, description: "Bilingual? Polyglot? Let us know." },
    { id: 'live', title: 'Where I live', icon: <MapPin size={scale(22)} color={COLORS.BLACK} strokeWidth={1.5} />, description: "Share your home base with the community." },
  ];

  const handleOpenModal = (option: any) => {
    setActiveModal(option.id);
  };

  const handleSaveField = (value: string) => {
    if (activeModal) {
      dispatch(updateProfile({ [activeModal]: value }));
    }
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );

  const renderFooter = useCallback(
    (props: any) => (
      <BottomSheetFooter {...props} bottomInset={insets.bottom}>
        <View style={styles.footer}>
          <CustomButton title="Done" onPress={() => (ref as any).current?.dismiss()} />
        </View>
      </BottomSheetFooter>
    ),
    [insets.bottom]
  );

  const activeOption = profileOptions.find(o => o.id === activeModal);
  const userImage = userInfo?.profileImage || "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=256&h=256&auto=format&fit=crop";

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={['85%']}
      enableDynamicSizing={false}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      footerComponent={renderFooter}
      handleComponent={null}
      backgroundStyle={styles.sheetBackground}
      onDismiss={onClose}
    >
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: scale(20), marginTop: scale(15) }}>
          <View style={{ width: scale(10) }} />
          <Text style={styles.headerTitle}>Edit profile</Text>
          <X color={COLORS.BLACK} size={scale(24)} onPress={() => (ref as any).current?.dismiss()} />
        </View>

        <View style={styles.avatarSection}>
          <AvatarPicker
            image={userImage}
            onImageChange={(path) => dispatch(updateProfile({ profileImage: path }))}
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>My profile</Text>
          <Text style={styles.sectionSubtitle}>
            Hosts and guests can see your profile, and it may appear across StayRoyal to help us build trust in our community. <Text style={styles.link}>Learn more</Text>
          </Text>

          {profileOptions.map((option) => (
            <EditItem
              key={option.id}
              icon={option.icon}
              title={option.title}
              value={(userInfo as any)?.[option.id]}
              onPress={() => handleOpenModal(option)}
            />
          ))}
        </View>

        <View style={{ height: scale(100) }} />
      </BottomSheetScrollView>

      {activeOption && (
        <ProfileInputModal
          visible={!!activeModal}
          onClose={() => setActiveModal(null)}
          onSave={handleSaveField}
          title={activeOption.title}
          description={activeOption.description}
          initialValue={(userInfo as any)?.[activeModal || '']}
        />
      )}
    </BottomSheetModal>
  );
});

export default EditProfileSheet;

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 25,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerTitle: {
    fontSize: scale(16),
    fontWeight: '700',
    color: COLORS.BLACK,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: scale(30),
  },
  formSection: {
    paddingHorizontal: scale(20),
  },
  sectionTitle: {
    fontSize: scale(22),
    fontWeight: '700',
    color: COLORS.BLACK,
    marginBottom: scale(10),
  },
  sectionSubtitle: {
    fontSize: scale(14),
    color: COLORS.SECONDARY,
    lineHeight: scale(20),
    marginBottom: scale(30),
  },
  link: {
    textDecorationLine: 'underline',
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  editItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingVertical: scale(20),
  },
  editItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editItemTitle: {
    fontSize: scale(15),
    color: COLORS.SECONDARY,
    marginLeft: scale(15),
  },
  footer: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: scale(20),
    paddingVertical: scale(15),
    borderTopWidth: 1,
    borderTopColor: COLORS.WHITE,
  },
});
