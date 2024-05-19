import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Image, ImageBackground, SafeAreaView, StatusBar, Animated, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../api';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [romanticMovies, setRomanticMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [thrillerMovies, setThrillerMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);

  const [trendingPage, setTrendingPage] = useState(1);
  const [romanticPage, setRomanticPage] = useState(1);
  const [horrorPage, setHorrorPage] = useState(1);
  const [thrillerPage, setThrillerPage] = useState(1);
  const [actionPage, setActionPage] = useState(1);

  const [loadingTrending, setLoadingTrending] = useState(false);
  const [loadingRomantic, setLoadingRomantic] = useState(false);
  const [loadingHorror, setLoadingHorror] = useState(false);
  const [loadingThriller, setLoadingThriller] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);

  const [backgroundImage, setBackgroundImage] = useState(null);
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadTrendingMovies(trendingPage);
    loadRomanticMovies(romanticPage);
    loadHorrorMovies(horrorPage);
    loadThrillerMovies(thrillerPage);
    loadActionMovies(actionPage);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  const loadTrendingMovies = async (page) => {
    if (loadingTrending) return;
    setLoadingTrending(true);
    try {
      const response = await api.get('/movie/popular', { params: { page:page } });
      const fetchedMovies = response.data.results;
      setTrendingMovies(prevMovies => [...prevMovies, ...fetchedMovies]);

      if (!backgroundImage && fetchedMovies.length > 0) {
        const randomMovie = fetchedMovies[Math.floor(Math.random() * fetchedMovies.length)];
        setBackgroundImage(randomMovie.backdrop_path);
      }
    } catch (error) {
      console.error(error);
    }
    setLoadingTrending(false);
  };

  const loadRomanticMovies = async (page) => {
    if (loadingRomantic) return;
    setLoadingRomantic(true);
    try {
      const response = await api.get('/discover/movie', {
        params: {
          with_genres: 10749, // Genre ID for Romantic
          page:page,
        },
      });
      const fetchedMovies = response.data.results;
      setRomanticMovies(prevMovies => [...prevMovies, ...fetchedMovies]);
    } catch (error) {
      console.error(error);
    }
    setLoadingRomantic(false);
  };

  const loadHorrorMovies = async (page) => {
    if (loadingHorror) return;
    setLoadingHorror(true);
    try {
      const response = await api.get('/discover/movie', {
        params: {
          with_genres: 27, 
          page:page,
        },
      });
      const fetchedMovies = response.data.results;
      setHorrorMovies(prevMovies => [...prevMovies, ...fetchedMovies]);
    } catch (error) {
      console.error(error);
    }
    setLoadingHorror(false);
  };

  const loadThrillerMovies = async (page) => {
    if (loadingThriller) return;
    setLoadingThriller(true);
    try {
      const response = await api.get('/discover/movie', {
        params: {
          with_genres: 53,
          page:page,
        },
      });
      const fetchedMovies = response.data.results;
      setThrillerMovies(prevMovies => [...prevMovies, ...fetchedMovies]);
    } catch (error) {
      console.error(error);
    }
    setLoadingThriller(false);
  };

  const loadActionMovies = async (page) => {
    if (loadingAction) return;
    setLoadingAction(true);
    try {
      const response = await api.get('/discover/movie', {
        params: {
          with_genres: 28, 
          page:page,
        },
      });
      const fetchedMovies = response.data.results;
      setActionMovies(prevMovies => [...prevMovies, ...fetchedMovies]);
    } catch (error) {
      console.error(error);
    }
    setLoadingAction(false);
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
  const renderTrendingMovieItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { movieId: item.id })} style={[styles.trendingcard, { marginTop: 20, marginBottom: 20, height: 300 }]}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.trendingposter}
      />
      <Text style={styles.trendingtitle}>{item.title}</Text>
    </TouchableOpacity>
    
  );

  const loadMoreTrendingMovies = () => {
    if (loadingTrending) return;
    const nextPage = trendingPage + 1;
    setTrendingPage(nextPage);
    loadTrendingMovies(nextPage);
  };

  const loadMoreRomanticMovies = () => {
    if (loadingRomantic) return;
    const nextPage = romanticPage + 1;
    setRomanticPage(nextPage);
    loadRomanticMovies(nextPage);
  };

  const loadMoreHorrorMovies = () => {
    if (loadingHorror) return;
    const nextPage = horrorPage + 1;
    setHorrorPage(nextPage);
    loadHorrorMovies(nextPage);
  };

  const loadMoreThrillerMovies = () => {
    if (loadingThriller) return;
    const nextPage = thrillerPage + 1;
    setThrillerPage(nextPage);
    loadThrillerMovies(nextPage);
  };

  const loadMoreActionMovies = () => {
    if (loadingAction) return;
    const nextPage = actionPage + 1;
    setActionPage(nextPage);
    loadActionMovies(nextPage);
  };

  return (
    <View style={styles.safeArea}>
      <TouchableOpacity style={styles.searchButton} onPress={() => navigation.navigate('Search')}>
        <Ionicons name="search" size={24} color="black" />
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        {backgroundImage && (
          <ImageBackground
            source={{ uri: `https://image.tmdb.org/t/p/original${backgroundImage}` }}
            style={styles.backgroundImage}
          >
            <View style={styles.overlay}>
              <View style={styles.box}>
                <Animated.Text style={[styles.headerContainer, { opacity: fadeAnim }]}>Trending Movies</Animated.Text>
                <FlatList
                  data={trendingMovies}
                  renderItem={renderTrendingMovieItem}
                  keyExtractor={item => `trending-${item.id}`} // for making unique keys
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  snapToAlignment="center"
                  decelerationRate="slow"
                  snapToInterval={200}
                  ListFooterComponent={loadingTrending ? <ActivityIndicator style={styles.activityindicator} size="large" /> : (
                    <TouchableOpacity style={styles.loadMoreButton} onPress={loadMoreTrendingMovies}>
                      <Text style={styles.loadMoreButtonText}>Load More</Text>
                    </TouchableOpacity>
                  )}
                  contentContainerStyle={styles.listContentContainer}
                />
                <Animated.Text style={[styles.headerContainer, { opacity: fadeAnim }]}>Romantic Movies</Animated.Text>
                <FlatList
                  data={romanticMovies}
                  renderItem={renderMovieItem}
                  keyExtractor={item => `romantic-${item.id}`}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ListFooterComponent={loadingRomantic ? <ActivityIndicator size="large" /> : (
                    <TouchableOpacity style={styles.loadMoreButton} onPress={loadMoreRomanticMovies}>
                      <Text style={styles.loadMoreButtonText}>Load More</Text>
                    </TouchableOpacity>
                  )}
                  contentContainerStyle={styles.listContentContainer}
                />
                <Animated.Text style={[styles.headerContainer, { opacity: fadeAnim }]}>Horror Movies</Animated.Text>
                <FlatList
                  data={horrorMovies}
                  renderItem={renderMovieItem}
                  keyExtractor={item => `horror-${item.id}`}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ListFooterComponent={loadingHorror ? <ActivityIndicator size="large" /> : (
                    <TouchableOpacity style={styles.loadMoreButton} onPress={loadMoreHorrorMovies}>
                      <Text style={styles.loadMoreButtonText}>Load More</Text>
                    </TouchableOpacity>
                  )}
                  contentContainerStyle={styles.listContentContainer}
                />
                <Animated.Text style={[styles.headerContainer, { opacity: fadeAnim }]}>Thriller Movies</Animated.Text>
                <FlatList
                  data={thrillerMovies}
                  renderItem={renderMovieItem}
                  keyExtractor={item => `thriller-${item.id}`}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ListFooterComponent={loadingThriller ? <ActivityIndicator size="large" /> : (
                    <TouchableOpacity style={styles.loadMoreButton} onPress={loadMoreThrillerMovies}>
                      <Text style={styles.loadMoreButtonText}>Load More</Text>
                    </TouchableOpacity>
                  )}
                  contentContainerStyle={styles.listContentContainer}
                />
                <Animated.Text style={[styles.headerContainer, { opacity: fadeAnim }]}>Action Movies</Animated.Text>
                <FlatList
                  data={actionMovies}
                  renderItem={renderMovieItem}
                  keyExtractor={item => `action-${item.id}`} 
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ListFooterComponent={loadingAction ? <ActivityIndicator size="large" /> : (
                    <TouchableOpacity style={styles.loadMoreButton} onPress={loadMoreActionMovies}>
                      <Text style={styles.loadMoreButtonText}>Load More</Text>
                    </TouchableOpacity>
                  )}
                  contentContainerStyle={styles.listContentContainer}
                />
              </View>
            </View>
          </ImageBackground>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  box: {
    flex: 1,
    marginTop: 40,
  },
  headerContainer: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
  },
  container: {
    flex: 1,
    position: 'relative',
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
  searchButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  trendingcard: {
    marginRight: 10,
    marginLeft: 10,
    width: 350,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    // marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  trendingposter: {
    width: '100%',
    height: '80%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },
  trendingtitle: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    width: 180,
    margin: 5,
    backgroundColor: 'white',
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
    height: 250,
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
  listContentContainer: {
    paddingHorizontal: 5,
  },
  loadMoreButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    margin: 'auto',
    alignSelf: 'center',
  },
  activityindicator: {
    padding: 10,
    margin: 'auto',
    alignSelf: 'center',
  },
  loadMoreButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
