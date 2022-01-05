import { Text, View, Image } from "react-native";
import styles from "../styles/moviePoster.js";

const MoviePoster = ({ posterImage, title }) => {
  return (
    <View style={styles.posterContainer}>
      <Image
        style={styles.posterImage}
        source={{
          uri: posterImage
        }}
      />
      <Text style={styles.posterText}>{title}</Text>
    </View>
  );
};

export default MoviePoster;
