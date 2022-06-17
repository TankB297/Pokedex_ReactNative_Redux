import {View, Text} from 'react-native';
import React from 'react';
import ListItemStyles from '../Styles/ListItemStyles';

export default function ItemFilter({itemTypeName, themeColor, isSelected}) {
  return (
    <View
      style={[
        ListItemStyles.filterItem,
        {
          backgroundColor: isSelected ? 'white' : themeColor,
          borderColor: themeColor,
          borderWidth: 1,
        },
      ]}>
      <Text
        style={[
          ListItemStyles.filterContent,
          {color: isSelected ? 'black' : 'white'},
        ]}>
        {itemTypeName}
      </Text>
    </View>
  );
}
