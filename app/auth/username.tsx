import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useRef, useState } from "react";
import { Dimensions, TextInput } from "react-native";
import styled from "styled-components/native";

const _screenWidth = Dimensions.get('screen').width;

const Container = styled(ThemedView)`
    flex: 1;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 8px;
    padding-top: 65px
`;

const Header = styled(ThemedText) <{ color: string }>`
    font-size: ${_screenWidth * 0.1}px;
    line-height: ${_screenWidth * 0.1 + 16}px;
    font-family: PoppinsExtraLightItalic;
    color: ${props => props.color}
`;

const InputContainer = styled(ThemedView)`
    margin-top: 16px;
`;

const Label = styled(ThemedText) <{ color: string }>`
    font-size: 16px;
    line-height: 24px;
    fon-family: PoppinsExtraLightItalic;
    color: ${props => props.color}
`;

const Input = styled(TextInput)`
    height: 60px;
    width: ${_screenWidth - 16}px;
    border-width: 1px;
    border-radius: 8px;
    padding: 8px;
    margin-top: 8px;
`;

const Username = () => {
    const colorScheme = useColorScheme();
    const [username, setUsername] = useState<string>();
    return (
        <Container>
            <Header color={Colors[colorScheme ?? 'light'].magenta}>
                Buttery.
            </Header>
            <InputContainer>
                <Label color={Colors[colorScheme ?? 'light'].text}>
                    Username
                </Label>
                <Input
                    style={{
                        color: Colors[colorScheme ?? 'light'].text,
                        borderColor: Colors[colorScheme ?? 'light'].jetBlack
                    }}
                    value={username}
                    onChange={(value) => setUsername(value.nativeEvent.text)}
                />
            </InputContainer>
        </Container>
    )
};

export default Username;