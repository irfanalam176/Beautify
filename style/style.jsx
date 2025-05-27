import {Dimensions, StyleSheet} from 'react-native';
const mainColor = '#BE5985';
const secondaryColor = '#FFB8E0';
const lightColor = '#FFEDFA';
const darkColor = '#09122C';
const anchorColor = '#EC7FA9';
const width = Dimensions.get("window").width
export const style = StyleSheet.create({
  wrapper: {
    minHeight: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  mainBg: {
    minHeight: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: lightColor,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexEnd: {
    justifyContent: 'flex-end',
  },
  flexBetween:{
    justifyContent:"space-between"
  },
  flexAlignCenter:{
    alignItems:"center"
  },
  form: {
    backgroundColor: '#FFEDFA',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  mainHeading: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: mainColor,
  },
  lable: {
    color: darkColor,
    fontFamily: 'Poppins-Light',
  },
  input: {
    backgroundColor: secondaryColor,
    borderRadius: 10,
    color: darkColor,
    fontFamily: 'Poppins-Medium',
    paddingHorizontal: 10,
    paddingLeft: 50,
    paddingBottom: 10,
    paddingTop: 10,
  },
  inputBox: {
    position: 'relative',
    marginBottom: 10,
  },

  formIcon: {
    color: lightColor,
    position: 'absolute',
    zIndex: 99,
    top: '50%',
    left: 10,
    transform: [{translateY: -15}],
  },
  eyeIcon:{
    color: lightColor,
    position: 'absolute',
    zIndex: 99,
    top: '50%',
    right: 10,
    transform: [{translateY: -15}],
  },
  mainBtn: {
    backgroundColor: mainColor,
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 15,
  },
  mainBtnTxt: {
    color: lightColor,
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    textAlign: 'center',
  },
  anchor: {
    color: anchorColor,
  },
  anchorBtn: {
    color: anchorColor,
    fontFamily: 'Poppins-Bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
    paddingLeft: 40,
  },
  bottomHomeIcon: {
    backgroundColor: anchorColor,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    elevation: 3,
  },
  sliderItem: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  sliderText: {
    fontFamily: 'Poppins-ExtraBold',
    fontSize: 20,
    color: lightColor,
    textShadowColor: mainColor,
    textShadowRadius: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    marginHorizontal: 'auto',
    color: mainColor,
  },
  headerIcon: {
    color: mainColor,
  },
  mainTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
    color: darkColor,
    borderLeftColor: secondaryColor,
    borderLeftWidth: 3,
    paddingLeft: 10,
    marginVertical: 10,
  },
  mainText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
  },
  serviceGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    gap: 10,
  },
  serviceCard: {
    width: 105,
    borderColor: secondaryColor,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 1,
    alignItems: 'center',
    backgroundColor:"white",
    elevation:3
  },
  serviceCardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    objectFit: 'fill',
  },
  cardText: {
    fontFamily: 'Poppins-Light',
    textAlign: 'center',
    width: 100,
  },
  notAvailable: {
    fontFamily: 'Poppins-Light',
    textAlign: 'center',
    width: 100,
    fontSize: 10,
    color: 'red',
  },
  containerPadding: {
    paddingBottom: 80,
  },
  activeTab: {
    position: 'absolute',
    bottom: -5,
    height: 3,
    width: '100%',
    backgroundColor: mainColor,
    borderRadius: 10,
  },
  activeTabDashBoard:{
    marginBottom:-15
  },
  heroImage: {
    width: '100%',
    height: 300,
    objectFit: 'contain',
    aspectRatio: 1,
    borderRadius: 10,
    marginHorizontal: 'auto',
  },
  bookingCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    width: '90%',
    marginHorizontal: 'auto',
    marginBottom: 20,
  },
  smText: {
    color: darkColor,
    fontFamily: 'Poppins-Light',
    fontSize: 12,
  },
  bookingCardText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
  },
  // Add these to your style object
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  modalButton: {
    borderRadius: 5,
    padding: 10,
    width: '48%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  pickerButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerButtonText: {
    fontSize: 16,
    color: '#333',
  },
  pickerSelectedText: {
    fontSize: 16,
    color: '#555',
    fontWeight: 'bold',
  },

  galleryPic: {
    width: width/3.4,
    aspectRatio: 1,
    height: width/3.5,
    borderRadius: 10,
  },
  galleryGrid:{
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"flex-start",
    rowGap:15,
    columnGap:15
  },
  fullScreenModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  zoomableView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 5,
  },
  logOutCard:{
    backgroundColor:"white",
    padding:30,
    borderRadius:20,
    elevation:3,
    marginTop:20
  },
  dashboardCard:{
    backgroundColor:"#BDDDE4",
    padding:20,
    borderRadius:10,
    width:"90%",
    marginHorizontal:"auto",
    elevation:3,
    marginBottom:20
  },
  dashboardCardText:{
    fontFamily:"Poppins-Light",
    textAlign:"center",
    fontSize:20
  },
  cardAmount:{
    fontFamily:"Poppins-ExtraBold",
    fontSize:50,
    textAlign:"center"
  },
  tableHeader:{
    flexDirection:"row",

  },
  dailySaleTableHeading:{
    flex:1
  },
  dailySaleTableData:{
    flex:1
  },
  tableHeading:{
    backgroundColor:secondaryColor,
    width:"20%",
    borderWidth:1,
    borderColor:"white",
    paddingHorizontal:3
  },
  tableRow:{
    flexDirection:"row"
  },
  tableData:{
    backgroundColor:"white",
    width:"20%",
    borderWidth:1,
    borderColor:secondaryColor,
    paddingHorizontal:3
  },
  table:{
    width:700
  },
  tableContainer:{
    width:1000
  },
  tableImage:{
    width:50,
    height:50
  },
  dailyPLtable:{
    width:width-20,
  },

  // dropdown style
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },

});
