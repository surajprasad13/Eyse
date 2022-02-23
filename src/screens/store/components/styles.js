import {StyleSheet, Dimensions} from 'react-native';
const fontRegular = 'DidactGothic-Regular';
const fontMedium = 'NotoSans-Regular';
const fontBold = 'NotoSans-Bold';
const {width, height} = Dimensions.get('screen');
export const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 20,
    fontFamily: fontBold,
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 7,
    color: '#011E46',
  },
  storeText: {
    textAlign: 'center',
    fontFamily: fontMedium,
    color: '#011E46',
    fontSize: 16,
  },
  storeButton: {
    backgroundColor: '#015DD3',
    width: 260,
    height: 60,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  icon42: {
    width: 42,
    height: 42,
  },

  icon10: {
    width: 10,
    height: 10,
  },

  icon16: {
    width: 16,
    height: 16,
  },

  icon20: {
    width: 20,
    height: 20,
  },

  icon24: {
    width: 24,
    height: 24,
  },

  icon28: {
    width: 28,
    height: 28,
  },

  icon32: {
    width: 32,
    height: 32,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 6,
    paddingVertical: 12,
  },

  iconBtn: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBtnText: {
    fontSize: 14,
    fontFamily: fontRegular,
    color: '#99A5B5',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontFamily: fontBold,
    color: '#011E46',
    marginLeft: 6,
  },

  card: {
    width: width,
    //backgroundColor: '#fff',
    borderRadius: 25,
    //elevation: 3,
    paddingBottom: 20,
  },

  imgFull: {
    width: width - 30,
    height: 210,
    alignSelf: 'center',
    marginTop: 15,
    borderRadius: 18,
    resizeMode: 'cover',
  },

  imgMinimal: {
    width: width - 30,
    height: 210,
    alignSelf: 'center',
    borderRadius: 10,
    //marginHorizontal: 7.5,
    resizeMode: 'cover',
  },

  imageContainer: {
    marginTop: 10,
    marginHorizontal: 4.5,
  },

  floatingActionBtn: {
    width: 55,
    height: 55,
    borderRadius: 30,
    elevation: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
    right: 8,
    bottom: 80,
  },

  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },

  navItem: {
    flex: 1,
    alignSelf: 'baseline',
    marginTop: 12,
    alignItems: 'center',
  },

  navName: {
    fontSize: 16,
    fontFamily: fontMedium,
    color: '#015DD3',
    paddingVertical: 4,
    paddingHorizontal: 13,
  },

  navActive: {
    width: '100%',
    borderBottomColor: '#015DD3',
    borderBottomWidth: 4,
  },

  productName: {
    fontSize: 20,
    fontFamily: fontBold,
    color: '#015DD3',
    marginHorizontal: 15,
    marginTop: 15,
  },

  badgeMinimal: {
    backgroundColor: '#015DD3',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6,
  },

  metaData: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 8,
    paddingBottom: 10,
    borderBottomColor: '#E6E8EC',
    borderBottomWidth: 1,
  },

  elementsInRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  elementsInRowJSB: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  soldBy: {
    fontSize: 16,
    fontFamily: fontRegular,
    color: '#011E46',
    width: 160,
  },

  location: {
    fontSize: 14,
    fontFamily: fontRegular,
    color: '#677890',
  },

  iconBtnContainer: {
    alignItems: 'center',
  },

  iconBg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F7FD',
  },

  iconBtnLabel: {
    fontSize: 14,
    fontFamily: fontRegular,
    color: '#373737',
    marginTop: 6,
  },

  iconBtnBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 24,
  },

  textSmall: {
    fontSize: 12,
    fontFamily: fontMedium,
    color: '#677890',
    marginRight: 2,
  },

  textMedium: {
    fontSize: 14,
    fontFamily: fontRegular,
    color: '#99A5B5',
    marginLeft: 2,
  },

  uiDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#E6E8EC',
    alignSelf: 'center',
  },

  priceMembers: {
    fontSize: 14,
    fontFamily: fontMedium,
    color: '#015DD3',
  },

  becomeMemberBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 3,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginVertical: 8,
  },
  verifiedButton: {
    width: 60,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#015DD3',
    borderRadius: 16,
  },
  verified: {color: '#fff', fontFamily: fontRegular, fontSize: 12},

  productPrice: {
    fontSize: 20,
    fontFamily: fontBold,
    color: '#011E46',
  },

  productPriceMRP: {
    fontSize: 14,
    fontFamily: fontRegular,
    color: '#B3BBC7',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    marginLeft: 6,
  },

  offerText: {
    fontSize: 14,
    fontFamily: fontMedium,
    color: '#FF9E00',
    marginTop: 8,
  },

  labelText: {
    fontSize: 14,
    fontFamily: fontMedium,
    color: '#677890',
  },

  valueText: {
    fontSize: 16,
    fontFamily: fontRegular,
    color: '#677890',
    marginBottom: 6,
  },

  estimatedTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F7FD',
    marginTop: 22,
    paddingVertical: 6,
    paddingHorizontal: 15,
  },

  sectionBox: {
    marginTop: 35,
    marginHorizontal: 25,
  },

  sectionTitle: {
    fontSize: 18,
    fontFamily: fontMedium,
    color: '#011E46',
  },

  sectionDescription: {
    fontSize: 14,
    fontFamily: fontMedium,
    color: '#677890',
    marginTop: 6,
  },

  btnLite: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#F2F7FD',
    alignSelf: 'center',
    marginTop: 22,
  },

  readMoreBtn: {
    fontSize: 14,
    fontFamily: fontRegular,
    color: '#347DDC',
    marginVertical: 8,
    alignSelf: 'flex-end',
  },

  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginHorizontal: 15,
  },

  filterDropdownLabel: {
    fontSize: 14,
    fontFamily: fontMedium,
    color: '#677890',
    marginHorizontal: 3,
  },

  text16: {
    fontSize: 16,
    fontFamily: fontRegular,
    color: '#011E46',
  },

  viewShopBtn: {
    backgroundColor: '#F2F7FD',
    borderRadius: 6,
    paddingHorizontal: 15,
    paddingVertical: 6,
    elevation: 3,
    alignSelf: 'center',
    marginTop: 18,
    height: 50,
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },

  viewShopBtnText: {
    fontSize: 14,
    fontFamily: fontRegular,
    color: '#011E46',
  },
  harvestText: {
    fontSize: 14,
    fontFamily: fontRegular,
    color: '#015DD3',
  },

  sendQuoteBtn: {
    backgroundColor: '#F2F7FD',
    borderRadius: 10,
    padding: 10,
    marginTop: 18,
    alignItems: 'center',
  },

  sendQuoteBtnText: {
    fontSize: 14,
    fontFamily: fontMedium,
    color: '#677890',
  },

  actionBtn: {
    flex: 1,
    backgroundColor: '#015DD3',
    padding: 10,
    borderRadius: 20,
  },

  actionBtnText: {
    fontSize: 14,
    fontFamily: fontBold,
    color: '#fff',
    textAlign: 'center',
  },

  actionBtnTextThin: {
    fontSize: 14,
    fontFamily: fontMedium,
    color: '#011E46',
    textAlign: 'center',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 40,

    paddingVertical: 60,
  },

  uiBox: {
    width: 90,
    height: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    elevation: 3,
    alignSelf: 'center',
    marginVertical: 10,
  },

  modalCard: {
    borderRadius: 13,
    backgroundColor: '#fff',
    elevation: 8,
  },

  modalTitle: {
    fontSize: 16,
    fontFamily: fontRegular,
    color: '#015DD3',
    borderBottomColor: '#E6E8EC',
    borderBottomWidth: 0.5,
    paddingBottom: 9,
    marginHorizontal: 15,
    paddingTop: 15,
  },

  modalCircle: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#F2F7FD',
    marginHorizontal: 7.5,
  },

  circleText: {
    fontSize: 14,
    fontFamily: fontRegular,
    color: '#000',
  },

  placeAbsolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(1,93,211,0.5)',
  },

  center: {
    width: 73,
    alignItems: 'center',
  },

  quantitybox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 2,
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 3,
  },

  quantityText: {
    fontSize: 15,
    fontFamily: fontMedium,
    color: '#677890',
    marginRight: 5,
  },

  submitBtn: {
    width: 200,
    height: 34,
    borderRadius: 25,
    elevation: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
  },

  submitBtnText: {
    fontSize: 14,
    fontFamily: fontMedium,
    color: '#000',
  },
});
