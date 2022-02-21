import {Dimensions, StatusBar, StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerWrapper: {
    marginTop: StatusBar.currentHeight,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 30,
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
    color: '#015DD3',
  },
  primaryXSText: {
    fontSize: 12,
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
    color: '#373737',
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
    borderRadius: 5,
    width: width / 2.4,
    height: 45,
    borderColor: '#677890',
    borderWidth: 1,
    justifyContent: 'center',
  },
  submitBtnWrapper: {
    backgroundColor: colors.primaryBackground,
    borderRadius: 10,
    padding: 5,
  },
  modelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modelWrapper: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    width: width / 2,
  },
  modelTextWrapper: {
    borderBottomWidth: 0.5,
    borderColor: '#E6E8EC',
    paddingVertical: 10,
  },
  //extra
  modal: {
    width: width - 60,
    padding: 25,
    backgroundColor: 'white',
    height: height * 0.5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  containerModel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
