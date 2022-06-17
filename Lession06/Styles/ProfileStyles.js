import {StyleSheet, Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ProfileStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  subcontainer: {
    flex: 1.5 / 4,
    alignItems: 'center',
    position: 'relative',
  },
  wallpaperContainer: {
    width: screenWidth,
    height: screenHeight / 4,
  },
  wallpaper: {
    width: screenWidth,
    height: screenWidth / 2,
  },
  pickWallpaper: {
    position: 'absolute',
    top: screenWidth / 2.5,
    right: 8,
  },
  pickWallpaperIcon: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 100,
    width: 30,
    padding: 5,
    backgroundColor: 'white',
  },
  avatarContainer: {
    position: 'absolute',
    top: screenWidth / 2 - 60,
  },
  avatar: {
    width: screenWidth / 3.3,
    height: screenWidth / 3.3,
    borderRadius: 50,
  },
  pickAvatar: {
    position: 'absolute',
    top: screenWidth / 4,
    left: screenWidth / 5,
  },
  pickAvatarIcon: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 100,
    width: 30,
    padding: 5,
    backgroundColor: 'white',
  },
  optionContainer: {
    alignItems: 'center'
  },
  optionButton: {
    width: screenWidth / 1.5,
    alignItems: 'center',
    backgroundColor: '#EA5D60',
    borderRadius: 15,
    padding: screenWidth / 30,
    paddingTop: screenWidth / 25,
    paddingBottom: screenWidth / 25,
    marginTop: screenWidth / 20,
  },
  optionContent: {
    color: 'white',
    fontSize: 15
  }
});
export default ProfileStyles;
