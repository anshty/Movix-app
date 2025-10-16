import { View, Text, Dimensions, ScrollView } from 'react-native';
import React from 'react';
import { Skeleton } from 'moti/skeleton';
const { width, height } = Dimensions.get('window');
const MovieScreenLoader = () => {
  return (
    <View>
      {/* image and info skeleton */}
      <View className="mb-5">
        <Skeleton width={width} height={height * 0.35} />
        <View className="mt-5 items-center justify-center">
          <Skeleton width={width * 0.8} height={40} />
          <View className="mt-2" />
          <Skeleton width={width * 0.5} height={20} />
          <View className="mt-2" />
          <Skeleton width={width * 0.5} height={20} />
        </View>
      </View>
      {/* Description skeleton */}
      <View className=" mx-4 mb-5  " style={{gap:5}}>
        <Skeleton width={width * 0.8} height={30} />
        <Skeleton width={width * 0.9} height={30} />
        <Skeleton width={width * 0.8} height={30} />
        <Skeleton width={width * 0.9} height={30} />
        <Skeleton width={width * 0.8} height={30} />
        <Skeleton width={width * 0.9} height={30} />
      </View>
      {/* Top Cast skeleton */}
      <View className="mb-5 ">
        <View className="mx-4 mb-5">
          <Skeleton width={120} height={24} radius="round" colorMode="dark" />
        </View>
        <ScrollView className="mt-4" horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3, 4, 5].map((item) => {
            return (
              <View key={item} className="items-center gap-2 px-2">
                <Skeleton width={width * 0.22} height={height * 0.1} radius={'round'} />
                <Skeleton width={width * 0.15} height={20} />
              </View>
            );
          })}
        </ScrollView>
      </View>
      {/* similor movie skeleton */}
      <View className="mb-5 mt-5">
        <View className="mx-4 mb-5">
          <Skeleton width={120} height={24} radius="round" colorMode="dark" />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3, 4, 5].map((item) => {
            return (
              <View key={item} className="px-2">
                <Skeleton height={height * 0.15} width={width * 0.33} key={item} />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default MovieScreenLoader;
