import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import React from 'react';
import { image_w500 } from 'api/movieDb';
import { navigate } from 'utils/NavigationUtils';
const MovieCard = ({ item, handleClick }) => {
  const { width, height } = Dimensions.get('screen');
  const nullImage_url = 'https://smg3-snitchprod.website/img/imageplace.png';
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        console.log(item);
        return navigate('MovieScreen', { movieId: item?.id });
      }}>
      <Image
        source={{ uri: image_w500(item.poster_path) || nullImage_url }}
        style={{
          width: '100%',
          height: '100%',
          resizeMode: 'cover',
          borderRadius: 12,
        }}
      />
    </TouchableOpacity>
  );
};

export default MovieCard;
