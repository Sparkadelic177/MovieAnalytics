import { useState } from "react";
import {
  FlatList,
  View,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import MoviePoster from "./src/components/MoviePoster";
import AnalyticsBox from "./src/components/AnalyticsBox";
import { searchMovies, searchMovie } from "./src/services/fetchMovies";
import {
  moviesReturned,
  calculateDeviation,
  calculateMean,
  calculateMedian,
  currencyFormat
} from "./src/utils/movieUtils";
import styles from "./src/styles/app";

const App = () => {
  const [mean, setMean] = useState(0);
  const [deviation, setDeviation] = useState(0);
  const [median, setMedian] = useState(0);
  const [movies, setMovies] = useState([]);
  const [movieData, setMovieData] = useState(new Map([]));
  const [wordSearch, setWordSearch] = useState("");

  const calculateAnalytics = async () => {
    const dataToCalculate = [];
    for(const movie of movieData){ 
      const res = await searchMovie(movie[0]);
      const RTMapper = {
        [res.Ratings[0]?.Source]: res.Ratings[0]?.Value,
        [res.Ratings[1]?.Source]: res.Ratings[1]?.Value,
        [res.Ratings[2]?.Source]: res.Ratings[2]?.Value,
      };
      console.log(res.BoxOffice);
      const data = {
        boxOffice: parseInt(res.BoxOffice.replace('$','').replace(/,/g,'')) || 0,
        RT: parseFloat(RTMapper["Rotten Tomatoes"] || 0),
      };
      dataToCalculate.push(data);
    };

    console.log(dataToCalculate);
    setMean(currencyFormat(calculateMean(dataToCalculate)));
    setMedian(`${calculateMedian(dataToCalculate)}%`);
    setDeviation(currencyFormat(calculateDeviation(dataToCalculate)));
  };

  const resetAnalytics = () => {
    setMean(0);
    setMedian(0);
    setDeviation(0);
  };

  const handleClick = (title, id) => {
    const tempData = movieData;
    if (tempData.get(id)) {
      tempData.delete(id);
      setMovieData(tempData);
    } else {
      tempData.set(id, title);
    }
    calculateAnalytics();
  };

  const searchForMovie = async () => {
    resetAnalytics();

    try {
      const data = await searchMovies(wordSearch);
      setMovies(moviesReturned(data, wordSearch));
    } catch (err) {
      alert("here");
      alert(err);
    }
  };

  const RenderMoviePoster = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleClick(item.Title, item.imdbID)}>
        <MoviePoster posterImage={item.Poster} title={item.Title} />
      </TouchableOpacity>
    );
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
          onPress={searchForMovie}
        />
      </View>
      <AnalyticsBox mean={mean} deviation={deviation} median={median} />
      <View style={styles.moviePostersContainer}>
        <FlatList
          data={movies}
          renderItem={RenderMoviePoster}
          keyExtractor={(item) => item.imdbID}
        />
      </View>
    </View>
  );
};

export default App;
