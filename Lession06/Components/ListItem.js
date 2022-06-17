import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Item from './Item';
import axios from 'axios';
import ListItemStyles from '../Styles/ListItemStyles';
import {PokemonThemes} from '../Styles/PokemonBackground';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchListItem,
  succeedListItem,
  failListItem,
  searchListItem,
  succeedSearchListItem,
  failSearchListItem,
} from '../Redux/listItemSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import ItemFilter from './ItemFilter';

function ListItem({navigation}) {
  // Redux:
  const {list, loading, error, listSearch} = useSelector(
    state => state.listItem,
  );
  const dispatch = useDispatch();

  // Search:
  const [search, setSearch] = useState();

  // Sort:
  const refRBSheet = useRef();
  const [smallestFirst, setSmallestFirst] = useState(false);
  const [highestFirst, setHighestFirst] = useState(false);
  const [alphabetical, setAlphabetical] = useState(false);
  const [reverseAlphabetical, setReverseAlphabetical] = useState(false);

  //Fitler:
  const refRBSheet02 = useRef();
  const [listNameType, setListNameType] = useState([
    {type: 'normal', isSelected: false},
    {type: 'fighting', isSelected: false},
    {type: 'flying', isSelected: false},
    {type: 'poison', isSelected: false},
    {type: 'ground', isSelected: false},
    {type: 'rock', isSelected: false},
    {type: 'bug', isSelected: false},
    {type: 'ghost', isSelected: false},
    {type: 'steel', isSelected: false},
    {type: 'fire', isSelected: false},
    {type: 'water', isSelected: false},
    {type: 'grass', isSelected: false},
    {type: 'electric', isSelected: false},
    {type: 'psychic', isSelected: false},
    {type: 'ice', isSelected: false},
    {type: 'dragon', isSelected: false},
    {type: 'dark', isSelected: false},
    {type: 'fairy', isSelected: false},
  ]);
  const listTemp = useRef([]);
  const listAll = useRef([]);

  // Load more:
  const [newNumber, setNewNumber] = useState(40);
  const [oldNumber, setOldNumber] = useState(20);

  // Dimensions:
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    fetchData();
    fetchAllData();
  }, []);

  const backgroundThemes = type => {
    switch (type) {
      case 'grass':
        return PokemonThemes.grass;
      case 'bug':
        return PokemonThemes.bug;
      case 'dark':
        return PokemonThemes.dark;
      case 'dragon':
        return PokemonThemes.dragon;
      case 'electric':
        return PokemonThemes.electric;
      case 'fairy':
        return PokemonThemes.fairy;
      case 'fighting':
        return PokemonThemes.fighting;
      case 'fire':
        return PokemonThemes.fire;
      case 'flying':
        return PokemonThemes.flying;
      case 'ghost':
        return PokemonThemes.ghost;
      case 'ground':
        return PokemonThemes.ground;
      case 'ice':
        return PokemonThemes.ice;
      case 'normal':
        return PokemonThemes.normal;
      case 'poison':
        return PokemonThemes.poison;
      case 'psychic':
        return PokemonThemes.psychic;
      case 'rock':
        return PokemonThemes.rock;
      case 'shadow':
        return PokemonThemes.shadow;
      case 'steel':
        return PokemonThemes.steel;
      case 'unknown':
        return PokemonThemes.unknown;
      case 'water':
        return PokemonThemes.water;
    }
  };

  const fetchAllData = async () => {
    try {
      // Tạo một mảng tạm thời chứa dữ liệu
      const list02 = await [];

      // Lấy dữ liệu danh sách link Pokemon từ API
      const res01 = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0',
      );
      const data01 = await res01.data.results;

      // Lấy dữ liệu từ mỗi Pokemon
      for (let index = 0; index < data01.length; index++) {
        const res02 = await axios.get(data01[index].url);
        const data02 = await res02.data;
        const newItem = await {};
        newItem['id'] = await index;
        newItem['name'] =
          (await data02['name'].charAt(0).toUpperCase()) +
          data02['name'].slice(1);
        newItem['image'] = await data02['sprites']['other']['official-artwork'][
          'front_default'
        ];
        newItem['type01'] = await data02?.types[0].type.name;
        newItem['type02'] = await data02?.types[1]?.type?.name;
        newItem['background'] = await backgroundThemes(
          data02?.types[0].type.name,
        );
        newItem['backgroundType01'] = await backgroundThemes(
          data02?.types[0].type.name,
        );
        newItem['backgroundType02'] = await backgroundThemes(
          data02?.types[1]?.type?.name,
        );

        // Thêm dữ liệu vào mảng tạm thời
        await list02.push(newItem);

        if (list02.length === 1000) {
          listAll.current = await [...list02];
          console.log(listAll.current.length);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    try {
      // Tạo một mảng tạm thời chứa dữ liệu
      const list02 = await [];
      await dispatch(fetchListItem());

      // Lấy dữ liệu danh sách link Pokemon từ API
      const res01 = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0',
      );
      const data01 = await res01.data.results;

      // Lấy dữ liệu từ mỗi Pokemon
      for (let index = 0; index < data01.length; index++) {
        const res02 = await axios.get(data01[index].url);
        const data02 = await res02.data;
        const newItem = await {};
        newItem['id'] = await index;
        newItem['name'] =
          (await data02['name'].charAt(0).toUpperCase()) +
          data02['name'].slice(1);
        newItem['image'] = await data02['sprites']['other']['official-artwork'][
          'front_default'
        ];
        newItem['type01'] = await data02?.types[0].type.name;
        newItem['type02'] = await data02?.types[1]?.type?.name;
        newItem['background'] = await backgroundThemes(
          data02?.types[0].type.name,
        );
        newItem['backgroundType01'] = await backgroundThemes(
          data02?.types[0].type.name,
        );
        newItem['backgroundType02'] = await backgroundThemes(
          data02?.types[1]?.type?.name,
        );

        // Thêm dữ liệu vào mảng tạm thời
        await list02.push(newItem);

        // Gọi hàm dispatch để thực hiện cập nhật dữ liệu
        if (list02.length === 20) {
          await dispatch(succeedListItem(list02));
          listTemp.current = await [...list02];
        }
      }
    } catch (err) {
      dispatch(failListItem(err));
      if (error) {
        Alert.alert('Error', error);
      }
    }
  };

  const fetchMoreData = async () => {
    if (list.length === listTemp.current.length && listSearch.length === 0) {
      try {
        // Tạo một mảng tạm thời chứa dữ liệu
        const list02 = await [];
        await dispatch(fetchListItem());

        await setNewNumber(() => newNumber + 20);
        await setOldNumber(() => oldNumber + 20);

        // Lấy dữ liệu danh sách link Pokemon từ API
        const res01 = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${newNumber}&offset=${oldNumber}`,
        );
        const data01 = await res01.data.results;

        // Lấy dữ liệu từ mỗi Pokemon
        for (let index = 0; index < data01.length; index++) {
          const res02 = await axios.get(data01[index].url);
          const data02 = await res02.data;
          const newItem = await {};
          newItem['id'] = (await data02.id) - 1;
          newItem['name'] =
            (await data02['name'].charAt(0).toUpperCase()) +
            data02['name'].slice(1);
          newItem['image'] = await data02['sprites']['other'][
            'official-artwork'
          ]['front_default'];
          newItem['type01'] = await data02?.types[0].type.name;
          newItem['type02'] = await data02?.types[1]?.type?.name;
          newItem['background'] = await backgroundThemes(
            data02?.types[0].type.name,
          );
          newItem['backgroundType01'] = await backgroundThemes(
            data02?.types[0].type.name,
          );
          newItem['backgroundType02'] = await backgroundThemes(
            data02?.types[1]?.type?.name,
          );

          // Thêm dữ liệu vào mảng tạm thời
          await list02.push(newItem);

          // Gọi hàm dispatch để thực hiện cập nhật dữ liệu
          if (list02.length === 20) {
            await dispatch(succeedListItem([...listTemp.current, ...list02]));
            listTemp.current = await [...listTemp.current, ...list02];
          }
        }
      } catch (err) {
        dispatch(failListItem(err));
        if (error) {
          Alert.alert('Error', error);
        }
      }
    } else {
      return;
    }
  };

  const DetailItem = (
    id,
    background,
    backgroundType01,
    backgroundType02,
    image,
  ) => {
    navigation.navigate('DetailItem', {
      id: id,
      background: background,
      backgroundType01: backgroundType01,
      backgroundType02: backgroundType02,
      image: image,
    });
  };

  const sortPokemon = () => (
    <View style={ListItemStyles.sortContainer}>
      <View style={ListItemStyles.sortTitleContainer}>
        <Text style={ListItemStyles.sortTitle}>Sort</Text>
        <Text style={ListItemStyles.sortContent}>
          Sort Pokémons alphabetically or by National Pokédex number!
        </Text>
      </View>
      <View style={ListItemStyles.sortButtonContainer}>
        <TouchableOpacity onPress={() => handleSortSmallestNumberFirst()}>
          <View
            style={[
              ListItemStyles.sortButton,
              {backgroundColor: smallestFirst ? '#EA5D60' : '#F2F2F2'},
            ]}>
            <Text
              style={[
                ListItemStyles.sortButtonText,
                {color: smallestFirst ? 'white' : '#747476'},
              ]}>
              Smallest number first
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSortHighestNumberFirst()}>
          <View
            style={[
              ListItemStyles.sortButton,
              {backgroundColor: highestFirst ? '#EA5D60' : '#F2F2F2'},
            ]}>
            <Text
              style={[
                ListItemStyles.sortButtonText,
                {color: highestFirst ? 'white' : '#747476'},
              ]}>
              Highest number first
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSortAlphabetical()}>
          <View
            style={[
              ListItemStyles.sortButton,
              {backgroundColor: alphabetical ? '#EA5D60' : '#F2F2F2'},
            ]}>
            <Text
              style={[
                ListItemStyles.sortButtonText,
                {color: alphabetical ? 'white' : '#747476'},
              ]}>
              A - Z
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSortReverseAlphabetical()}>
          <View
            style={[
              ListItemStyles.sortButton,
              {backgroundColor: reverseAlphabetical ? '#EA5D60' : '#F2F2F2'},
            ]}>
            <Text
              style={[
                ListItemStyles.sortButtonText,
                {color: reverseAlphabetical ? 'white' : '#747476'},
              ]}>
              Z - A
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const filterPokemon = () => (
    <View style={ListItemStyles.filterItemContainer}>
      <View style={ListItemStyles.filterTitleContainer}>
        <Text style={ListItemStyles.sortTitle}>Filter</Text>
        <Text style={ListItemStyles.sortContent}>
          Use advanced search to explore Pokémon by type!
        </Text>
      </View>
      <FlatList
        data={listNameType}
        renderItem={renderItemFilter}
        numColumns={2}
      />
      <View style={ListItemStyles.buttonFilterContainer}>
        <TouchableOpacity onPress={() => handleReset()}>
          <View
            style={[ListItemStyles.buttonFilter, {backgroundColor: '#F2F2F2'}]}>
            <Text style={[ListItemStyles.buttonFilterText, {color: 'black'}]}>
              Reset
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSubmit()}>
          <View
            style={[ListItemStyles.buttonFilter, {backgroundColor: '#EA5D60'}]}>
            <Text style={[ListItemStyles.buttonFilterText, {color: 'white'}]}>
              Submit
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleActive = type => {
    const indexSelectedItem = listNameType.findIndex(
      item => item.type === type,
    );
    if (indexSelectedItem !== -1) {
      for (let i = 0; i < listNameType.length; i++) {
        if (i === indexSelectedItem) {
          listNameType[i].isSelected = true;
        } else {
          listNameType[i].isSelected = false;
        }
      }
      setListNameType([...listNameType]);
    }
  };

  const handleSubmit = async () => {
    const indexSelectedItem = await listNameType.findIndex(
      item => item.isSelected === true,
    );
    if (indexSelectedItem !== -1) {
      const _listFilter = await [];
      for (let i = 0; i < listTemp.current.length; i++) {
        if (
          listTemp.current[i].type01 === listNameType[indexSelectedItem].type ||
          listTemp.current[i].type02 === listNameType[indexSelectedItem].type
        ) {
          _listFilter.push(listTemp.current[i]);
        }
      }
      if (_listFilter.length === 0) {
        Alert.alert('Error', 'No result found');
      } else {
        dispatch(succeedListItem(_listFilter));
      }
    }
    refRBSheet02.current.close();
  };

  const handleReset = async () => {
    await listNameType.map(item => (item.isSelected = false));
    await setListNameType([...listNameType]);
    await dispatch(fetchListItem());
    await dispatch(succeedListItem([...listTemp.current]));
    await refRBSheet02.current.close();
  };

  const handleSortSmallestNumberFirst = () => {
    setSmallestFirst(true);
    setHighestFirst(false);
    setAlphabetical(false);
    setReverseAlphabetical(false);
    const sortList = [...list];
    sortList.sort((a, b) => a.id - b.id);
    dispatch(succeedListItem(sortList));
  };

  const handleSortHighestNumberFirst = () => {
    setHighestFirst(true);
    setSmallestFirst(false);
    setAlphabetical(false);
    setReverseAlphabetical(false);
    const sortList = [...list];
    sortList.sort((a, b) => b.id - a.id);
    dispatch(succeedListItem(sortList));
  };

  const handleSortAlphabetical = () => {
    setAlphabetical(true);
    setSmallestFirst(false);
    setHighestFirst(false);
    setReverseAlphabetical(false);
    const sortList = [...list];
    sortList.sort((a, b) => a.name.localeCompare(b.name));
    dispatch(succeedListItem(sortList));
  };

  const handleSortReverseAlphabetical = () => {
    setReverseAlphabetical(true);
    setAlphabetical(false);
    setSmallestFirst(false);
    setHighestFirst(false);
    const sortList = [...list];
    sortList.sort((a, b) => b.name.localeCompare(a.name));
    dispatch(succeedListItem(sortList));
  };

  const header = () => {
    return (
      <View style={ListItemStyles.headerContainer}>
        <View style={ListItemStyles.actionContainer}>
          <Text style={ListItemStyles.title}>Pokedex</Text>
          <View style={ListItemStyles.listActions}>
            <TouchableOpacity onPress={() => navigation.navigate('AnimationItem')}>
              <Ionicons name={'paper-plane'} size={24} color={'black'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Ionicons name={'person'} size={24} color={'black'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('ListFavoriteItem')}>
              <Image source={require('../Images/Generation.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                refRBSheet02.current.open();
              }}>
              <Image source={require('../Images/Filter.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => refRBSheet.current.open()}>
              <Image source={require('../Images/Sort.png')} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={ListItemStyles.searchContainer}>
          <View style={ListItemStyles.searchSubContainer}>
            <Ionicons
              style={ListItemStyles.searchIcon}
              name="ios-search"
              size={20}
              color="black"
            />
            <TextInput
              placeholder="What Pokemon are you looking for?"
              onChangeText={txt => {
                setSearch(txt);
                if (txt === '') {
                  dispatch(succeedSearchListItem([]));
                } else {
                  try {
                    dispatch(searchListItem());
                    const _listSearch = listAll.current.filter(item =>
                      item.name.toLowerCase().includes(txt),
                    );
                    dispatch(succeedSearchListItem(_listSearch));
                  } catch (err) {
                    dispatch(failSearchListItem(err));
                    Alert.alert('Error', error);
                  }
                }
              }}
            />
          </View>
        </View>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          height={screenHeight / 1.85}
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
          {sortPokemon()}
        </RBSheet>
        <RBSheet
          ref={refRBSheet02}
          closeOnDragDown={true}
          closeOnPressMask={false}
          height={screenHeight / 1.1}
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
          {filterPokemon()}
        </RBSheet>
      </View>
    );
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        DetailItem(
          item.id,
          item.background,
          item.backgroundType01,
          item.backgroundType02,
          item.image,
        )
      }>
      <Item
        name={item.name}
        image={item.image}
        type01={item.type01}
        type02={item.type02}
        background={item.background}
        backgroundType01={item.backgroundType01}
        backgroundType02={item.backgroundType02}
      />
    </TouchableOpacity>
  );

  const renderItemFilter = ({item}) => (
    <TouchableOpacity onPress={() => handleActive(item.type)}>
      <ItemFilter
        itemTypeName={item.type.charAt(0).toUpperCase() + item.type.slice(1)}
        themeColor={backgroundThemes(item.type)}
        isSelected={item.isSelected}
      />
    </TouchableOpacity>
  );

  return (
    <View style={ListItemStyles.container}>
      <View style={ListItemStyles.itemContainer}>
        <FlatList
          ListHeaderComponent={header()}
          data={listSearch.length === 0 ? list : listSearch}
          refreshing={loading}
          onRefresh={fetchData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          maxToRenderPerBatch={10}
          onEndReachedThreshold={1}
          onEndReached={() => fetchMoreData()}
          ListFooterComponent={() => (
            <View>
              {loading && (
                <Text style={{fontSize: 20, margin: 20, alignSelf: 'center'}}>
                  Loading...
                </Text>
              )}
            </View>
          )}
        />
      </View>
    </View>
  );
}
export default ListItem;
