import React from 'react';
import { MotiView } from "moti";
import { Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Pressable } from "react-native";
import { Colors } from '@/constants/Colors';
import styled from 'styled-components/native';
import { Home, User } from 'lucide-react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import {
  LinearTransition
} from 'react-native-reanimated';
import Auth from '../auth/_layout';

const Container = styled(BlurView)`
    height: 75px;
    flex-direction: row;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background-color: rgba(0,0,0,0.2);
    align-items: center;
    justify-content: space-around;
`;

const TabContainer = styled(MotiView)`
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  height: 40px;
  overflow: hidden;
`;

const Tab = styled(Pressable)`
  padding: 8px;
  gap: 4px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const TabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    return (
      <Container tint="dark" intensity={10}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const icon = route.name === 'index' ?
            <Home size={24} color={isFocused ? '#FFF' : '#666'} />
            : <User size={24} color={isFocused ? '#FFF' : '#666'} />;

          return (
            <TabContainer
              layout={LinearTransition.springify().damping(80).stiffness(200)}
              key={index}
            >
              <Tab
                key={index}
                onPress={onPress}
                style={{}}
              >
                {icon}
              </Tab>
            </TabContainer>
          );
        })}
      </Container>
    );
  }

  return (
    // <Tabs
    //   tabBar={(props) => <TabBar {...props} />}
    //   screenOptions={{
    //     tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
    //     headerShown: false,
    //   }}
    // >
    //   <Tabs.Screen
    //     name="index"
    //     options={{
    //       title: 'Home',
    //       tabBarIcon: ({ color, focused }) => (
    //         <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="explore"
    //     options={{
    //       title: 'Explore',
    //       tabBarIcon: ({ color, focused }) => (
    //         <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
    //       ),
    //     }}
    //   />
    // </Tabs>
    <Auth />
  );
}
