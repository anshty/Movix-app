import { View, Text, Dimensions, ScrollView } from 'react-native';
import React from 'react';
import { Skeleton } from 'moti/skeleton';
const SearchScreenLoader = () => {
  const { width, height } = Dimensions.get('window');
  return (
    <ScrollView>
      <View className='mb-5 mx-4 mt-2'>
        <Skeleton width={100} height={24} radius="round" colorMode="dark" />
      </View>
      <View className="mb-5 ">
        <View className="mx-4 mb-3">
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
      <View className="mx-4 mt-5 mb-3">
        <Skeleton width={120} height={24} radius={'round'} />
      </View>
      <View className="mx-4  flex-row flex-wrap justify-between ">
        {[1, 2, 3, 4].map((item) => {
          return (
            <View key={item} className="mb-4 gap-2 space-y-1 ">
              <Skeleton width={width * 0.44} height={height * 0.3} />
              <Skeleton width={width * 0.33} height={20} />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default SearchScreenLoader;
