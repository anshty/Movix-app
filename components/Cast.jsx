import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { image_w185 } from 'api/movieDb';

const Cast = ({ cast, navigation }) => {
const fallBackImage='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'

  return (
    <View className="my-6">
      <Text className="mx-4 mb-5 text-xl text-white" allowFontScaling={false}>Cast</Text>
      {
        cast.length>0?
        
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        >
        {cast &&
          cast.map((person, index) => {
            // console.log(person)
            return (
              <TouchableOpacity
                key={index}
                className="mr-4 items-center"
                onPress={() => navigation.navigate('Person', person)}>
                <View className="h-20 w-20 items-center overflow-hidden rounded-full border-neutral-500">
                  <Image
                    source={{ uri: image_w185(person.profile_path)||fallBackImage  }}
                    className="h-24 w-20 rounded-2xl"
                  />
                </View>
                <Text className="mt-1 text-xs text-white" allowFontScaling={false}>
                  {/* {person?.character.length > 15 ? person?.character.slice(0, 15) + '...' : person?.character }   */}
                  {person?.character  
                    ?    person.character.length > 15
                      ? person.character.slice(0, 15) + '...'
                      :    person.character
                    : 'N/A'}     </Text>
                <Text className="mt-1 text-xs text-neutral-400" allowFontScaling={false}>
                  {person?.name
                    ? person.name.length > 15
                      ? person.name.slice(0, 15) + '...'
                      : person.name
                    : 'n/a'}   </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView> : <Text className='text-base text-neutral-300 mx-10' allowFontScaling={false}>No Cast available </Text>
}
    </View>
  );
};

export default Cast;

const styles = StyleSheet.create({});
