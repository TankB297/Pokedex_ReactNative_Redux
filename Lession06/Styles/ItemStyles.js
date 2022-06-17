import {StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ItemStyles = StyleSheet.create({
  itemSubContainer01: {
    textAlign: 'left',
  },
  itemSubContainer02: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: screenHeight / 60,
  },
  itemImage: {
    width: screenWidth / 4,
    height: screenWidth / 4,
    marginLeft: screenWidth / 45,
  },
  contentType: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
});
export default ItemStyles;
