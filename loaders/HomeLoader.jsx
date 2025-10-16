import { View, Text, Dimensions, ScrollView } from 'react-native';
import React from 'react';
import { Skeleton } from 'moti/skeleton';

const HomeLoader = () => {
  const trandSkel = [1, 2, 3, 4, 5];
  const { width, height } = Dimensions.get('window');
  return (
    <View className="mx-4  mt-5 ">
      {/* Section title skeleton */}
      <Skeleton width={120} height={24} radius="round" colorMode="dark"  />

      {/* Carousel skeleton */}
      <View style={{ alignSelf: 'center' }} className="mt-5">
        <Skeleton width={width * 0.9} height={height * 0.5} radius={20} colorMode="dark" />
      </View>

      {/* Pagination skeleton */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, gap: 8 }}>
        {[1, 2, 3].map((item) => {
          return <Skeleton height={10} width={10} key={item} />;
        })}
      </View>

      {/* upcoming skeleton */}
      <View className="mt-5">
        <View className="mb-5 flex-row justify-between">
          <Skeleton width={120} height={24} radius="round" colorMode="dark" />
          <Skeleton width={60} height={24} radius="round" colorMode="dark" />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {trandSkel.map((item) => {
            return (
              <View key={item} className="px-2">
                <Skeleton height={height * 0.15} width={width * 0.33} />
              </View>
            );
          })}
        </ScrollView>
      </View>
      {/* top rated skeleton */}
      <View className="mb-5 mt-5">
        <View className="mb-5 flex-row justify-between">
          <Skeleton width={120} height={24} radius="round" colorMode="dark" />
          <Skeleton width={60} height={24} radius="round" colorMode="dark" />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {trandSkel.map((item) => {
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

export default HomeLoader;
