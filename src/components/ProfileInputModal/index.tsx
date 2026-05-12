import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { X } from 'lucide-react-native';
import { scale } from 'react-native-size-matters';
import { COLORS } from '../../constants/colors';
import CustomButton from '../commonButton';

interface ProfileInputModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (value: string) => void;
  title: string;
  description: string;
  initialValue?: string;
  maxLength?: number;
}

const ProfileInputModal = ({
  visible,
  onClose,
  onSave,
  title,
  description,
  initialValue = '',
  maxLength = 40,
}: ProfileInputModalProps) => {
  const [inputValue, setInputValue] = useState(initialValue);

  // Sync state when modal opens
  useEffect(() => {
    if (visible) {
      setInputValue(initialValue);
    }
  }, [visible, initialValue]);

  const handleSave = () => {
    if (inputValue.trim()) {
      onSave(inputValue);
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContent}
        >
          <TouchableOpacity style={styles.modalClose} onPress={onClose}>
            <X color={COLORS.BLACK} size={scale(22)} />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>{title}?</Text>
          <Text style={styles.modalDescription}>{description}</Text>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>{title}:</Text>
            <TextInput
              style={styles.input}
              value={inputValue}
              onChangeText={setInputValue}
              maxLength={maxLength}
              autoFocus
            />
            <Text style={styles.charCount}>{inputValue.length}/{maxLength} characters</Text>
          </View>

          <CustomButton
            title="Save"
            onPress={handleSave}
            disabled={!inputValue.trim()}
          />
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default ProfileInputModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    padding: scale(20),
    minHeight: '60%',
  },
  modalClose: {
    alignSelf: 'flex-end',
    marginBottom: scale(10),
  },
  modalTitle: {
    fontSize: scale(22),
    fontWeight: '600',
    color: COLORS.BLACK,
    marginBottom: scale(10),
    marginTop: scale(10),
  },
  modalDescription: {
    fontSize: scale(14),
    color: COLORS.SECONDARY,
    lineHeight: scale(20),
    marginBottom: scale(30),
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    borderRadius: scale(12),
    padding: scale(15),
    marginBottom: scale(40),
  },
  inputLabel: {
    fontSize: scale(12),
    color: COLORS.GRAY,
    marginBottom: scale(5),
  },
  input: {
    fontSize: scale(16),
    color: COLORS.BLACK,
    paddingVertical: scale(5),
  },
  charCount: {
    fontSize: scale(12),
    color: COLORS.GRAY,
    alignSelf: 'flex-end',
    marginTop: scale(10),
  },
});
