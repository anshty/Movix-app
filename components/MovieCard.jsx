import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import React from 'react';
import {image_w500}from 'api/movieDb'
const MovieCard = ({ item,handleClick }) => {
  const { width, height } = Dimensions.get('screen');
 const nullImage_url='https://smg3-snitchprod.website/img/imageplace.png'
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={()=>handleClick(item)} className='mt-2'>
      
      <Image
        source={{uri:image_w500(item.poster_path)||nullImage_url}}
       
        style={{
          width: width,
          height: height * 0.6,
          resizeMode: 'cover',
          borderRadius: 12,
          
        }}
      />
    </TouchableOpacity>
  );
};

export default MovieCard;


