import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import MovieCard from './MovieCard';
import { useNavigation } from '@react-navigation/native';

const TrendingMovies = ({ data }) => {
  const { width, height } = Dimensions.get('window');
  const progress = useSharedValue(0);
  const ref = React.useRef < ICarouselInstance > null;
  const onPressPagination = (index) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

 
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate('Movie', item);
  };
  // console.log('trending movies data: ',data.map(item=>item.adult))
  return (
    <View className="mb-8 ">
      <Text className="mx-4  mt-5  text-2xl font-bold  text-white">Trending</Text>
      <Carousel
        autoPlayInterval={5000}
        autoPlay
        loop={true}
        width={width}
        height={height * 0.6}
        data={data}
        onProgressChange={progress}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.85,
          parallaxScrollingOffset: 90,
        }}
        style={{
          alignSelf: 'center',
          transform: [{ translateY: -25 }],
        }}
        renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}
      />
      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={{ backgroundColor: 'gray', borderRadius: 50 }}
        activeDotStyle={{
          backgroundColor: 'white',
        }}
        
        containerStyle={{ gap: 5 }}
        onPress={onPressPagination}
      />

      
    </View>
  );
};

export default TrendingMovies;

// const styles = StyleSheet.create({})
