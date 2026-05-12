import { ArrowRight } from 'lucide-react-native';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { moderateScale, scale } from 'react-native-size-matters';
import { COLORS } from '../../constants/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BUTTON_WIDTH = SCREEN_WIDTH - scale(40);
const BUTTON_HEIGHT = scale(64);
const OFFSET = scale(6);
const THUMB_SIZE = BUTTON_HEIGHT - OFFSET * 2;
const SWIPE_RANGE = BUTTON_WIDTH - THUMB_SIZE - OFFSET * 2;

interface SliderButtonProps {
  onSwipeComplete: () => void;
}

const SliderButton: React.FC<SliderButtonProps> = ({ onSwipeComplete }) => {
  const translateX = useSharedValue(0);
  const isFinished = useSharedValue(false);

  const gesture = Gesture.Pan()
    .onUpdate(event => {
      if (isFinished.value) return;
      let newValue = event.translationX;
      if (newValue < 0) newValue = 0;
      if (newValue > SWIPE_RANGE) newValue = SWIPE_RANGE;
      translateX.value = newValue;
    })
    .onEnd(() => {
      if (isFinished.value) return;
      if (translateX.value > SWIPE_RANGE * 0.8) {
        translateX.value = withSpring(SWIPE_RANGE, {
          damping: 20,
          stiffness: 90,
        });
        isFinished.value = true;
        runOnJS(onSwipeComplete)();
      } else {
        translateX.value = withSpring(0, {
          damping: 20,
          stiffness: 90,
        });
      }
    });

  const animatedThumbStyle = useAnimatedStyle(() => {
    const scaleX = interpolate(
      translateX.value,
      [0, SWIPE_RANGE * 0.5, SWIPE_RANGE],
      [1, 1.25, 1],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{ translateX: translateX.value }, { scaleX: scaleX }],
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, SWIPE_RANGE * 0.5],
      [1, 0],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
      transform: [
        {
          translateX: interpolate(
            translateX.value,
            [0, SWIPE_RANGE],
            [0, SWIPE_RANGE / 4],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: translateX.value + THUMB_SIZE + OFFSET,
      opacity: interpolate(
        translateX.value,
        [0, 10],
        [0, 1],
        Extrapolate.CLAMP,
      ),
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        {/* Background text / Shimmer effect placeholder */}
        <Animated.View style={[styles.textContainer, animatedTextStyle]}>
          <Text style={styles.text}>Slide to explore</Text>
        </Animated.View>

        {/* Progress Fill */}
        <Animated.View style={[styles.progress, animatedProgressStyle]} />

        {/* Swipe Thumb */}
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.thumb, animatedThumbStyle]}>
            <View style={styles.iconCircle}>
              <ArrowRight
                color={COLORS.BLACK}
                size={scale(24)}
                strokeWidth={3}
              />
            </View>
          </Animated.View>
        </GestureDetector>
      </View>
    </View>
  );
};

export default SliderButton;

const styles = StyleSheet.create({
  container: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: BUTTON_HEIGHT / 2,
    padding: OFFSET,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignSelf: 'center',
  },
  track: {
    flex: 1,
    justifyContent: 'center',
  },
  progress: {
    position: 'absolute',
    left: -OFFSET,
    height: BUTTON_HEIGHT,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: BUTTON_HEIGHT / 2,
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  iconCircle: {
    width: '100%',
    height: '100%',
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: moderateScale(16),
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
