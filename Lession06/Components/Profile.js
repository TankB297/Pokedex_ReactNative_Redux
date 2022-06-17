import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useRef} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchListItem,
  succeedListItem,
  failListItem,
  searchListItem,
  succeedSearchListItem,
  failSearchListItem,
  addToFavourite,
  updateAvatar,
  updateWallpaper,
} from '../Redux/listItemSlice';
import ProfileStyles from '../Styles/ProfileStyles';
import RBSheet from 'react-native-raw-bottom-sheet';

export default function Profile() {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const {list, loading, error, listSearch, avatar, wallpaper} = useSelector(
    state => state.listItem,
  );
  const dispatch = useDispatch();

  const refRBSheet = useRef();
  const refRBSheet02 = useRef();

  const pickAvatarFromGallery = () => {
    ImagePicker.openPicker({
      width: screenWidth / 3.3,
      height: screenWidth / 3.3,
      cropping: true,
    })
      .then(image => {
        dispatch(updateAvatar(image.path));
        Alert.alert('Success', 'Avatar updated');
      })
      .catch(err => {
        Alert.alert('Error', err.message);
      })
      .finally(() => {
        refRBSheet.current.close();
      });
  };

  const pickAvatarFromCamera = () => {
    ImagePicker.openCamera({
      width: screenWidth / 3.3,
      height: screenWidth / 3.3,
      cropping: true,
    })
      .then(image => {
        dispatch(updateAvatar(image.path));
        Alert.alert('Success', 'Avatar updated');
      })
      .catch(err => {
        Alert.alert('Error', err.message);
      })
      .finally(() => {
        refRBSheet.current.close();
      });
  };

  const pickWallpaperFromGallery = () => {
    ImagePicker.openPicker({
      width: screenWidth,
      height: screenWidth / 2,
      cropping: true,
    })
      .then(image => {
        dispatch(updateWallpaper(image.path));
        Alert.alert('Success', 'Wallpaper updated');
      })
      .catch(err => {
        Alert.alert('Error', err.message);
      })
      .finally(() => {
        refRBSheet02.current.close();
      });
  };

  const pickWallpaperFromCamera = () => {
    ImagePicker.openCamera({
      width: screenWidth,
      height: screenWidth / 2,
      cropping: true,
    })
      .then(image => {
        dispatch(updateWallpaper(image.path));
        Alert.alert('Success', 'Wallpaper updated');
      })
      .catch(err => {
        Alert.alert('Error', err.message);
      })
      .finally(() => {
        refRBSheet02.current.close();
      });
  };

  const optionPickAvatar = () => (
    <View style={ProfileStyles.optionContainer}>
      <TouchableOpacity
        onPress={() => pickAvatarFromGallery()}
        style={ProfileStyles.optionButton}>
        <Text style={ProfileStyles.optionContent}>Choose from gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => pickAvatarFromCamera()}
        style={ProfileStyles.optionButton}>
        <Text style={ProfileStyles.optionContent}>Open your camera</Text>
      </TouchableOpacity>
    </View>
  );

  const optionPickWallpaper = () => (
    <View style={ProfileStyles.optionContainer}>
      <TouchableOpacity
        onPress={() => pickWallpaperFromGallery()}
        style={ProfileStyles.optionButton}>
        <Text style={ProfileStyles.optionContent}>Choose from gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => pickWallpaperFromCamera()}
        style={ProfileStyles.optionButton}>
        <Text style={ProfileStyles.optionContent}>Open your camera</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={ProfileStyles.container}>
      <View style={ProfileStyles.subcontainer}>
        <View style={ProfileStyles.wallpaperContainer}>
          {wallpaper === 'Empty' ? (
            <Image
              style={ProfileStyles.wallpaper}
              source={require('../Images/wallpaperDefault.jpg')}
            />
          ) : (
            <Image style={ProfileStyles.wallpaper} source={{uri: wallpaper}} />
          )}
          <TouchableOpacity
            style={ProfileStyles.pickWallpaper}
            onPress={() => refRBSheet02.current.open()}>
            <Ionicons
              style={ProfileStyles.pickWallpaperIcon}
              name={'camera'}
              size={20}
              color={'black'}
            />
          </TouchableOpacity>
        </View>
        <View style={ProfileStyles.avatarContainer}>
          {avatar === 'Empty' ? (
            <Image
              style={ProfileStyles.avatar}
              source={require('../Images/avatarDefault.jpg')}
            />
          ) : (
            <Image style={ProfileStyles.avatar} source={{uri: avatar}} />
          )}
          <TouchableOpacity
            style={ProfileStyles.pickAvatar}
            onPress={() => refRBSheet.current.open()}>
            <Ionicons
              style={ProfileStyles.pickAvatarIcon}
              name={'camera'}
              size={20}
              color={'black'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={screenHeight / 3.8}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
            borderWidth: 1,
            borderColor: '#000',
          },
        }}>
        {optionPickAvatar()}
      </RBSheet>
      <RBSheet
        ref={refRBSheet02}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={screenHeight / 3.8}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
            borderWidth: 1,
            borderColor: '#000',
          },
        }}>
        {optionPickWallpaper()}
      </RBSheet>
    </View>
  );
}
