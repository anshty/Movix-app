import { View, Text, TouchableOpacity, Share, Linking, Alert } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const PrivacyPolicy_btn = () => {
  const navigation = useNavigation();

  // 🔹 Rate Us
  const handleRateUs = () => {
    Alert.alert('Info', 'Rate Us feature will be available once the app is published.');
    // Once published, replace the above line with:
    // const url = 'https://play.google.com/store/apps/details?id=com.yourapp';
    // Linking.openURL(url).catch(() => Alert.alert('Could not open Play Store.'));
  };

  // 🔹 Share App
  const handleShare = async () => {
    try {
      await Share.share({
        message: '🎬 Check out Movix — a stylish movie review app! Coming soon to the Play Store.',
      });
    } catch (error) {
      Alert.alert('Error', 'Could not share the app.');
    }
  };

  // 🔹 Send Feedback
 const sendFeedback = () => {
  const email = 'ankitverma.biz@gmail.com'; 
  const subject = 'Feedback for Movix App';
  const url = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

  Linking.openURL(url).catch(() => {
    alert('Could not open mail app');
  });
};

  return (
    <View className=" items-center justify-center mb-5 ">
      <View className="w-11/12  ">
      
        <Text className="text-xl font-semibold text-slate-400 text-center mb-2" allowFontScaling={false}>
          Others
        </Text>
      <View className='w-60 border-y border-y-gray-400 mb-3'/>
        {/* Rate Us */}
        <TouchableOpacity
          onPress={handleRateUs}
          activeOpacity={0.7}
          className="w-full  mb-1  flex items-center justify-center ">
          <Text className="text-neutral-500 text-base font-medium" allowFontScaling={false}>⭐ Rate Us </Text>
        </TouchableOpacity>

        {/* Share */}
        <TouchableOpacity
          onPress={handleShare}
          activeOpacity={0.7}
          className="w-full  mb-1   items-center justify-center">
          <Text className="text-neutral-500 text-base font-medium" allowFontScaling={false}>📤 Share with Friends  </Text>
        </TouchableOpacity>

        {/* Feedback */}
        <TouchableOpacity
          onPress={sendFeedback}
          activeOpacity={0.7}
          className="w-full  mb-1   items-center justify-center">
          <Text className="text-neutral-500 text-base font-medium" allowFontScaling={false}>✉️ Send Feedback  </Text>
        </TouchableOpacity>

        {/* Privacy Policy */}
        <TouchableOpacity
          onPress={() => navigation.navigate('PrivacyPolicy')}
          activeOpacity={0.7}
          className="w-full  mb-1   items-center justify-center">
          <Text className="text-neutral-500 text-base font-medium" allowFontScaling={false}>🔒 Privacy Policy  </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// export default AppOptions;

export default PrivacyPolicy_btn;
