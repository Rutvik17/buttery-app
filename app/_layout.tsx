import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import useButteryStore from './store';
import apiClient from './axios';
import { ThemedView } from '@/components/ThemedView';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { ThemedText } from '@/components/ThemedText';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const ActivityIndicatorContainer = styled(ThemedView)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    PoppinsBlack: require('../assets/fonts/Poppins-Black.ttf'),
    PoppinsBlackItalic: require('../assets/fonts/Poppins-BlackItalic.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    PoppinsBoldItalic: require('../assets/fonts/Poppins-BoldItalic.ttf'),
    PoppinsExtraBold: require('../assets/fonts/Poppins-ExtraBold.ttf'),
    PoppinsExtraBoldItalic: require('../assets/fonts/Poppins-ExtraBoldItalic.ttf'),
    PoppinsExtraLight: require('../assets/fonts/Poppins-ExtraLight.ttf'),
    PoppinsExtraLightItalic: require('../assets/fonts/Poppins-ExtraLightItalic.ttf'),
    PoppinsItalic: require('../assets/fonts/Poppins-Italic.ttf'),
    PoppinsLight: require('../assets/fonts/Poppins-Light.ttf'),
    PoppinsLightItalic: require('../assets/fonts/Poppins-LightItalic.ttf'),
    PoppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
    PoppinsMediumItalic: require('../assets/fonts/Poppins-MediumItalic.ttf'),
    PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsSemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsSemiBoldItalic: require('../assets/fonts/Poppins-SemiBoldItalic.ttf'),
    PoppinsThin: require('../assets/fonts/Poppins-Thin.ttf'),
    PoppinsThinItalic: require('../assets/fonts/Poppins-ThinItalic.ttf'),
  });
  const { setUser, user } = useButteryStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loaded) {
      (async () => {
        try {
          // const user = await apiClient.get(`/users/${'855418852'}`);
          // setUser(user.data);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [loaded]);

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  if (error) {
    return (
      <ActivityIndicatorContainer>
        <ThemedText>{error.message}</ThemedText>
      </ActivityIndicatorContainer>
    );
  }

  if (loading) {
    return (
      <ActivityIndicatorContainer>
        <ActivityIndicator size="large" />
      </ActivityIndicatorContainer>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
