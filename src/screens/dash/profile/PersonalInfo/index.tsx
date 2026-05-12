import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Verified } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import SettingHeader from '../../../../components/headers/SettingHeader';
import { COLORS } from '../../../../constants/colors';
import { RootState } from '../../../../redux/store';
import { RootStackParamList } from '../../../../navigation/types';

const PersonalInfo = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { userInfo } = useSelector((state: RootState) => state.user);

  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState('');

  const personalData = [
    { id: 'legal_name', label: 'Legal name', value: `${userInfo?.firstName || 'Sandeep'} ${userInfo?.surname || 'Kumar'}`, type: 'edit' },
    { id: 'preferred_name', label: 'Preferred first name', value: 'Not provided', type: 'add' },
    { id: 'phone', label: 'Phone number', value: userInfo?.phone ? `+91 ${userInfo.phone.slice(0, 2)}*** *${userInfo.phone.slice(-4)}` : 'Not provided', type: 'edit', verified: true },
    { id: 'email', label: 'Email', value: userInfo?.email ? `${userInfo.email.slice(0, 1)}***${userInfo.email.split('@')[0].slice(-1)}@${userInfo.email.split('@')[1]}` : 'Not provided', type: 'edit', verified: false },
    { id: 'residential_address', label: 'Residential address', value: 'Not provided', type: 'add' },
    { id: 'postal_address', label: 'Postal address', value: 'Not provided', type: 'add' },
  ];

  const handleEdit = (item: any) => {
    setEditingField(item.id);
    setTempValue('');
  };

  if (editingField) {
    const field = personalData.find(p => p.id === editingField);
    return (
      <SafeAreaView style={styles.container}>
        <SettingHeader title={field?.label} onBack={() => setEditingField(null)} />
        <View style={styles.editContent}>
          <Text style={styles.description}>This is how your first name will appear to hosts and guests. <Text style={styles.linkText}>Learn more</Text></Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder={`${field?.label} (optional)`} value={tempValue} onChangeText={setTempValue} autoFocus />
          </View>
          <TouchableOpacity style={[styles.saveButton, !tempValue && styles.saveButtonDisabled]} disabled={!tempValue} onPress={() => setEditingField(null)}>
            <Text style={[styles.saveButtonText, !tempValue && styles.saveButtonTextDisabled]}>Save</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <SettingHeader onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Personal info</Text>
        {personalData.map((item, index) => (
          <View key={item.id} style={[styles.infoItem, index !== personalData.length - 1 && styles.borderBottom]}>
            <View style={styles.infoLeft}>
              <View style={styles.infoLabelContainer}>
                <Text style={styles.infoLabel}>{item.label}</Text>
                {item.verified && <Verified size={scale(16)} color={COLORS.PRIMARY} style={styles.verifiedIcon} />}
              </View>
              <Text style={styles.infoValue}>{item.value}</Text>
              {(item.id === 'email' || item.id === 'phone') && !item.verified && (
                <TouchableOpacity style={styles.confirmButton}><Text style={styles.confirmText}>verify</Text></TouchableOpacity>
              )}
            </View>
            <TouchableOpacity onPress={() => handleEdit(item)}><Text style={styles.actionText}>{item.type === 'edit' ? 'Edit' : 'Add'}</Text></TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalInfo;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.WHITE },
  scrollContent: { paddingHorizontal: scale(25), paddingBottom: scale(40) },
  title: { fontSize: moderateScale(28), fontWeight: '700', color: COLORS.BLACK, marginTop: scale(10), marginBottom: scale(30) },
  infoItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: scale(20) },
  borderBottom: { borderBottomWidth: 0.5, borderBottomColor: '#EEEEEE' },
  infoLeft: { flex: 1, paddingRight: scale(10) },
  infoLabelContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: scale(4) },
  infoLabel: { fontSize: moderateScale(16), color: COLORS.BLACK, fontWeight: '400' },
  verifiedIcon: { marginLeft: scale(6) },
  infoValue: { fontSize: moderateScale(13), color: COLORS.SECONDARY, fontWeight: '400' },
  actionText: { fontSize: moderateScale(14), color: COLORS.BLACK, fontWeight: '600', textDecorationLine: 'underline' },
  confirmButton: { marginTop: scale(12), borderWidth: 1, borderColor: COLORS.BORDER_GRAY, borderRadius: scale(8), paddingVertical: scale(8), paddingHorizontal: scale(15), alignSelf: 'flex-start' },
  confirmText: { fontSize: moderateScale(14), fontWeight: '500', color: COLORS.BLACK },
  editContent: { paddingHorizontal: scale(25), marginTop: scale(10) },
  description: { fontSize: moderateScale(13), color: COLORS.SECONDARY, lineHeight: scale(18), marginBottom: scale(20) },
  linkText: { textDecorationLine: 'underline', color: COLORS.BLACK, fontWeight: '600' },
  inputContainer: { borderWidth: 1, borderColor: '#999', borderRadius: scale(10), paddingHorizontal: scale(15), paddingVertical: scale(12), marginBottom: scale(30) },
  input: { fontSize: moderateScale(15), color: COLORS.BLACK, padding: 0 },
  saveButton: { backgroundColor: COLORS.BLACK, borderRadius: scale(8), paddingVertical: scale(14), alignItems: 'center' },
  saveButtonDisabled: { backgroundColor: '#F7F7F7' },
  saveButtonText: { color: COLORS.WHITE, fontSize: moderateScale(15), fontWeight: '600' },
  saveButtonTextDisabled: { color: '#CCCCCC' },
});
