import React from "react";
import { View, StyleSheet, SafeAreaView, Text, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { cardFetch } from "../util/api";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5"
  },
  section: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E4E4E4",
    borderBottomWidth: 1,
    borderBottomColor: "#E4E4E4",
    padding: 14,
    alignItems: "center"
  },
  titleText: {
    fontWeight: "600",
    fontSize: 18,
    color: "#4A4A4A",
    textAlign: "center",
    marginBottom: 10
  },
  text: {
    fontSize: 16,
    color: "#4A4A4A",
    marginBottom: 20
  }
});

class cardDetails extends React.Component {
  state = {
    loading: false,
    updatedItem: null
  };

  handleLogPress = () => {
    alert("todo!");
  };

  // onAdd = () => {
  //   this.setState({ loading: true }, () => {
  //     cardFetch("/Collection", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify(item.cardName)
  //     })
  //       .catch(error => {
  //         console.log("create card error", error);
  //       })
  //       .finally(() => {
  //         this.setState({ loading: false });
  //       });
  //   });
  // };

  render() {
    const item = this.state.updatedItem
      ? this.state.updatedItem
      : this.props.navigation.getParam("item", {});

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.section}>
            <Text style={styles.titleText}>{item.cardName}</Text>
            <Text style={styles.text}>
              {`Number in Collection: ${item.numCardOwned || 0}`}
            </Text>
            {/* <TouchableOpacity onPress={this.onAdd()}>
              <Text>+</Text>
            </TouchableOpacity> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default cardDetails;
