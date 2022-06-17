import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchListItem,
  succeedListItem,
  failListItem,
  searchListItem,
  succeedSearchListItem,
  failSearchListItem,
  addToFavourite,
} from '../Redux/listItemSlice';
import ListItemStyles from '../Styles/ListItemStyles';
import DetailItem from './DetailItem';
import Item from './Item';

export default function ListFavouriteItem({navigation}) {
  const {list, loading, error, listSearch, listFavourite} = useSelector(
    state => state.listItem,
  );
  const dispatch = useDispatch();

  const renderItem = ({item}) => (
    <Item
      name={item.name}
      image={item.image}
      type01={item.type01}
      type02={item.type02}
      background={item.background}
      backgroundType01={item.backgroundType01}
      backgroundType02={item.backgroundType02}
    />
  );

  return (
    <View style={ListItemStyles.itemContainer}>
      {listFavourite.length === 0 ? (
        <Text style={{fontSize: 18,
        marginTop: 340}}>You don't have any favourite pokemon...</Text>
      ) : (
        <FlatList
          data={listFavourite}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          maxToRenderPerBatch={10}
        />
      )}
    </View>
  );
}
