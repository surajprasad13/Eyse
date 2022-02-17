import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  primaryMTextBold: {
    fontSize: 14,
    fontFamily: 'NotoSans-Bold',
    color: '#011E46',
  },
  primaryLTextBold: {
    fontSize: 20,
    fontFamily: 'NotoSans-Bold',
    color: '#011E46',
  },
  primarySText: {
    fontSize: 14,
    fontFamily: 'NotoSans-Regular',
    color: '#677890',
  },
  primaryMText: {
    fontSize: 16,
    fontFamily: 'NotoSans-Regular',
    color: '#677890',
  },

  secondarySText: {
    fontSize: 14,
    fontFamily: 'DidactGothic-Regular',
    color: '#015DD3',
  },
  secondaryMText: {
    fontSize: 16,
    fontFamily: 'DidactGothic-Regular',
    color: '#015DD3',
  },
  btnWrapper: {
    alignItems: 'center',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnLoginWith: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    width: width / 2,
    height: 45,
    borderColor: '#677890',
    borderWidth: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  submitBtnWrapper: {
    backgroundColor: colors.primaryBackground,
    borderRadius: 13,
    padding: 10,
    paddingHorizontal: 15,
  },
});
