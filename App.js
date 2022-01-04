import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, Button } from "react-native";
import MoviePoster from "./src/components/MoviePoster";
import AnalyticsBox from "./src/components/AnalyticsBox";
import { searchMovies } from "./src/services/fetchMovies";
import styles from "./src/styles/app";

const App = () => {
  const [mean, setMean] = useState(0);
  const [deviation, setDeviation] = useState(0);
  const [median, setMedian] = useState(0);
  const [movies, setMovies] = useState([]);
  const [movieData, setMovieData] = useState(new Map());
  const [wordSearch, setWordSearch] = useState("");

  useEffect(() => {}, []);

  const handleClick = (title, id) => {
    const tempData = movieData;
    if (tempData.get(id)) {
      tempData.delete(id);
      setMovieData(tempData);
    } else {
      tempData.set(id, title);
    }
  };

  const searchMovie = async () => {
    try {
      const data = await searchMovies(wordSearch);
      console.log(data);
      setMovies(data);
    } catch (err) {}
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={wordSearch}
          onChangeText={setWordSearch}
        />
        <Button
          style={styles.searchButton}
          title="search"
          onPress={searchMovie}
        >
          {" "}
        </Button>
      </View>
      <AnalyticsBox mean={mean} deviation={deviation} median={median} />
      {movies.map((movie) => {
        return (
          <TouchableOpacity
            onPress={() => handleClick(movie.Title, movie.imdbID)}
          >
            <MoviePoster title={movie.Title} posterImage={movie.Poster} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default App;
