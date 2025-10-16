import { View, TouchableOpacity,Text } from 'react-native';
import React from 'react';
import { WebView } from 'react-native-webview';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const PrivacyPolicy = () => {
  const navigation=useNavigation()
  return (
    <View className=" flex-1">
      <StatusBar style='light'/>
      <SafeAreaView className='flex-row'>
        <TouchableOpacity className=" mx-2" onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" color="black" size={28} />
        </TouchableOpacity>
        <Text className='text-xl font-semibold' allowFontScaling={false}>Privacy Policy  </Text>
      </SafeAreaView>
      <WebView source={{ uri: 'https://anshty.github.io/movix-app-privacy-policy/' }} />
    </View>
  );
}
export default PrivacyPolicy;
