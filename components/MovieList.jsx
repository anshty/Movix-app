import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { image_w185 } from 'api/movieDb';
import { navigate } from 'utils/NavigationUtils';
import Card from './Card';
const MovieList = ({ title, data, hideseeAll }) => {
  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation();

  return (
    <View className="mb-6">
      <View className=" mx-4 flex-1 flex-row justify-between">
        <View className=" ">
          <Text className="text-2xl font-bold color-white" allowFontScaling={false}>
            {title}
          </Text>
        </View>
        {!hideseeAll && (
          <TouchableOpacity
            className=""
            style={{}}
            onPress={() => navigate('AllMovieScreen', { data, title })}>
            {/* {console.log('similar movies data : ',data)} */}
            <Text className="text-lg color-orange-500  "> all item </Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        // data={!hideseeAll ? data.slice(0, 4) : data}
        data={
          !hideseeAll
            ? data.filter((item) => item.adult).slice(0, 4)
            : data.filter((item) => item.adult)
        }
        keyExtractor={(item) => item?.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Card item={item} />}
        ListEmptyComponent={() => (
          <View style={{marginHorizontal:20,marginVertical:20}}>
            <Text
              className=" text-base text-neutral-300"
              allowFontScaling={false}>{`No ${title}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default MovieList;

const styles = StyleSheet.create({});
