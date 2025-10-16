import {
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { image_w185 } from 'api/movieDb';
import { MaterialIcons } from '@expo/vector-icons';
const AllMovieScreen = ({ navigation, route }) => {
  const { width, height } = Dimensions.get('window');
  const { data, title } = route.params;
  // console.log(data);

  return (
    <SafeAreaView className="flex-1 bg-neutral-800 ">
      <View className='flex-row m-2'>
        <TouchableOpacity className="rounded-xl p-1" onPress={() => navigation.goBack()}
          >
          <MaterialIcons name="arrow-back-ios" color="#fff" size={28}  />
        </TouchableOpacity>
        <Text className="text-3xl font-bold color-white" allowFontScaling={false}>
          {title}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="">
        <View className="flex-row flex-wrap  justify-items-start ">
          {data.map((item, index) => {
            const MovieName = `${item.original_title}`;

            const nullImage_url = 'https://smg3-snitchprod.website/img/imageplace.png';

            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.navigate('Movie', item)}>
                <View className="m-2 mb-5 mt-5 gap-2 mr-2 ">
                  <View className="">
                    <Image
                      source={{ uri: image_w185(item.poster_path) || nullImage_url }}
                      className="rounded-3xl"
                      style={{ width: width * 0.28, height: height * 0.2 }}
                    />
                  </View>
                  <Text
                    className="ml-1 mt-1 text-neutral-300"
                    numberOfLines={1}
                    allowFontScaling={false}>
                    {MovieName?.length > 15 ? MovieName.slice(0, 15) + '...' : MovieName}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllMovieScreen;
