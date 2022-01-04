import { Text, View, Image } from "react-native";
import styles from "../styles/moviePoster.js";

const MoviePoster = ({ title, posterImage }) => {
  return (
    <View styles={styles.posterContainer}>
      <Image
        styles={styles.posterImage}
        source={{
          uri: "https://m.media-amazon.com/images/M/MV5BMTgxMjI2NzgxMl5BMl5BanBnXkFtZTcwMDIyMzk3NA@@._V1_SX300.jpg",
          cache: 'only-if-cached'
        }}
      />
      <Text styles={styles.posterText}>{title}</Text>
    </View>
  );
};

export default MoviePoster;
