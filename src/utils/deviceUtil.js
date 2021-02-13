import { Dimensions } from 'react-native';

/**
 * Screen width
 */
export const screenWidth = Dimensions.get("window").width;
/**
 * Screen height
 */
export const screenHeight = Dimensions.get("window").height;

/**
 * android: from px to dp
 * @param {number} px width or height at px unit
 */
export const px2Dp = (px) => screenWidth * px / 375;