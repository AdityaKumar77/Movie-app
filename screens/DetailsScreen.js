import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const TMDB_API_KEY = '416545758b4d41790a6b9ccd62098b52';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const DetailsScreen = ({ route }) => {
  const { movieId } = route.params;
  const [movieDetails, setMovieDetails] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {
          params: {
            api_key: TMDB_API_KEY,
          },
        });
        setMovieDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {movieDetails && (
        <ImageBackground
          source={{ uri: `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}` }}
          style={styles.backgroundImage}
        >
          <ScrollView contentContainerStyle={styles.contentContainer} >
            <View style={styles.overlay}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.title}>{movieDetails.title}</Text>
              {movieDetails.tagline.length !== 0 && (
                <Text style={styles.subtitle}>"{movieDetails.tagline}"</Text>
              )}
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` }}
                style={styles.poster}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Release Date: {movieDetails.release_date}</Text>
                <Text style={styles.infoText}>Rating: {movieDetails.vote_average} / 10</Text>
                <Text style={styles.infoText}>Runtime: {movieDetails.runtime} minutes</Text>
                <Text style={styles.infoText}>Genres: {movieDetails.genres.map(genre => genre.name).join(', ')}</Text>
                <Text style={styles.infoText}>Status: {movieDetails.status}</Text>
              </View>
              <Text style={styles.overview}>{movieDetails.overview}</Text>
            </View>
          </ScrollView>
        </ImageBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // scrollView: {
  //   flex: 0,
  // },
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  contentContainer: {
    flexGrow: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontStyle: 'italic',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  poster: {
    width: 300,
    height: 450,
    alignSelf: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  overview: {
    fontSize: 16,
    color: 'white',
    lineHeight: 24,
    textAlign: 'justify',
  },
});

export default DetailsScreen;
