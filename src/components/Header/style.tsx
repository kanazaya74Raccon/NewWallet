import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: width * 0.03
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: width * 0.03,
    justifyContent: 'flex-start',
  },
});