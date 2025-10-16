import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { image_w185 } from 'api/movieDb';
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
            onPress={() => navigation.navigate('SeeAll', { data, title })}>
            {/* {console.log('similar movies data : ',data)} */}
            <Text className="text-lg color-orange-500  "> See all </Text>
          </TouchableOpacity>
        )}
      </View>
      {data?.length>0?
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}>
          {(!hideseeAll ? data.slice(0, 4) : data).map((item, index) => {
            const MovieName = `${item.original_title}`;

            const nullImage_url = 'https://smg3-snitchprod.website/img/imageplace.png';
            // console.log('is adult movie:',item.adult)

            return item.adult === false ? (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.navigate('Movie', item)}>
                <View className="mt-5">
                  <View className="mr-5 space-y-3">
                    {/* {console.log('items : data ji',image_URL)} */}
                    <Image
                      source={{ uri: image_w185(item.poster_path) || nullImage_url }}
                      className="rounded-3xl"
                      style={{ width: width * 0.33, height: height * 0.22 }}
                    />
                  </View>
                  <Text
                    className="ml-1 mt-1 text-neutral-300"
                    numberOfLines={1}
                    allowFontScaling={false}>
                    {MovieName?.length > 17 ? MovieName.slice(0, 17) + '...' : MovieName}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ) : null;
          })}
        </ScrollView>: <Text className='text-base text-neutral-300 mx-10' allowFontScaling={false}>{`No ${title}`}</Text>
      }
    </View>
  );
};

export default MovieList;

const styles = StyleSheet.create({});
