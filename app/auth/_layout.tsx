import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import styled from "styled-components/native";
import Onboarding from "./onboarding";
import { useState } from "react";

const Container = styled(ThemedView)`
    flex: 1;
`;

const Auth = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const total = 4;
    const onIndexChange = (index: number) => {
        setSelectedIndex(index);
    };
    return (
        <Container>
            <Onboarding
                total={total}
                selectedIndex={selectedIndex}
                onIndexChange={(index) => onIndexChange(index)}
            />
        </Container>
    )
};

export default Auth;