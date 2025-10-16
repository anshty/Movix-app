import { View, Text, FlatList, ScrollView, Dimensions } from 'react-native';
import React from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
const YTTrailer = ({ data }) => {
  const { width, height } = Dimensions.get('screen');
  const videoWidth = width * 0.85; // 85% of screen width
  const sidePadding = (width - videoWidth) / 2;

  return (
    <View className='mb-5'>
      <Text className="mx-4 mb-5 text-xl text-white" allowFontScaling={false}>Trailer</Text>

{
  data.length>0 ?
 <ScrollView
      horizontal
      // pagingEnabled
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: sidePadding }}
    >
      {data &&
        data
        .filter(item => item.type==="Trailer") // keep only teasers
    .slice(0, 2)
        .map((item, index) => (
         
          <View
            key={item.id || index}
            style={{
              width: videoWidth,
              marginHorizontal: 10,
              borderRadius: 15,
              overflow: 'hidden',
              backgroundColor: '#000', 
            }}
          >
            {/* {console.log(item.type)} */}
            <YoutubePlayer
              height={210} 
              width={videoWidth}
              play={false}
              videoId={item.key}
            />
          </View>
        ))}
    </ScrollView>:
    <Text className='text-base text-neutral-300 mx-10' allowFontScaling={false}>No trailers available</Text>
}
     
    </View>
  );
};

export default YTTrailer;
