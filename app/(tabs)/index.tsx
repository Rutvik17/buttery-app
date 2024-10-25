import { Image, StyleSheet, Dimensions } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import useButteryStore from '../store';

export default function HomeScreen() {
  const { user } = useButteryStore();
  if (!user) return null;
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={{ uri: user.profile_image_url.toString() }}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{user.display_name}</ThemedText>
        <HelloWave />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reactLogo: {
    height: 250,
    width: Dimensions.get('window').width,
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    position: 'absolute',
  },
});
