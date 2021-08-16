import React from "react";
import {
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View
} from "react-native";
import { cardFetch } from "../util/api";

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  rowOdd: {
    backgroundColor: "#eeeeee"
  },
  rowText: {
    color: "#4A4A4A",
    fontSize: 12,
    fontWeight: "500"
  },
  sep: {
    height: 1,
    backgroundColor: "#E4E4E4",
    flex: 1
  },
  numCard: {
    backgroundColor: "rgba(52, 52, 52, .0)",
    flexDirection: "row",
    alignItems: "center"
  },
  numText: {
    color: "#4A4A4A",
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 10,
    marginRight: 10
  },
  button: {
    paddingHorizontal: 8,
    backgroundColor: "#c4c4c4"
  }
});

let n = 1;

export const ListItem = ({
  cardName,
  numCardOwned,
  onPress1,
  onPress2,
  onPress3,
  isLoading = false
}) => {
  if (numCardOwned >= 1) {
    n = n + 1;
    return (
      <TouchableOpacity
        onPress={onPress1}
        style={[styles.row, n % 2 && styles.rowOdd]}
      >
        <Text style={styles.rowText}>{cardName}</Text>
        <View style={styles.numCard}>
          <TouchableOpacity
            style={styles.button}
            onPress={onPress2}
            disabled={isLoading}
          >
            <Text style={styles.rowText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.numText}>{numCardOwned}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={onPress3}
            disabled={isLoading}
          >
            <Text style={styles.rowText}>+</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  } else {
    return null;
  }
};

export const List = props => (
  <FlatList
    {...props}
    keyExtractor={item => item._id}
    //ItemSeparatorComponent={() => <View style={styles.sep} />}
  />
);
