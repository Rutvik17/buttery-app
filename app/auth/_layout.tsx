import { ThemedView } from "@/components/ThemedView";
import styled from "styled-components/native";
import Onboarding from "./onboarding";
import { useRef, useState } from "react";
import { Dimensions, FlatList, Keyboard, KeyboardAvoidingView, Platform, Pressable, TextInput } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import Username from "./username";
import Password from "./password";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Name from "./name";

const Container = styled(ThemedView)`
    flex: 1;
`;

type OnboardingItem = {
    key: string;
    component: React.ComponentType;
};

const { width } = Dimensions.get('window');

const loginScreens: OnboardingItem[] = [
    { key: 'username', component: Username },
    { key: 'password', component: Password },
];

const registerScreens: OnboardingItem[] = [
    { key: 'name', component: Name },
    { key: 'username', component: Username },
    { key: 'password', component: Password },
    { key: 'confirmPassword', component: Password },
]

const Auth = () => {
    const colorScheme = useColorScheme();
    const [type, setType] = useState<'Login' | 'Register'>('Register');
    const data = type === 'Login' ? loginScreens : registerScreens;
    const [selectedIndex, setSelectedIndex] = useState(0);
    const flatListRef = useRef<FlatList<OnboardingItem>>(null);

    const onIndexChange = (index: number) => {
        Keyboard.dismiss();
        setSelectedIndex(index);
        if (flatListRef && flatListRef.current) {
            flatListRef.current.scrollToIndex({ index });
        }
    };

    const onChangeType = (type: 'Login' | 'Register') => {
        Keyboard.dismiss();
        setSelectedIndex(0);
        if (flatListRef && flatListRef.current) {
            flatListRef.current.scrollToIndex({ index: 0 });
        }
        setType(type);
    }

    const renderItem = ({ item }: { item: OnboardingItem }) => {
        const Component = item.component;
        return (
            <ThemedView style={{ width }}>
                <Component />
            </ThemedView>
        );
    };

    const keyExtractor = (item: OnboardingItem) => item.key;

    return (
        <Container>
            <FlatList
                data={data}
                horizontal
                pagingEnabled
                ref={flatListRef}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                snapToInterval={width}
                decelerationRate="fast"
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                style={{
                    flex: 1
                }}
            />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ThemedView style={{
                    alignItems: 'center'
                }}>
                    {type === 'Login' &&
                        (
                            <ThemedView style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <ThemedText style={{ fontFamily: 'PoppinsLight' }}>
                                    Don't have an account ?
                                </ThemedText>
                                <Pressable onPress={() => onChangeType('Register')}>
                                    <ThemedText style={{ fontFamily: 'PoppinsBoldItalic', color: Colors[colorScheme ?? 'light'].royalPurple, }}>
                                        {` Register `}
                                    </ThemedText>
                                </Pressable>
                                <ThemedText style={{ fontFamily: 'PoppinsLight' }}>
                                    here.
                                </ThemedText>
                            </ThemedView>
                        )
                    }
                    {type === 'Register' &&
                        (
                            <ThemedView style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <ThemedText style={{ fontFamily: 'PoppinsLight' }}>
                                    Already have an account ?
                                </ThemedText>
                                <Pressable onPress={() => onChangeType('Login')}>
                                    <ThemedText style={{ fontFamily: 'PoppinsBoldItalic', color: Colors[colorScheme ?? 'light'].royalPurple, }}>
                                        {` Login `}
                                    </ThemedText>
                                </Pressable>
                                <ThemedText style={{ fontFamily: 'PoppinsLight' }}>
                                    here.
                                </ThemedText>
                            </ThemedView>
                        )
                    }
                </ThemedView>
                <Onboarding
                    total={data.length}
                    selectedIndex={selectedIndex}
                    onIndexChange={(index) => onIndexChange(index)}
                />
            </KeyboardAvoidingView>
        </Container>
    )
};

export default Auth;