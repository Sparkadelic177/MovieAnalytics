import { Text, View } from "react-native";
import styles from "../styles/analyticsBox"

const AnalyticsBox = ({ mean, deviation, median }) => {
  return (
    <View style={styles.boxContainer}>
      <View style={styles.cell}>
        <Text>Box Office Mean: {mean}</Text>
      </View>
      <View style={styles.cell}>
        <Text>Box Office Standard Deviation: {deviation}</Text>
      </View>
      <View style={styles.cell}>
        <Text>Median RT Score: {median}</Text>
      </View>
    </View>
  );
};

export default AnalyticsBox;
