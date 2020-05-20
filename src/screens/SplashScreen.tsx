import React from 'react';
import LottieView from 'lottie-react-native';

const SplashScreen = () => {
  return <LottieView source={require('../utils/lottie.json')} autoPlay loop />;
};

export default SplashScreen;
