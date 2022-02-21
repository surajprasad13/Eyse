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
    color: '#011E46',
  },

  secondarySText: {
    fontSize: 14,
    fontFamily: 'DidactGothic-Regular',
    color: '#373737',
  },
  secondaryMText: {
    fontSize: 16,
    fontFamily: 'DidactGothic-Regular',
    color: '#011E46',
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
    borderRadius: 13,
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
    paddingVertical: 20,
    paddingHorizontal: 10,
  },

  //for tag brand styles
  userSearch: {
    zIndex: 99,
    backgroundColor: 'rgba(225,225,225,0.85)',
  },
  userList: {
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  userListText: {
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#999',
    borderWidth: 1,
    width: width,
  },

  textInputStyle: {
    marginLeft: 20,
    height: 40,
    alignItems: 'flex-start',
    width: width - 50,
  },
  tagTriangle: {
    height: 0,
    width: 0,
    left: 15,
    borderLeftColor: 'transparent',
    borderLeftWidth: 7,
    borderRightColor: 'transparent',
    borderRightWidth: 7,
    borderBottomColor: '#011E46',
    borderBottomWidth: 7,
  },
  tagUserView: {
    backgroundColor: '#011E46',
    borderRadius: 10,
    borderColor: 'rgba(0,0,0,.30)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagListText: {
    color: 'white',
    fontWeight: '800',
  },
});
