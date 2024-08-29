import React, { useRef, useState } from 'react';
import { View, Text, Button, Animated, StyleSheet } from 'react-native';

const App = () => {
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const [rotation, setRotation] = useState(0);
    const [buttonTranslateY, setButtonTranslateY] = useState(0);

    const rotateTextView = () => {
        const newRotation = rotation + 10;
        setRotation(newRotation);

        Animated.timing(rotateAnim, {
            toValue: newRotation,
            duration: 300,
            useNativeDriver: true,
        }).start();


        const translation = Math.abs(Math.sin(newRotation * (Math.PI / 180)) * 20);
        setButtonTranslateY(translation);
    };

    const rotationInterpolate = rotateAnim.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg'],
    });

    const animatedStyle = {
        transform: [{ rotate: rotationInterpolate }],
    };

    const buttonStyle = {
        transform: [{ translateY: buttonTranslateY }],
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.textView, animatedStyle]}>
                <Text style={styles.text}>Xoay tôi!</Text>
            </Animated.View>
            <Animated.View style={buttonStyle}>
                <Button title="Xoay" onPress={rotateTextView} />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textView: {
        marginBottom: 20,
        color: 'red'
    },
    text: {
        fontSize: 24,
        color: 'red',
        backgroundColor: 'green'
    },
});

export default App;
