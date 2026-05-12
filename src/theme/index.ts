import { COLORS } from '../constants/colors';
import { scale } from 'react-native-size-matters';

export const SPACING = {
  xs: scale(4),
  sm: scale(8),
  md: scale(16),
  lg: scale(24),
  xl: scale(32),
};

export const theme = {
  colors: COLORS,
  spacing: SPACING,
};

export type Theme = typeof theme;
