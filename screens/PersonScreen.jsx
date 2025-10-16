import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MovieList from 'components/MovieList';
import PersonDetailsLoader from 'loaders/PersonDetailsLoader';
import { fetchPersonDetails, fetchPersonMovies, image_w342 } from 'api/movieDb';

const { width, height } = Dimensions.get('screen');
const ios = Platform.OS === 'ios';

const PersonScreen = ({ navigation, route }) => {
  const person = route.params;
  // console.log('person data:',person)
  // const navigation = useNavigation();
  const MarginTop = ios;
  const [isFavourite, setFavourite] = useState();
  const [personDetails, setPersonDetails] = useState({});
  const [personmovies, setPersonMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPersonDetails(person.id);
    getPersonMovies(person.id);
  }, [person]);

  useEffect(() => {
    if (!isLoading) {
      renderFav_cast(personDetails.id);
    }
  }, [isLoading]);

  // console.log(personDetails);
  const fallBackImage =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  const getPersonDetails = async (id) => {
    const persondata = await fetchPersonDetails(id);
    // console.log('person profile:',persondata.data)
    if (persondata.data) {
      setPersonDetails(persondata.data);
      setIsLoading(false);
    }
  };
  const getPersonMovies = async (id) => {
    const personMoviesData = await fetchPersonMovies(id);
    // console.log('person movie list: ',personMoviesData.data.cast)
    if (personMoviesData && personMoviesData.data.cast) {
      setPersonMovies(personMoviesData.data.cast);
    }
  };

  //  async storage

  const saveFav_cast = async (castID) => {
    setFavourite(true);
    await AsyncStorage.getItem('favourite_cast').then((token) => {
      const res = JSON.parse(token);
      if (res !== null) {
        const data = res.find((val) => val === castID);
        if (data == null) {
          res.push(castID);
          AsyncStorage.setItem('favourite_cast', JSON.stringify(res));
          alert('Added !!');
        }
      } else {
        let favourite_cast = [];
        favourite_cast.push(castID);
        AsyncStorage.setItem('favourite_cast', JSON.stringify(favourite_cast));
        alert('added!');
      }
    });
  };

  const removeFav_cast = async (castID) => {
    setFavourite(false);
    const removedCast = await AsyncStorage.getItem('favourite_cast').then((token) => {
      const res = JSON.parse(token);
      return res.filter((id) => id !== castID);
    });
    AsyncStorage.setItem('favourite_cast', JSON.stringify(removedCast));
    alert('Cast removed');
  };

  const renderFav_cast = async (castID) => {
    AsyncStorage.getItem('favourite_cast').then((token) => {
      const res = JSON.parse(token);
      if (res !== null) {
        let cast_data = res.find((val) => val === castID);
        return cast_data == null ? setFavourite(false) : setFavourite(true);
      }
    });
  };

  return (
    <View className="flex-1 bg-neutral-900 ">
      <StatusBar style="light" />
      <SafeAreaView
        className={
          isLoading
            ? 'flex-row items-center justify-between px-4  '
            : ' flex-row items-center justify-between px-4 ' + MarginTop
        }>
        <TouchableOpacity className=" p-1" onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" color="#fff" size={28} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
          isLoading?null: ( isFavourite ? removeFav_cast(personDetails.id) : saveFav_cast(personDetails.id))
          }>
          <AntDesign name="heart" color={isFavourite ? '#ff0000' : '#fff'} size={28} />
        </TouchableOpacity>
      </SafeAreaView>
      {/* Cast person details */}
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {isLoading ? (
          <PersonDetailsLoader />
        ) : (
          <View className="">
            <View
              className=" flex-row justify-center"
              style={{
                shadowColor: 'gray',

                shadowRadius: 10,
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 1,
                // Android shadow yaha se start krna h
              }}>
              <View className=" h-96 w-96 items-center overflow-hidden rounded-full border-2 border-neutral-500 ">
                <Image
                  // source={require('../assets/images/castImage.jpg')}
                  source={{ uri: image_w342(personDetails.profile_path) || fallBackImage }}
                  style={{ height: height * 0.35, width: width * 0.78, borderRadius: 50 }}
                />
              </View>
            </View>
            <View className="mt-6">
              <Text className="text-center text-3xl font-bold text-white" allowFontScaling={false}>
                {personDetails.name}
              </Text>
              <Text className="text-center text-base text-neutral-500" allowFontScaling={false}>
                {personDetails.place_of_birth}
              </Text>
            </View>

            {/* personal details */}
            <View className="mx-6 mt-6  flex-row items-center justify-between rounded-full bg-neutral-700 p-4">
              <View className="items-center border-r-2 border-r-neutral-400 px-2 ">
                <Text className="text-lg font-semibold text-white" allowFontScaling={false}>
                  Gender
                </Text>
                <Text className="text-sm  text-neutral-300" allowFontScaling={false}>
                  {personDetails.gender === 2 ? 'Male' : 'Female'}{' '}
                </Text>
              </View>
              <View className="items-center border-r-2 border-r-neutral-400 px-2 ">
                <Text className="text-lg font-semibold text-white" allowFontScaling={false}>
                  Birthday
                </Text>
                <Text className="text-sm  text-neutral-300" allowFontScaling={false}>
                  {personDetails.birthday}{' '}
                </Text>
              </View>
              <View className="items-center border-r-2 border-r-neutral-400 px-2 ">
                <Text className="text-lg font-semibold text-white" allowFontScaling={false}>
                  Known for
                </Text>
                <Text className="text-sm  text-neutral-300" allowFontScaling={false}>
                  {personDetails.known_for_department}{' '}
                </Text>
              </View>
              <View className="items-center  px-2 ">
                <Text className="text-lg font-semibold text-white " allowFontScaling={false}>
                  Popularity
                </Text>
                <Text className="text-sm  text-neutral-300" allowFontScaling={false}>
                  {(personDetails.popularity * 10).toFixed(1) + '%'}{' '}
                </Text>
              </View>
            </View>
            {/* biography */}
            <View className="mx-4 my-6 space-y-2">
              <Text className="text-lg text-white" allowFontScaling={false}>
                Biography
              </Text>
              <Text className="tracking-wide text-neutral-400" allowFontScaling={false}>
                {personDetails.biography}
              </Text>
            </View>
            {/* Person movie List  */}
            <MovieList
              data={personmovies}
              hideseeAll={true}
              title={`${personDetails.name}'s Movies`}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default PersonScreen;

const styles = StyleSheet.create({});
