import {View, Text, Image, Dimensions, ActivityIndicator} from 'react-native';
import React from 'react';
import ItemStyles from '../Styles/ItemStyles';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function Item({
  name,
  image,
  type01,
  type02,
  background,
  backgroundType01,
  backgroundType02,
}) {
  return (
    <View
      style={{
        width: screenWidth / 2 - 20,
        padding: screenWidth / 45,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        margin: screenWidth / 55,
        backgroundColor: background,
      }}>
      <View style={ItemStyles.itemSubContainer01}>
        <Text style={ItemStyles.itemTitle}>{name}</Text>
      </View>
      <View style={ItemStyles.itemSubContainer02}>
        <View>
          <View
            style={{
              padding: 5,
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 10,
              marginTop: screenWidth / 45,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: backgroundType01,
            }}>
            <Text style={ItemStyles.contentType}>{type01}</Text>
          </View>
          {type02 !== undefined && (
            <View
              style={{
                padding: 5,
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 10,
                marginTop: screenWidth / 45,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: backgroundType02,
              }}>
              <Text style={ItemStyles.contentType}>{type02}</Text>
            </View>
          )}
        </View>
        <View>
          {typeof image === 'string' ? (
            <Image
              source={{
                uri: image,
              }}
              style={ItemStyles.itemImage}
            />
          ) : (
            <ActivityIndicator style={{marginLeft: 48}} size={25} />
          )}
        </View>
      </View>
    </View>
  );
}
export default Item;
