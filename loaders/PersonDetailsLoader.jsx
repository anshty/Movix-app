import { View, Text, Dimensions, ScrollView } from 'react-native';
import React from 'react';
import { Skeleton } from 'moti/skeleton';
const PersonDetailsLoader = () => {
  const { height, width } = Dimensions.get('screen');
  const trandSkel = [1, 2, 3, 4];
  return (
    <View className="mt-6">
      {/* pic skeleton */}
      <View className="flex-row justify-center ">
        <Skeleton height={height * 0.35} width={width * 0.78} radius={'round'} />
      </View>
      {/* pic name and location  */}
      <View className=" mt-5 items-center">
        <Skeleton height={20} width={width * 0.5} />
        <View className="mt-3">
          <Skeleton height={15} width={width * 0.5} />
        </View>
        {/* details of cast */}
        <View className="mt-5">
          <Skeleton height={60} width={width * 0.8} radius={100} />
        </View>
      </View>
      {/* biography */}
      <View className="mt-5 px-4">
        <Skeleton height={24} width={width * 0.3} />
        <View className="mt-3">
          <View className="mb-3">
            <Skeleton height={20} width={width * 0.9} />
          </View>
          <View className="mb-3">
            <Skeleton height={20} width={width * 0.7} />
          </View>
          <View className="mb-3">
            <Skeleton height={20} width={width * 0.8} />
          </View>
          <View className="mb-3">
            <Skeleton height={20} width={width * 0.9} />
          </View>
          <View className="mb-3">
            <Skeleton height={20} width={width * 0.8} />
          </View>
        </View>
      </View>
      {/* Movies */}

      <View className="mb-5 mt-5">
        <View className="mb-5 flex-row justify-between px-4 ">
          <Skeleton width={120} height={24} radius="round" colorMode="dark" />
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

export default PersonDetailsLoader;
