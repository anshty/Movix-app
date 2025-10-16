import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from 'components/Cast';
import MovieList from 'components/MovieList';
import MovieScreenLoader from 'loaders/MovieScreenLoader';
import {
  fetchCreditsID,
  fetchMovieDetails,
  fetchMovieTrailer,
  fetchSimilarMovies,
  image_w500,
} from 'api/movieDb';
import YTTrailer from 'components/YTTrailer';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { height, width } = Dimensions.get('screen');
const ios = Platform.OS === 'ios';
const topMargin = ios ? '' : 'mt-3';

const MovieScreen = ({ route }) => {
  // start
  const item = route.params;
  const navigation = useNavigation();
  const [isFavourite, setFavourite] = useState(false);
  const [cast, setCast] = useState([]);
  const [movie, setMovie] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // setIsLoading(true);
    getMovieDetails(item.id);
    getCreditsCast(item.id);
    getSimilarMovie(item.id);
    getMovieTrailer(item.id);
  }, [item]);

  useEffect(() => {
    if (!isLoading) {
      renderItem(movie.id);
    }
  }, [isLoading]);

  // console.log(item.id)
  const MovieName = movie.title;
  const nullImage_url = 'https://smg3-snitchprod.website/img/imageplace.png';

  const getMovieDetails = async (id) => {
    const movieDetails = await fetchMovieDetails(id);
    if (movieDetails && movieDetails.data) {
      setMovie(movieDetails.data);
      setIsLoading(false);
    }
  };
  // {console.log( item)}

  // moive trailer
  const getMovieTrailer = async (id) => {
    const movieTrailer = await fetchMovieTrailer(id);
    // console.log('trailor movie:', movieTrailer);
    if (movieTrailer && movieTrailer.data.results) {
      setTrailer(movieTrailer.data.results);
      setIsLoading(false);
    }
  };

  const getCreditsCast = async (id) => {
    const castDetails = await fetchCreditsID(id);
    // console.log('cast details: ',castDetails.data.id )
    if (castDetails) {
      setCast(castDetails.data.cast);
      setIsLoading(false);
    }
  };

  const getSimilarMovie = async (id) => {
    const similarMovies = await fetchSimilarMovies(id);
    if (similarMovies) {
      setSimilarMovies(similarMovies.data.results);
      // console.log('similor movie',similarMovies.data.results)
      setIsLoading(false);
    }
  };

  
  // async storage

  const saveItem = async (itemID) => {
    setFavourite(true);
    await AsyncStorage.getItem('favourite').then((token) => {
      const res = JSON.parse(token);
      if (res !== null) {
        let data = res.find((val) => val === itemID);
        if (data == null) {
          res.push(itemID);
          AsyncStorage.setItem('favourite', JSON.stringify(res));
          alert('Movie added!');
          
          // console.log(itemID)
        }
      } else {
        let favourite = [];
        favourite.push(itemID);
        AsyncStorage.setItem('favourite', JSON.stringify(favourite));
        alert('Movie added!');
        // console.log('item :',itemID)
       
      }
    });
  };
  const removeItem = async (itemID) => {
    setFavourite(false);
    const itemMark = await AsyncStorage.getItem('favourite').then((token) => {
      const res = JSON.parse(token);
      return res.filter((id) => id !== itemID);
    });
    await AsyncStorage.setItem('favourite', JSON.stringify(itemMark));
    alert('Movie removed');

  };

  const renderItem = async (itemID) => {
    await AsyncStorage.getItem('favourite').then((token) => {
      const res = JSON.parse(token);
      if (res !== null) {
        let item_Data = res.find((val) => val === itemID);
        return item_Data == null ? setFavourite(false) : setFavourite(true);
      }
    });

    
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="flex-1 bg-neutral-900">
      <StatusBar style="light" />
      {/* back btn and movie poster */}
      <View className="">
        <SafeAreaView
          className={
            'absolute z-20 w-full flex-row items-center justify-between px-4 ' + topMargin
          }>
          <TouchableOpacity
            className="rounded-xl p-1"
            onPress={() => navigation.goBack()}
            style={{
              padding: 5,
              borderRadius: 15,
              backgroundColor: 'rgba(0,0,0,0.6)',
            }}>
            <MaterialIcons name="arrow-back-ios" color="#fff" size={28} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => ( isLoading?null: isFavourite ? removeItem(movie.id) : saveItem(movie.id))}
            style={{ backgroundColor: 'rgba(0,0,0,0.6)', padding: 10, borderRadius: 15 }}>
            <AntDesign name="heart" color={isFavourite ? '#ff0000' : '#fff'} size={28} />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
      {isLoading ? (
        <MovieScreenLoader />
      ) : (
        <>
          <View>
            {/* {console.log(movie.adult)} */}
            <Image
              source={{ uri: image_w500(movie.backdrop_path) || nullImage_url }}
              style={{ width, height: height * 0.6 }}
            />
            <LinearGradient
              colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
          {/* Movie Details */}
          <View style={{ marginTop: -(height * 0.09) }}>
            {/* title */}
            <Text className="mb-3 px-3 text-center text-3xl font-bold tracking-wide text-white">
              {MovieName}
            </Text>
            {/* states ,relese ,runtime */}

            {movie.id ? (
              <Text
                className="text-center text-base font-semibold text-neutral-400 "
                allowFontScaling={false}>
                {movie.status} • {movie?.release_date.split('-')[0]} • {movie.runtime} min
              </Text>
            ) : null}
            {/* genres */}
            <View className="mx-4 mb-3 flex-row  justify-center gap-2 space-x-2">
              {movie.id
                ? movie.genres.map((genres, id) => {
                    let showdots = id + 1 !== movie.genres.length;
                    return (
                      <Text
                        className="text-center text-base font-semibold text-neutral-400"
                        key={id}
                        allowFontScaling={false}>
                        {genres.name} {showdots ? ' •' : null}
                      </Text>
                    );
                  })
                : null}
            </View>

            <Text className="mx-4 tracking-wide text-neutral-400" allowFontScaling={false}>
              {movie.id ? movie.overview : null}
            </Text>
          </View>
          {/* cast*/}
          <Cast navigation={navigation} cast={cast} />

          <YTTrailer data={trailer} />

          {/* Similar Movies */}
          <MovieList title="Similar Movies" data={similarMovies} hideseeAll={true} />
        </>
      )}
    </ScrollView>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({});
