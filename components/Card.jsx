import { View, Text, TouchableWithoutFeedback, Image, Dimensions } from 'react-native';
import React from 'react';
import { navigate } from 'utils/NavigationUtils';
import { image_w185 } from 'api/movieDb';

const Card = ({item}) => {
  const { width, height } = Dimensions.get('screen');
  const nullImage_url = 'https://smg3-snitchprod.website/img/imageplace.png';
  const MovieName = `${item.original_title}`;

  return (
    <TouchableWithoutFeedback
      // key={index}
      onPress={() => navigate('MovieScreen', { movieId: item?.id })}>
      <View className="mt-5">
        <View className="mr-5 space-y-3">
          {/* {console.log('items : data ji',image_URL)} */}
          <Image
            source={{ uri: image_w185(item.poster_path) || nullImage_url }}
            className="rounded-3xl"
            style={{ width: width * 0.33, height: height * 0.22 }}
          />
        </View>
        <Text className="ml-1 mt-1 text-neutral-300" numberOfLines={1} allowFontScaling={false}>
          {MovieName?.length > 17 ? MovieName.slice(0, 17) + '...' : MovieName}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Card;
