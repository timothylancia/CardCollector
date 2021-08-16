import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
  Animated
} from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7CB48F",
    flex: 1
  },
  safearea: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  }
});

class search extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safearea}>
          <Text>search</Text>
        </SafeAreaView>
      </View>
    );
  }
}

export default search;
