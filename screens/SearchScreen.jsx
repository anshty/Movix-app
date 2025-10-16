import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SearchScreenLoader from 'loaders/SearchScreenLoader';
import { debounce } from 'lodash';
import { SearchMovies } from 'api/movieDb';
import { image_w185 } from 'api/movieDb';

const MovieName = 'Captain Amarica first avenger : I am Iron man';

const SearchScreen = () => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get('screen');

  const [isLoading, setIsLoading] = useState(false);
  // const [text, setText] = useState('');
  const [result, setResult] = useState([]);
  const [rawText, setRawText] = useState('');
  const [cast, setCast] = useState([]);

  const handleSearch = (value) => {
    // setText(value);   // debounced search value
    // console.log('debounced:', value && value.length > 2);

    if (value && value.length > 2) {
      // console.log('inside the conditions', value);
      setIsLoading(true);
      SearchMovies(value).then((item) => {
        // console.log(item.data.results);
        setCast(item.data.results)
        setResult(item.data.results);
        setIsLoading(false);
      });
    }
  };

  const handletxtDebounce = useCallback(debounce(handleSearch, 1000), []);

  const handleChange = (value) => {
    setRawText(value); // update input immediately
    handletxtDebounce(value); // run debounce
  };

  const fallBackImage =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
 const nullImage_url = 'https://smg3-snitchprod.website/img/imageplace.png';
  return (
    <SafeAreaView className="flex-1 bg-neutral-800">
      <StatusBar barStyle={'default'} />
      <View className="mx-4 mb-3 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" color="#fff" size={28} />
        </TouchableOpacity>

        {/* search bar and cancel text button */}

        <View className="flex-1 flex-row  items-center rounded-full border border-neutral-500 tracking-wide ">
          <TextInput
            className="mx-2 flex-1 text-lg font-semibold text-neutral-50 "
            placeholder="Search"
            placeholderTextColor={'gray'}
            allowFontScaling={false}
            value={rawText}
            onChangeText={handleChange}
          />
          {rawText.length > 0 && (
            <TouchableOpacity
              className="mx-2 items-center  rounded-full bg-neutral-500 p-1 "
              activeOpacity={0.8}
              onPress={() =>{ setRawText('') ;setResult([])}}>
              <AntDesign name="close" color="#fff" size={28} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {isLoading ? (
        <SearchScreenLoader />
      ) : (
        <>
          {/* search result*/}
          {result.length > 0 ? (
            <ScrollView showsVerticalScrollIndicator={false} className="space-y-3">
              <Text className="mb-5 mx-5 font-semibold text-white" allowFontScaling={false}>
                Result({ result.filter(item => item.media_type === 'movie' || item.media_type === 'person').length})
                {/* {console.log(result.map(item=>item.media_type==='movie'&&'person'))} */}
              </Text>
              {/* cast list */}
              <View className="mb-5">
                <Text className='mb-2 font-bold text-white mx-5'>Cast</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 15 }}>
                  {cast &&
                    cast.map((person, index) => {
                      // console.log('cast data: ',person.media_type)
                      if (person.media_type==='person') {
                         return (
                        
                        <TouchableOpacity
                          key={index}
                          className="mr-8 items-center"
                          onPress={() => navigation.navigate('Person', person)}>
                          <View className="h-20 w-20 items-center overflow-hidden rounded-full border-neutral-500">
                            <Image
                              source={{ uri: image_w185(person.profile_path)||fallBackImage  }}
                              className="h-24 w-20 rounded-2xl"
                            />
                          </View>

                          <Text className="mt-1 text-xs text-neutral-300" allowFontScaling={false}>
                            {person?.name
                              ? person.name.length > 15
                                ? person.name.slice(0, 15) + '...'
                                : person.name
                              : 'NULL'}{' '}  </Text>
                        </TouchableOpacity>
                      );
                      }
                     
                    })}
                </ScrollView>
              </View>
              {/* Movie list */}

              <Text className='mb-2 font-bold text-white mx-5'>Movies </Text>

              <View className="flex-row flex-wrap justify-between">
                {result.map((item, index) => {
                  if (item.media_type==='movie') {
                     const MovieName = `${item.original_title}`;

                    return (
                    <TouchableWithoutFeedback
                      key={index}
                      onPress={() => navigation.navigate('Movie', item)}>
                      <View className="mb-4 space-y-1 mx-3">
                        <Image
                          source={{uri: image_w185(item.poster_path) || nullImage_url}}
                          style={{ width: width * 0.44, height: height * 0.3 }}
                          className="rounded-3xl"
                        />
                        <Text className=" ml-3 text-neutral-300" allowFontScaling={false}>
                          {MovieName.length > 22 ? MovieName.slice(0, 22) + '...' : MovieName}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                  }
                  
                })}
              </View>
            </ScrollView>
          ) : (
            <View className="flex-1 items-center justify-center">
              <Image
                source={require('../assets/images/—Pngtree—people watching movies at home_4442059.png')}
                className="h-96 w-96"
              />
              <Text className="text-2xl font-semibold text-neutral-100" allowFontScaling={false}>
                No result{' '}
              </Text>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
