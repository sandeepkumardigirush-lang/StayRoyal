import React from 'react';
import {
  StyleSheet, View, Image, TouchableOpacity,
  Text, ActionSheetIOS, Platform, Alert,
  NativeModules, PermissionsAndroid,
} from 'react-native';
import { Camera } from 'lucide-react-native';
import { scale } from 'react-native-size-matters';
import { COLORS } from '../../constants/colors';

interface AvatarPickerProps {
  image: string;
  onImageChange: (newImage: string) => void;
  size?: number;
}

const requestAndroidPermission = async (method: 'CAMERA' | 'GALLERY'): Promise<boolean> => {
  try {
    if (method === 'CAMERA') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'StayRoyal needs access to your camera to update your profile photo.',
          buttonPositive: 'Allow',
          buttonNegative: 'Deny',
        }
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert(
          'Camera Permission Denied',
          'Please enable camera access in your device Settings to take a photo.',
          [{ text: 'OK' }]
        );
        return false;
      }
      return true;
    } else {
      const sdkVersion = parseInt(Platform.Version as string, 10);
      const permission =
        sdkVersion >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

      const granted = await PermissionsAndroid.request(permission, {
        title: 'Photo Library Permission',
        message: 'StayRoyal needs access to your photos to update your profile photo.',
        buttonPositive: 'Allow',
        buttonNegative: 'Deny',
      });
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert(
          'Gallery Permission Denied',
          'Please enable photo library access in your device Settings to pick a photo.',
          [{ text: 'OK' }]
        );
        return false;
      }
      return true;
    }
  } catch (err) {
    console.warn('Permission request error:', err);
    return false;
  }
};

const AvatarPicker = ({ image, onImageChange, size = scale(130) }: AvatarPickerProps) => {
  const handlePickImage = async (method: 'CAMERA' | 'GALLERY') => {
    if (!NativeModules.ImageCropPicker && !NativeModules.RNCImageCropPicker) {
      Alert.alert(
        'Feature Unavailable',
        'The image picker native module is not linked. Please run "pod install" and rebuild the app.',
        [{ text: 'OK' }]
      );
      return;
    }

    if (Platform.OS === 'android') {
      const hasPermission = await requestAndroidPermission(method);
      if (!hasPermission) return;
    }

    try {
      const ImagePicker = require('react-native-image-crop-picker').default;

      const options = {
        width: 400,
        height: 400,
        cropping: true,
        cropperCircleOverlay: true,
        useFrontCamera: true,
        compressImageQuality: 0.8,
        mediaType: 'photo' as const,
      };

      const pickerAction =
        method === 'CAMERA'
          ? ImagePicker.openCamera(options)
          : ImagePicker.openPicker(options);

      pickerAction
        .then((response: any) => {
          onImageChange(response.path);
        })
        .catch((err: any) => {
          if (err.code !== 'E_PICKER_CANCELLED') {
            console.log('Error picking image:', err);
            Alert.alert('Error', 'Could not access image. Please try again.');
          }
        });
    } catch (error) {
      console.log('Image picker runtime error:', error);
      Alert.alert('Error', 'The image picker failed to initialize. Please restart the app.');
    }
  };

  const showOptions = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Photo', 'Choose from Gallery'],
          cancelButtonIndex: 0,
          title: 'Update Profile Photo',
        },
        (buttonIndex) => {
          if (buttonIndex === 1) handlePickImage('CAMERA');
          if (buttonIndex === 2) handlePickImage('GALLERY');
        }
      );
    } else {
      Alert.alert(
        'Update Profile Photo',
        'Choose a method to update your photo',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Take Photo', onPress: () => handlePickImage('CAMERA') },
          { text: 'Choose from Gallery', onPress: () => handlePickImage('GALLERY') },
        ]
      );
    }
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image
        source={{ uri: image }}
        style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
      />
      <TouchableOpacity style={styles.editBtn} onPress={showOptions} activeOpacity={0.8}>
        <Camera color={COLORS.BLACK} size={scale(18)} strokeWidth={2} />
        <Text style={styles.editBtnText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AvatarPicker;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    backgroundColor: '#F7F7F7',
  },
  editBtn: {
    position: 'absolute',
    bottom: -scale(10),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: scale(15),
    paddingVertical: scale(8),
    borderRadius: scale(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#EBEBEB',
  },
  editBtnText: {
    fontSize: scale(13),
    fontWeight: '600',
    color: COLORS.BLACK,
    marginLeft: scale(6),
  },
});
