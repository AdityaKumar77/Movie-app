import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Image, TextInput, SafeAreaView, StatusBar, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../api';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const navigation = useNavigation();
    let temp=1;
    useEffect(() => {
        fetchRandomBackgroundImage();
    }, []);

    const fetchRandomBackgroundImage = async () => {
        try {
            const response = await api.get('/movie/popular', {
                params: { page: 1 },
            });
            const fetchedMovies = response.data.results;
            if (fetchedMovies.length > 0) {
                const randomMovie = fetchedMovies[Math.floor(Math.random() * fetchedMovies.length)];
                setBackgroundImage(randomMovie.backdrop_path);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const searchMovies = async () => {
        if (searchQuery.trim() === '') return;
        setLoading(true);
        temp=10;
        try {
            const response = await api.get('/search/movie', {
                params: { query: searchQuery },
            });
            setSearchResults(response.data.results);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const renderMovieItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Details', { movieId: item.id })} style={styles.card}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={styles.poster}
            />
            <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
    );

    const handleSearchSubmit = () => {
        searchMovies();
    };

    return (
        <View style={styles.safeArea}>
            {/* <StatusBar style={styles.statusbar} /> */}
            <View style={styles.container}>
                {backgroundImage && (
                    <ImageBackground
                        source={{ uri: `https://image.tmdb.org/t/p/original${backgroundImage}` }}
                        style={styles.backgroundImage}
                    >
                        <View style={styles.overlay}>
                            <View style={styles.box}>
                                <View style={styles.searchBarContainer}>
                                    <TextInput
                                        style={styles.searchInput}
                                        placeholder="Search for a movie..."
                                        placeholderTextColor="white"
                                        value={searchQuery}
                                        onChangeText={(text) => setSearchQuery(text)}
                                        onSubmitEditing={handleSearchSubmit}
                                    />
                                    <TouchableOpacity style={styles.searchButton} onPress={handleSearchSubmit}>
                                        <Ionicons name="search" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                                {loading ? (
                                    <ActivityIndicator size="large" />
                                ) : (
                                    <>
                                        {searchResults.length === 0 && searchQuery.trim() !== '' && temp!=1 && (
                                            <View style={styles.noResultsContainer}>
                                                <Text style={styles.noResultsText}>No movies found</Text>
                                            </View>
                                        )}
                                        <FlatList
                                            data={searchResults}
                                            renderItem={renderMovieItem}
                                            keyExtractor={item => item.id.toString()}
                                            numColumns={2}
                                            columnWrapperStyle={styles.row}
                                        />
                                    </>
                                )}
                                <TouchableOpacity style={styles.backbutton} onPress={() => navigation.navigate('Home')}>
                                    <Text style={styles.back}>Back to Popular Movies</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        // backgroundColor: 'grey',
    },
    box:{
        flex:1,
        marginTop:40,
    },
    back: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
    },
    backbutton: {
        alignSelf: 'center',
        margin: 10,
        padding: 10,
        backgroundColor: 'grey',
        borderRadius: 5,
    },
    container: {
        flex: 1,
        position: 'relative',
        // backgroundColor: 'white',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 10,
    },
    searchBarContainer: {
        flexDirection: 'row',
        backgroundColor: 'grey',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        paddingHorizontal: 20,
        margin: 13,
        height: 60,
        width: 'auto',
    },
    searchInput: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 15,
        fontSize: 16,
        color: 'white',
    },
    searchButton: {
        backgroundColor: 'white',
        borderRadius: 25,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        flex: 1,
        margin: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    poster: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        resizeMode: 'cover',
    },
    title: {
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    row: {
        flex: 1,
        justifyContent: 'space-between',
    },
    noResultsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noResultsText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    statusbar: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
});

export default SearchScreen;
