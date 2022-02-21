import {Dimensions, StatusBar, StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerWrapper: {
    marginTop: StatusBar.currentHeight + 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
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
  primaryMText: {
    fontSize: 14,
    fontFamily: 'NotoSans-Regular',
    color: '#677890',
  },
  primarySText: {
    fontSize: 12,
    fontFamily: 'NotoSans-Regular',
    color: '#99A5B5',
  },
  secondaryMText: {
    fontSize: 14,
    fontFamily: 'DidactGothic-Regular',
    color: '#015DD3',
  },
  submitBtnWrapper: {
    borderRadius: 13,
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.primaryBackground,
  },

  //extra
  modal: {
    width: width - 60,
    padding: 25,
    backgroundColor: 'white',
    height: height * 0.5,
    borderRadius: 10,
    justifyContent: 'space-between',
  },

  containerModel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
