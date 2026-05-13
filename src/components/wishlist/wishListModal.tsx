import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Modal, Image, Animated, Dimensions } from 'react-native';
import { scale, moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../constants/colors';

const { width } = Dimensions.get('window');

interface WishlistModalProps {
    visible: boolean;
    onClose: () => void;
    onCreate: (name: string) => void;
}

export const WishlistModal = ({ visible, onClose, onCreate }: WishlistModalProps) => {
    const [name, setName] = useState('');

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Create wishlist</Text>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            placeholderTextColor={COLORS.GRAY}
                            value={name}
                            onChangeText={setName}
                            maxLength={50}
                            autoFocus
                        />
                    </View>
                    <Text style={styles.charCount}>{name.length}/50 characters</Text>

                    <View style={styles.divider} />

                    <View style={styles.footer}>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.createBtn, !name && styles.createBtnDisabled]}
                            onPress={() => {
                                if (name) {
                                    onCreate(name);
                                    setName('');
                                }
                            }}
                            disabled={!name}
                        >
                            <Text style={[styles.createBtnText, !name && styles.createBtnTextDisabled]}>Create</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

interface WishlistToastProps {
    visible: boolean;
    image: string;
    wishlistName: string;
    onHide: () => void;
    onChange?: () => void;
}

export const WishlistToast = ({ visible, image, wishlistName, onHide, onChange }: WishlistToastProps) => {
    const translateY = useState(new Animated.Value(100))[0];

    useEffect(() => {
        if (visible) {
            Animated.spring(translateY, {
                toValue: 0,
                useNativeDriver: true,
                tension: 40,
                friction: 7,
            }).start();

            const timer = setTimeout(() => {
                hideToast();
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [visible]);

    const hideToast = () => {
        Animated.timing(translateY, {
            toValue: 100,
            duration: 300,
            useNativeDriver: true,
        }).start(() => onHide());
    };

    if (!visible) return null;

    return (
        <Animated.View style={[styles.toastContainer, { transform: [{ translateY }] }]}>
            <View style={styles.toastContent}>
                <Image source={{ uri: image }} style={styles.toastImage} />
                <Text style={styles.toastText}>Saved to {wishlistName}</Text>
                <TouchableOpacity onPress={onChange}>
                    <Text style={styles.changeText}>Change</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: COLORS.MODAL_OVERLAY,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.WHITE,
        borderTopLeftRadius: scale(20),
        borderTopRightRadius: scale(20),
        padding: scale(20),
        paddingBottom: scale(30),
    },
    modalTitle: {
        fontSize: scale(18),
        fontWeight: '700',
        color: COLORS.BLACK,
        marginBottom: scale(25),
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: COLORS.BLACK,
        borderRadius: scale(12),
        paddingHorizontal: scale(15),
        height: scale(55),
        justifyContent: 'center',
    },
    input: {
        fontSize: scale(16),
        color: COLORS.BLACK,
    },
    charCount: {
        fontSize: scale(12),
        color: COLORS.GRAY,
        marginTop: scale(8),
        marginBottom: scale(20),
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.SECTION_DIVIDER,
        marginHorizontal: -scale(20),
        marginBottom: scale(20),
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cancelText: {
        fontSize: scale(16),
        fontWeight: '600',
        color: COLORS.BLACK,
        textDecorationLine: 'underline',
    },
    createBtn: {
        backgroundColor: COLORS.BLACK,
        paddingHorizontal: scale(25),
        paddingVertical: scale(12),
        borderRadius: scale(8),
    },
    createBtnDisabled: {
        backgroundColor: COLORS.LIGHT_GRAY_BORDER,
    },
    createBtnText: {
        fontSize: scale(16),
        fontWeight: '600',
        color: COLORS.WHITE,
    },
    createBtnTextDisabled: {
        color: COLORS.GRAY,
    },
    toastContainer: {
        position: 'absolute',
        bottom: scale(30),
        left: scale(20),
        right: scale(20),
        zIndex: 1000,
    },
    toastContent: {
        backgroundColor: COLORS.WHITE,
        borderRadius: scale(12),
        padding: scale(12),
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    toastImage: {
        width: scale(45),
        height: scale(45),
        borderRadius: scale(8),
        backgroundColor: COLORS.IMAGE_BG,
    },
    toastText: {
        flex: 1,
        marginLeft: scale(15),
        fontSize: scale(14),
        fontWeight: '500',
        color: COLORS.BLACK,
    },
    changeText: {
        fontSize: scale(14),
        fontWeight: '600',
        color: COLORS.BLACK,
        textDecorationLine: 'underline',
        marginLeft: scale(10),
    },
});
