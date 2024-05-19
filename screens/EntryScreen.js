import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, ImageBackground } from 'react-native';

const EntryScreen = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const fadeOut = Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        });

        const timeout = setTimeout(() => {
            fadeOut.start(() => {
                navigation.replace('Home');
            });
        }, 500);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <ImageBackground
            source={require('../assets/movies.png')} // Adjust the image source as needed
            style={styles.background}
            resizeMode="cover"
        >
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    // text: {
    //     flex: 1,
    //     width: 250, 
    //     height: 'auto', 
    //     // backgroundColor: 'black'
    // },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'red',
        position: 'absolute',
        top: 300 // Adjust the text color for better visibility
    },
});

export default EntryScreen;
