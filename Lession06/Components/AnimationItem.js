import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import React, {useRef, useState} from 'react';
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function AnimationItem() {
  const position = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const rotateBox = useRef(new Animated.Value(0)).current;
  const widthChange = useRef(new Animated.Value(0)).current;

  const [positionIsleft, setIsLeft] = useState(true);
  const [isRotate, setIsRotate] = useState(false);
  const [isWidth, setIsWidth] = useState(false);

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const runAnim = () => {
    const toValue = positionIsleft ? {x: 0, y: 300} : {x: 0, y: 0};
    Animated.sequence([
      Animated.timing(position, {
        toValue,
        duration: 2000,
        useNativeDriver: false,
      }),
      Animated.timing(rotateBox, {
        toValue: isRotate ? 0 : 1,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(widthChange, {
        toValue: isWidth ? 0 : 1,
        duration: 2000,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setIsLeft(prev => !prev);
      setIsRotate(prev => !prev);
      setIsWidth(prev => !prev);
    });
  };

  const rotateZ = rotateBox.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const width = widthChange.interpolate({
    inputRange: [0, 1],
    outputRange: [100, screenWidth],
  });

  return (
    <View
      style={{
        flex: 1,
      }}>
      <AnimatedTouchable
        onPress={runAnim}
        style={{
          backgroundColor: position.y.interpolate({
            inputRange: [0, 100, 300],
            outputRange: ['#00FA9A', '#24F7EA', '#FE903F'],
          }),
          marginLeft: position.x,
          marginTop: position.y,
          width: width,
          height: 150,
          transform: [{rotateZ}],
        }}
      />
    </View>
  );
}
