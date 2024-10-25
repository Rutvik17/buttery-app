import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import Animated, { AnimatedProps, FadeInDown, FadeInLeft, FadeOutLeft, FadeOutUp, interpolateColor, LinearTransition, SharedValue, useAnimatedStyle, useDerivedValue, withSpring } from 'react-native-reanimated';
import styled from 'styled-components/native';

const _spacing = 12;
const _buttonHeight = 42;
const _dotContainer = 24;
const _dotSize = _dotContainer / 3;
const _layoutTransition = LinearTransition.springify().damping(80).stiffness(200);

const Container = styled(ThemedView)`
    flex: 1;
    justify-content: center;
    padding: ${_spacing}px;
    gap: ${_spacing * 2}px;
`;

const ButtonsContainer = styled(ThemedView)`
    flex-direction: row;
    gap: ${_spacing}px;
`;

type OnboardingProps = {
    total: number;
    selectedIndex: number;
    onIndexChange: (index: number) => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
function Button({ children, style, ...rest }: AnimatedProps<PressableProps>) {
    return (
        <AnimatedPressable
            style={[{
                height: _buttonHeight,
                borderRadius: _buttonHeight / 2,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: _spacing * 2,
            }, style]} {...rest}
            entering={FadeInLeft.springify().damping(80).stiffness(200)}
            exiting={FadeOutLeft.springify().damping(80).stiffness(200)}
            layout={_layoutTransition}
        >
            {children}
        </AnimatedPressable>
    )
}

const Dot = ({ index, animation }: { index: number, animation: SharedValue }) => {
    const colorScheme = useColorScheme();
    const _activeDot = Colors[colorScheme ?? 'light'].magenta;
    const _inActiveDot = Colors[colorScheme ?? 'light'].royalPurple;

    const animatedDotStyles = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(
                animation.value as number,
                [index - 1, index, index + 1],
                [_inActiveDot, _activeDot, _activeDot]
            ),
        }
    });
    return (
        <Animated.View style={{
            width: _dotContainer,
            height: _dotContainer,
            borderRadius: _dotContainer / 2,
            // backgroundColor: Colors[colorScheme ?? 'light'].jetBlack,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Animated.View style={[animatedDotStyles, {
                width: _dotSize,
                height: _dotSize,
                borderRadius: _dotSize / 2,
                backgroundColor: Colors[colorScheme ?? 'light'].magenta,
                opacity: 0.5,
            }]} />
        </Animated.View>
    )
}

const PaginationIndicator = ({ animation }: { animation: SharedValue }) => {
    const colorScheme = useColorScheme();
    const stylez = useAnimatedStyle(() => {
        return {
            // @ts-ignore
            width: _dotContainer + _dotContainer * animation.value,
        }
    });
    return (
        <Animated.View style={[{
            height: _dotContainer,
            borderRadius: _dotContainer,
            position: 'absolute',
            left: 0,
            top: 0,
            backgroundColor: Colors[colorScheme ?? 'light'].jetBlack,
        }, stylez]} />
    )
};

const Pagination = ({ animation, total }: { animation: SharedValue, total: number }) => {
    return (
        <ThemedView style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ThemedView style={{ flexDirection: 'row' }}>
                <PaginationIndicator animation={animation} />
                {[...Array(total).keys()].map((index) => (
                    <Dot key={`dot-${index}`} index={index} animation={animation} />
                ))}
            </ThemedView>
        </ThemedView>
    )
};

const Onboarding: React.FC<OnboardingProps> = ({ total, selectedIndex, onIndexChange }) => {
    const colorScheme = useColorScheme();
    const animation = useDerivedValue(() => {
        return withSpring(selectedIndex, {
            damping: 80,
            stiffness: 200,
        })
    })
    return (
        <Container>
            <Pagination total={total} animation={animation} />
            <ButtonsContainer>
                {selectedIndex > 0 &&
                    <Button style={{
                        backgroundColor: Colors[colorScheme ?? 'light'].magenta,
                    }} onPress={() => onIndexChange(selectedIndex - 1)}>
                        <ThemedText>
                            Back
                        </ThemedText>
                    </Button>
                }
                <Button style={{
                    backgroundColor: Colors[colorScheme ?? 'light'].royalPurple,
                    flex: 1,
                }} onPress={() => {
                    if (selectedIndex >= total - 1) {
                        return;
                    } else {
                        onIndexChange(selectedIndex + 1);
                    }
                }}>
                    {selectedIndex === total - 1 ? (
                        <Animated.Text
                            key="finish"
                            style={{ color: Colors[colorScheme ?? 'light'].text }}
                            entering={FadeInDown.springify().damping(80).stiffness(200)}
                            exiting={FadeOutUp.springify().damping(80).stiffness(200)}
                        >
                            Finish
                        </Animated.Text>
                    ) : (
                        <Animated.Text
                            key="next"
                            style={{ color: Colors[colorScheme ?? 'light'].text }}
                            entering={FadeInDown.springify().damping(80).stiffness(200)}
                            exiting={FadeOutUp.springify().damping(80).stiffness(200)}
                            layout={_layoutTransition}>
                            Next
                        </Animated.Text>
                    )}
                </Button>
            </ButtonsContainer>
        </Container>
    )
};

export default Onboarding;