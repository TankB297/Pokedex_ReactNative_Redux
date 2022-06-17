import {StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const DetailItemStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: screenWidth,
    height: screenHeight,
    position: 'relative'
  },
  header01: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: screenWidth / 15,
    alignItems: 'center',
  },
  header02: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: screenWidth / 15,
    paddingRight: screenWidth / 15,
  },
  header02Title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: screenHeight / 50,
  },
  header02SubTitleContainer01: {
    padding: 7,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: screenWidth / 50,
  },
  header02SubTitleContainer02: {
    padding: 7,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header02Sub: {
    flexDirection: 'row',
  },
  header02Number: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  header02MainContainer: {
    width: screenWidth,
    height: screenHeight / 3,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
    top: screenHeight / 9.5,
    zIndex: 10
  },
  image: {
    width: screenWidth / 2,
    height: screenWidth / 2,
  },
  mainContainer: {
    backgroundColor: 'white',
    width: screenWidth,
    height: screenHeight,
    marginTop: screenHeight / 6,
    borderRadius: 25,
    alignItems: 'center',
    padding: screenWidth / 15,
  },
  header02Content: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  mainSubContainer: {
    width: screenWidth / 1.15,
    height: screenHeight / 2.05,
    marginTop: screenHeight / 24,
  },
  mainSubTitleContainer: {
    width: screenWidth / 1.15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subTitle: {
    padding: screenWidth / 30,
    textAlign: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  mainContentContainer: {
    width: screenWidth / 1.15,
    height: screenHeight / 2.3,
  },
  baseStatsContainer: {
    width: screenWidth / 1.15,
    height: screenHeight / 2.3,
  },
  evolutionContainer: {
    width: screenWidth / 1.15,
    height: screenHeight / 2.3,
  },
  mainSubTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  mainContentSubContainer: {
    width: screenWidth / 1.15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  baseStatsSubContainer: {
    width: screenWidth / 1.15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  mainContent01: {
    flex: 1/3,
    margin: screenWidth / 30,
    justifyContent: 'center'
  },
  baseStatsContent01: {
    flex: 1/4,
    margin: screenWidth / 30,
    justifyContent: 'center',
  },
  mainContent02: {
    flex: 2/3,
    margin: screenWidth / 30,
    justifyContent: 'center'
  },
  baseStatsContent02: {
    flex: 0.5/4,
    margin: screenWidth / 30,
    justifyContent: 'center',
  },
  baseStatsContent03: {
    flex: 2.5/4,
    margin: screenWidth / 30,
    justifyContent: 'center',
    backgroundColor: '#C3C6C2',
    borderRadius: 10
  },
  content01: {
    fontSize: 15,
    color: 'grey',
    fontWeight: 'bold',
    opacity: 0.6
  },
  baseStats01: {
    fontSize: 15,
    color: 'grey',
    fontWeight: 'bold',
    opacity: 0.6
  },
  content02: {
    fontSize: 15,
    color: 'black',
  },
  baseStats02: {
    fontSize: 15,
    color: 'black',
  },
  baseStats03: {
    height: 8,
    borderRadius: 10,
  },
  evolutionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  evolutionImage: {
    width: screenWidth / 3.5,
    height: screenWidth / 3.5,
  },
  evolutionIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  evolutionText: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold'
  },
  evolutionText01: {
    fontSize: 15,
    color: 'grey',
    fontWeight: 'bold'
  },
  evolutionText02: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold'
  },
  evolutionImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
export default DetailItemStyles;
