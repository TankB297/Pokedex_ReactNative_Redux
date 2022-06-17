import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DetailItemStyles from '../Styles/DetailItemStyles';
import axios from 'axios';
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

export default function DetailItem({navigation, route}) {
  const {id, background, backgroundType01, backgroundType02, image} =
    route.params;
  const [about, setAbout] = useState(true);
  const [baseStats, setBaseStats] = useState(false);
  const [evolution, setEvolution] = useState(false);
  const [information, setInformation] = useState();
  const [moreInfor, setMoreInfor] = useState();
  const [evolutionInfor02, setEvolutionInfor02] = useState();
  const [evolutionInfor03, setEvolutionInfor03] = useState();
  const [evolutionInfor04, setEvolutionInfor04] = useState();
  const [newEvolution, setNewEvolution] = useState();
  const [isLiked, setIsLiked] = useState(false);

  const {list, loading, error, listSearch, listFavourite} = useSelector(
    state => state.listItem,
  );
  const dispatch = useDispatch();

  const getDetailData = async () => {
    // Toàn bộ dữ liệu chi tiết của một Pokemon
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id + 1}`,
    );
    const data = await response.data;
    await setInformation(data);

    // Lấy dữ liệu từ link species
    const response02 = await axios.get(data.species.url);
    const data02 = await response02.data;
    await setMoreInfor(data02);

    // Lấy dữ liệu từ link evolution_chain
    const response07 = await axios.get(data02?.['evolution_chain']?.url);
    const data07 = await response07.data;
    await setNewEvolution(data07);

    // Dữ liệu của Pokemon01
    const response04 = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${data07?.chain?.species?.name}`,
    );
    const data04 = await response04.data;
    await setEvolutionInfor02(data04);

    // Dữ liệu của Pokemon02
    const response05 = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${data07?.chain?.['evolves_to'][0]?.species?.name}`,
    );
    const data05 = await response05.data;
    await setEvolutionInfor03(data05);

    // Dữ liệu của Pokemon03
    if (
      data07?.chain?.['evolves_to'][0]?.['evolves_to'][0]?.species?.name !==
      undefined
    ) {
      const response06 = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${data07?.chain?.['evolves_to'][0]?.['evolves_to'][0]?.species?.name}`,
      );
      const data06 = await response06.data;
      await setEvolutionInfor04(data06);
    }

    const likeItem = listFavourite.some(item => item.id === id);
    if (likeItem) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  };

  useEffect(() => {
    getDetailData();
  }, []);

  const About = () => {
    return (
      <View style={DetailItemStyles.mainContentContainer}>
        <View style={DetailItemStyles.mainContentSubContainer}>
          <View style={DetailItemStyles.mainContent01}>
            <Text style={DetailItemStyles.content01}>Species</Text>
          </View>
          <View style={DetailItemStyles.mainContent02}>
            <Text style={DetailItemStyles.content02}>
              {moreInfor?.genera[7]?.genus}
            </Text>
          </View>
        </View>
        <View style={DetailItemStyles.mainContentSubContainer}>
          <View style={DetailItemStyles.mainContent01}>
            <Text style={DetailItemStyles.content01}>Height</Text>
          </View>
          <View style={DetailItemStyles.mainContent02}>
            <Text style={DetailItemStyles.content02}>
              {information?.height}
            </Text>
          </View>
        </View>
        <View style={DetailItemStyles.mainContentSubContainer}>
          <View style={DetailItemStyles.mainContent01}>
            <Text style={DetailItemStyles.content01}>Weight</Text>
          </View>
          <View style={DetailItemStyles.mainContent02}>
            <Text style={DetailItemStyles.content02}>
              {information?.weight}
            </Text>
          </View>
        </View>
        <View style={DetailItemStyles.mainContentSubContainer}>
          <View style={DetailItemStyles.mainContent01}>
            <Text style={DetailItemStyles.content01}>Abilities</Text>
          </View>
          <View style={DetailItemStyles.mainContent02}>
            <Text style={DetailItemStyles.content02}>
              {information?.abilities[1]?.ability?.name !== undefined
                ? information?.abilities[0]?.ability?.name
                    .charAt(0)
                    .toUpperCase() +
                  information?.abilities[0]?.ability?.name.slice(1) +
                  ', ' +
                  information?.abilities[1]?.ability?.name
                    .charAt(0)
                    .toUpperCase() +
                  information?.abilities[1]?.ability?.name.slice(1)
                : information?.abilities[0]?.ability?.name
                    .charAt(0)
                    .toUpperCase() +
                  information?.abilities[0]?.ability?.name.slice(1)}
            </Text>
          </View>
        </View>
        <View style={DetailItemStyles.mainContentSubContainer}>
          <View style={DetailItemStyles.mainContent01}>
            <Text style={DetailItemStyles.content01}>Gender</Text>
          </View>
          <View style={DetailItemStyles.mainContent02}>
            {moreInfor?.['gender_rate'] === 1 ? (
              <Ionicons name={'male'} size={25} />
            ) : (
              <Ionicons name={'female'} size={25} />
            )}
          </View>
        </View>
        <View style={DetailItemStyles.mainContentSubContainer}>
          <View style={DetailItemStyles.mainContent01}>
            <Text style={DetailItemStyles.content01}>Egg Groups</Text>
          </View>
          <View style={DetailItemStyles.mainContent02}>
            <Text style={DetailItemStyles.content02}>
              {moreInfor?.['egg_groups'][1]?.name !== undefined
                ? moreInfor?.['egg_groups'][0]?.name.charAt(0).toUpperCase() +
                  moreInfor?.['egg_groups'][0]?.name.slice(1) +
                  ', ' +
                  moreInfor?.['egg_groups'][0]?.name.charAt(1).toUpperCase() +
                  moreInfor?.['egg_groups'][1]?.name.slice(1)
                : moreInfor?.['egg_groups'][0]?.name.charAt(0).toUpperCase() +
                  moreInfor?.['egg_groups'][0]?.name.slice(1)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const BaseStats = () => {
    return (
      <View style={DetailItemStyles.baseStatsContainer}>
        <View style={DetailItemStyles.baseStatsSubContainer}>
          <View style={DetailItemStyles.baseStatsContent01}>
            <Text style={DetailItemStyles.baseStats01}>HP</Text>
          </View>
          <View style={DetailItemStyles.baseStatsContent02}>
            <Text style={DetailItemStyles.baseStats02}>
              {information?.stats[0]['base_stat']}
            </Text>
          </View>
          <View style={DetailItemStyles.baseStatsContent03}>
            <View
              style={[
                DetailItemStyles.baseStats03,
                {
                  width: `${information?.stats[0]['base_stat']}%`,
                  backgroundColor: background,
                },
              ]}></View>
          </View>
        </View>
        <View style={DetailItemStyles.baseStatsSubContainer}>
          <View style={DetailItemStyles.baseStatsContent01}>
            <Text style={DetailItemStyles.baseStats01}>Attack</Text>
          </View>
          <View style={DetailItemStyles.baseStatsContent02}>
            <Text style={DetailItemStyles.baseStats02}>
              {information?.stats[1]['base_stat']}
            </Text>
          </View>
          <View style={DetailItemStyles.baseStatsContent03}>
            <View
              style={[
                DetailItemStyles.baseStats03,
                {
                  width: `${information?.stats[1]['base_stat']}%`,
                  backgroundColor: background,
                },
              ]}></View>
          </View>
        </View>
        <View style={DetailItemStyles.baseStatsSubContainer}>
          <View style={DetailItemStyles.baseStatsContent01}>
            <Text style={DetailItemStyles.baseStats01}>Defense</Text>
          </View>
          <View style={DetailItemStyles.baseStatsContent02}>
            <Text style={DetailItemStyles.baseStats02}>
              {information?.stats[2]['base_stat']}
            </Text>
          </View>
          <View style={DetailItemStyles.baseStatsContent03}>
            <View
              style={[
                DetailItemStyles.baseStats03,
                {
                  width: `${information?.stats[2]['base_stat']}%`,
                  backgroundColor: background,
                },
              ]}></View>
          </View>
        </View>
        <View style={DetailItemStyles.baseStatsSubContainer}>
          <View style={DetailItemStyles.baseStatsContent01}>
            <Text style={DetailItemStyles.baseStats01}>Sp. Atk</Text>
          </View>
          <View style={DetailItemStyles.baseStatsContent02}>
            <Text style={DetailItemStyles.baseStats02}>
              {information?.stats[3]['base_stat']}
            </Text>
          </View>
          <View style={DetailItemStyles.baseStatsContent03}>
            <View
              style={[
                DetailItemStyles.baseStats03,
                {
                  width: `${information?.stats[3]['base_stat']}%`,
                  backgroundColor: background,
                },
              ]}></View>
          </View>
        </View>
        <View style={DetailItemStyles.baseStatsSubContainer}>
          <View style={DetailItemStyles.baseStatsContent01}>
            <Text style={DetailItemStyles.baseStats01}>Sp. Def</Text>
          </View>
          <View style={DetailItemStyles.baseStatsContent02}>
            <Text style={DetailItemStyles.baseStats02}>
              {information?.stats[4]['base_stat']}
            </Text>
          </View>
          <View style={DetailItemStyles.baseStatsContent03}>
            <View
              style={[
                DetailItemStyles.baseStats03,
                {
                  width: `${information?.stats[4]['base_stat']}%`,
                  backgroundColor: background,
                },
              ]}></View>
          </View>
        </View>
        <View style={DetailItemStyles.baseStatsSubContainer}>
          <View style={DetailItemStyles.baseStatsContent01}>
            <Text style={DetailItemStyles.baseStats01}>Speed</Text>
          </View>
          <View style={DetailItemStyles.baseStatsContent02}>
            <Text style={DetailItemStyles.baseStats02}>
              {information?.stats[5]['base_stat']}
            </Text>
          </View>
          <View style={DetailItemStyles.baseStatsContent03}>
            <View
              style={[
                DetailItemStyles.baseStats03,
                {
                  width: `${information?.stats[5]['base_stat']}%`,
                  backgroundColor: background,
                },
              ]}></View>
          </View>
        </View>
        <View style={DetailItemStyles.baseStatsSubContainer}>
          <View style={DetailItemStyles.baseStatsContent01}>
            <Text style={DetailItemStyles.baseStats01}>Total</Text>
          </View>
          <View style={DetailItemStyles.baseStatsContent02}>
            <Text style={DetailItemStyles.baseStats02}>
              {eval(
                information?.stats[0]['base_stat'] +
                  information?.stats[1]['base_stat'] +
                  information?.stats[2]['base_stat'] +
                  information?.stats[3]['base_stat'] +
                  information?.stats[4]['base_stat'] +
                  information?.stats[5]['base_stat'],
              )}
            </Text>
          </View>
          <View style={DetailItemStyles.baseStatsContent03}>
            <View
              style={[
                DetailItemStyles.baseStats03,
                {
                  width: `${eval(
                    eval(
                      information?.stats[0]['base_stat'] +
                        information?.stats[1]['base_stat'] +
                        information?.stats[2]['base_stat'] +
                        information?.stats[3]['base_stat'] +
                        information?.stats[4]['base_stat'] +
                        information?.stats[5]['base_stat'],
                    ) / 10,
                  )}%`,
                  backgroundColor: background,
                },
              ]}></View>
          </View>
        </View>
      </View>
    );
  };

  const Evolution = () => {
    return (
      <View style={DetailItemStyles.evolutionContainer}>
        <View style={DetailItemStyles.evolutionContent}>
          <View style={DetailItemStyles.evolutionImageContainer}>
            <Image
              style={DetailItemStyles.evolutionImage}
              source={{
                uri: evolutionInfor02?.sprites?.other?.['official-artwork']?.[
                  'front_default'
                ],
              }}
            />
            <Text style={DetailItemStyles.evolutionText01}>
              {evolutionInfor02?.id < 10
                ? '#00' + evolutionInfor02?.id
                : '#0' + evolutionInfor02?.id}
            </Text>
            <Text style={DetailItemStyles.evolutionText02}>
              {newEvolution?.chain?.species?.name.charAt(0).toUpperCase() +
                newEvolution?.chain?.species?.name.slice(1)}
            </Text>
          </View>
          <View style={DetailItemStyles.evolutionIcon}>
            <Ionicons name="ios-arrow-forward" size={25} color="black" />
            <Text style={DetailItemStyles.evolutionText}>
              Level{' '}
              {
                newEvolution?.chain?.['evolves_to'][0]?.[
                  'evolution_details'
                ][0]?.['min_level']
              }
            </Text>
          </View>
          <View style={DetailItemStyles.evolutionImageContainer}>
            <Image
              style={DetailItemStyles.evolutionImage}
              source={{
                uri: evolutionInfor03?.sprites?.other?.['official-artwork']?.[
                  'front_default'
                ],
              }}
            />
            <Text style={DetailItemStyles.evolutionText01}>
              {evolutionInfor03?.id < 10
                ? '#00' + evolutionInfor03?.id
                : '#0' + evolutionInfor03?.id}
            </Text>
            <Text style={DetailItemStyles.evolutionText02}>
              {newEvolution?.chain?.['evolves_to'][0]?.species?.name
                .charAt(0)
                .toUpperCase() +
                newEvolution?.chain?.['evolves_to'][0]?.species?.name.slice(1)}
            </Text>
          </View>
        </View>

        {newEvolution?.chain?.['evolves_to'][0]?.['evolves_to'][0]?.species
          ?.name !== undefined && (
          <View style={DetailItemStyles.evolutionContent}>
            <View style={DetailItemStyles.evolutionImageContainer}>
              <Image
                style={DetailItemStyles.evolutionImage}
                source={{
                  uri: evolutionInfor03?.sprites?.other?.['official-artwork']?.[
                    'front_default'
                  ],
                }}
              />
              <Text style={DetailItemStyles.evolutionText01}>
                {evolutionInfor03?.id < 10
                  ? '#00' + evolutionInfor03?.id
                  : '#0' + evolutionInfor03?.id}
              </Text>
              <Text style={DetailItemStyles.evolutionText02}>
                {newEvolution?.chain?.['evolves_to'][0]?.species?.name
                  .charAt(0)
                  .toUpperCase() +
                  newEvolution?.chain?.['evolves_to'][0]?.species?.name.slice(
                    1,
                  )}
              </Text>
            </View>
            <View style={DetailItemStyles.evolutionIcon}>
              <Ionicons name="ios-arrow-forward" size={25} color="black" />
              <Text style={DetailItemStyles.evolutionText}>
                Level{' '}
                {
                  newEvolution?.chain?.['evolves_to'][0]?.['evolves_to'][0]?.[
                    'evolution_details'
                  ][0]?.['min_level']
                }
              </Text>
            </View>
            <View style={DetailItemStyles.evolutionImageContainer}>
              <Image
                style={DetailItemStyles.evolutionImage}
                source={{
                  uri: evolutionInfor04?.sprites?.other?.['official-artwork']?.[
                    'front_default'
                  ],
                }}
              />
              <Text style={DetailItemStyles.evolutionText01}>
                {evolutionInfor04?.id < 10
                  ? '#00' + evolutionInfor04?.id
                  : '#0' + evolutionInfor04?.id}
              </Text>
              <Text style={DetailItemStyles.evolutionText02}>
                {newEvolution?.chain?.['evolves_to'][0]?.[
                  'evolves_to'
                ][0]?.species?.name
                  .charAt(0)
                  .toUpperCase() +
                  newEvolution?.chain?.['evolves_to'][0]?.[
                    'evolves_to'
                  ][0]?.species?.name.slice(1)}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  const aboutPress = () => {
    setAbout(true);
    setBaseStats(false);
    setEvolution(false);
  };

  const baseStatsPress = () => {
    setBaseStats(true);
    setAbout(false);
    setEvolution(false);
  };

  const evolutionPress = () => {
    setEvolution(true);
    setBaseStats(false);
    setAbout(false);
  };

  const handleLikeAction = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      const _listFav = [...listFavourite];
      const likeItem = list.filter(item => item.id === id);
      _listFav.push(likeItem[0]);
      dispatch(addToFavourite(_listFav));
      Alert.alert('Alert', 'Added to your favorites');
    } else {
      const _listFav = [...listFavourite];
      const indexLikeItem = _listFav.findIndex(item => item.id === id);
      _listFav.splice(indexLikeItem, 1);
      dispatch(addToFavourite(_listFav));
      Alert.alert('Alert', 'Removed from your favorites');
    }
  };

  return (
    <View style={DetailItemStyles.container}>
      <View style={[DetailItemStyles.header01, {backgroundColor: background}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLikeAction()}>
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={29}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <View
        style={[
          DetailItemStyles.header02MainContainer,
          {backgroundColor: background},
        ]}>
        <View style={DetailItemStyles.header02}>
          <View>
            <View>
              <Text style={DetailItemStyles.header02Title}>
                {information?.name.charAt(0).toUpperCase() +
                  information?.name.slice(1)}
              </Text>
            </View>
            <View style={DetailItemStyles.header02Sub}>
              <View
                style={[
                  DetailItemStyles.header02SubTitleContainer01,
                  {backgroundColor: backgroundType01},
                ]}>
                <Text style={DetailItemStyles.header02Content}>
                  {information?.types[0].type.name}
                </Text>
              </View>
              {information?.types[1]?.type?.name !== undefined && (
                <View
                  style={[
                    DetailItemStyles.header02SubTitleContainer02,
                    {backgroundColor: backgroundType02},
                  ]}>
                  <Text style={DetailItemStyles.header02Content}>
                    {information?.types[1]?.type?.name}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View>
            <Text style={DetailItemStyles.header02Number}>
              {eval(id + 1) < 10 ? '#00' + eval(id + 1) : '#0' + eval(id + 1)}
            </Text>
          </View>
        </View>
        <View style={DetailItemStyles.imageContainer}>
          <Image
            style={DetailItemStyles.image}
            source={{
              uri: image,
            }}
          />
        </View>
        <View style={DetailItemStyles.mainContainer}>
          <View style={DetailItemStyles.mainSubContainer}>
            <View style={DetailItemStyles.mainSubTitleContainer}>
              <TouchableOpacity onPress={() => aboutPress()}>
                <View
                  style={[
                    DetailItemStyles.subTitle,
                    !about ? {opacity: 0.3} : {opacity: 1},
                  ]}>
                  <Text style={DetailItemStyles.mainSubTitle}>About</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => baseStatsPress()}>
                <View
                  style={[
                    DetailItemStyles.subTitle,
                    !baseStats ? {opacity: 0.3} : {opacity: 1},
                  ]}>
                  <Text style={DetailItemStyles.mainSubTitle}>Base Stats</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => evolutionPress()}>
                <View
                  style={[
                    DetailItemStyles.subTitle,
                    !evolution ? {opacity: 0.3} : {opacity: 1},
                  ]}>
                  <Text style={DetailItemStyles.mainSubTitle}>Evolution</Text>
                </View>
              </TouchableOpacity>
            </View>
            {about && About()}
            {baseStats && BaseStats()}
            {evolution && Evolution()}
          </View>
        </View>
      </View>
    </View>
  );
}
