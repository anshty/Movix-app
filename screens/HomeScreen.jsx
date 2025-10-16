import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Octicons, SimpleLineIcons } from '@expo/vector-icons';
import TrendingMovies from 'components/TrendingMovies';
import MovieList from 'components/MovieList';
import { useNavigation } from '@react-navigation/native';
import HomeLoader from 'loaders/HomeLoader';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from 'api/movieDb';

const ios = Platform.OS === 'ios';

const HomeScreen = () => {
  const navigation = useNavigation();

  const [trending, setTrending] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // api call

  useEffect(() => {
    setIsLoading(true);
    getTrendingMovies();
    getUpComingMovies();
    getTopRatedMovies();
  }, []);

  // proxy issue alert pop-up

  useEffect(() => {
    let timer;
    if (isLoading) {
      timer = setTimeout(() => {
        alert(
          'Connection seems slow or may not work in your network.\n\nTry changing your DNS to:\nDNS: dns.google\n\nThen reconnect your network.'
        );
      }, 30000);
    }
    // Cleanup when loading finishes or component unmounts
    return () => clearTimeout(timer);
  }, [isLoading]);

  const getTrendingMovies = async () => {
    const trendingData = await fetchTrendingMovies();

    // console.log('trending movies: ', trendingData.data.results);
    if (trendingData && trendingData.data.results) {
      setTrending(trendingData.data.results);
      // console.log(trendingData.data.results)
      setIsLoading(false);
    }
  };
  const getUpComingMovies = async () => {
    const upComingData = await fetchUpcomingMovies();

    if (upComingData && upComingData.data.results) {
      setUpComing(upComingData.data.results);
    }
  };

  const getTopRatedMovies = async () => {
    const topRatedData = await fetchTopRatedMovies();
    // console.log('top Rated: ',topRatedData.data.results)
    if (topRatedData && topRatedData.data.results) {
      setTopRated(topRatedData.data.results);
    }
  };

  return (
    <View className="flex-1 bg-neutral-800 ">
      {/* search bar */}
      <SafeAreaView style={ios ? { marginBottom: 4 } : { marginBottom: 4 }}>
        <StatusBar style="light" />

        <View className=" mx-4 flex-row items-center justify-between">
          <TouchableOpacity onPress={() => (isLoading ? null : navigation.openDrawer())}>
            <Octicons name="three-bars" color="#fff" size={30} />
          </TouchableOpacity>
          <Text className="text-3xl font-bold text-white" allowFontScaling={false}>
            Movix
          </Text>
          <TouchableOpacity onPress={() => (isLoading ? null : navigation.navigate('Search'))}>
            <SimpleLineIcons name="magnifier" color="#fff" size={30} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}>
        {isLoading ? (
          <HomeLoader />
        ) : (
          <>
            {/* trending movies */}
            {trending.length > 0 && <TrendingMovies data={trending} />}
            {/* upcoming movies */}
            {upComing.length > 0 && <MovieList title="Upcoming" data={upComing} />}
            {/* Top rated movies */}
            {topRated.length > 0 && <MovieList title="Top rated" data={topRated} />}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
