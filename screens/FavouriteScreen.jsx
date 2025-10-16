import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { image_w185, fetchMovieDetails, fetchPersonDetails } from 'api/movieDb';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { useFocusEffect } from '@react-navigation/native';
// import { useCallback } from 'react';

const FavouriteScreen = () => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get('screen');
  const [favouriteIds, setFavouriteIds] = useState([]);
  const [favCastID, setFavCastID] = useState([]);
  const [favouriteCast, setFavouriteCast] = useState([]);
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const nullImage_url = 'https://smg3-snitchprod.website/img/imageplace.png';
  const fallBackImage =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  // useEffect(() => {
  //   fetchFavouriteItems();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      fetchFavouriteItems();
      fetchFavouriteCasts();
    }, [])
  );

  useEffect(() => {
    if (favouriteIds.length > 0) {
      getAllFavouriteMovies(favouriteIds);
    }
  }, [favouriteIds]);

  useEffect(()=>{
if (favCastID.length>0) {
  getAllFavouritePersons(favCastID)
}
  },[favCastID])

  //  Get saved favourite movie IDs
  const fetchFavouriteItems = async () => {
    const token = await AsyncStorage.getItem('favourite');
    const res = JSON.parse(token);
    if (res !== null) {
      setFavouriteIds(res);
    }
  };
  //  get saved favourite cast IDs
  const fetchFavouriteCasts = async () => {
    const token = await AsyncStorage.getItem('favourite_cast');
    const res = JSON.parse(token);
    // console.log('fav cast id:', res);
    if (res !== null) {
      setFavCastID(res);
    }
  };

  //  Fetch all movie details using Promise.all
  const getAllFavouriteMovies = async (ids) => {
    try {
      const allMovies = await Promise.all(
        ids.map(async (id) => {
          const movieDetails = await fetchMovieDetails(id);
          return movieDetails?.data || null;
        })
      );

      const filtered = allMovies.filter((item) => item !== null);
      setFavouriteMovies(filtered);
    } catch (err) {
      console.error('Error fetching movies:', err);
    }
  };
  //   fetch all person details

  const getAllFavouritePersons = async (ids) => {
    try {
      const allPerson = await Promise.all(
        ids.map(async (id) => {
          const personDetails = await fetchPersonDetails(id);
          console.log('peros',personDetails.data)
          return personDetails?.data || null;
        })
      );
      const filtered= allPerson.filter(item=>item!==null)
      setFavouriteCast(filtered)
    } catch (error) {
      console.error('Error fetching Persons:',error)
    }
  };
// console.log('person data:',favouriteCast)
  return (
    <View className="flex-1 bg-neutral-800 ">
      <StatusBar style="light" />
      <SafeAreaView className='mb-2 flex-row'>
        <TouchableOpacity className="px-4" onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" color="#fff" size={28} />
        </TouchableOpacity>
         <Text className='text-2xl font-bold text-slate-200 ' allowFontScaling={false}>Favourite  </Text>
      </SafeAreaView>

      {/* cast favourite show case */}

      <ScrollView showsVerticalScrollIndicator={false} className='mb-5'>
        <View className="mb-5 mt-2">
          <Text className="mb-3 text-2xl font-semibold text-white px-4" allowFontScaling={false}>Cast</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15 }}>
            {favouriteCast &&
              favouriteCast.reverse().map((person, index) => {
               
                  return (
                    <TouchableOpacity
                      key={index}
                      className="mr-8 items-center"
                      onPress={() => navigation.navigate('Person', person)}>
                      <View className="h-20 w-20 items-center overflow-hidden rounded-full border-neutral-500">
                        <Image
                          source={{ uri: image_w185(person.profile_path) || fallBackImage }}
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
               
              })}
          </ScrollView>
        </View>

        {/* movie favourite show case */}

        <View className="mt-2 px-4">
          <Text className="mb-3 text-2xl font-semibold text-white" allowFontScaling={false}>
            {' '}
            Movies
          </Text>

          <View className="flex-row flex-wrap justify-between">
            {favouriteMovies.reverse().map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.navigate('Movie', item)}>
                <View className="mb-4 space-y-1">
                  <Image
                    source={{
                      uri: item.poster_path ? image_w185(item.poster_path) : nullImage_url,
                    }}
                    style={{ width: width * 0.44, height: height * 0.3 }}
                    className="rounded-3xl"
                  />
                  <Text className="ml-2 text-neutral-300" allowFontScaling={false}>
                    {item.original_title?.length > 22
                      ? item.original_title.slice(0, 22) + '...'
                      : item.original_title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FavouriteScreen;
