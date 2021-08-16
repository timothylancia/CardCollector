import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  Alert,
  RefreshControl
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { cardFetch } from "../util/api";
import { scryfallApi } from "../util/api";

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
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 10,
    textAlign: "center"
  },
  buttonView: {
    flexDirection: "row",
    flex: 1
  },
  button: {
    backgroundColor: "#3145b7",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 45,
    alignItems: "center",
    marginBottom: 20,
    marginLeft: 35,
    marginRight: 35
  },
  buttonT: {
    color: "#fff",
    fontSize: 24
  }
});

const getData = uris => {
  const image = uris.normal;
  return image;
};

class cardDetails extends React.Component {
  state = {
    loading: true,
    gotCard: false,
    updatedItem: null,
    dbItem: {},
    card: {},
    currentName: this.props.navigation.getParam("cardN", ""),
    currentOwned: 0,
    currentID: "",
    cardImageURI: "hello"
  };

  componentDidMount() {
    this.getCardInfo();
    this.fetchData(this.state.currentName);
  }

  getCardInfo = () => {
    return (
      fetch(
        `https://api.scryfall.com/cards/named?fuzzy=${this.state.currentName}`
      )
        .then(response => response.json())
        .then(response => {
          //console.log("response", response);
          this.props.navigation.setParams({ title: response.name });
          this.setState({
            card: response,
            currentName: response.name,
            cardImageURI: getData(response.image_uris),
            loading: true
          });
        })
        //.then(console.log(this.state.card))
        .catch(err => {
          console.log("current error", err);
          this.handleError();
        })
    );
  };

  fetchData(name) {
    cardFetch(`/Collection/get?cardName=${name}`, {
      method: "GET"
    })
      .then(response => {
        //console.log("response", response);
        this.setState({
          loading: false,
          dbItem: response
        });
      })
      .catch(error => {
        console.log("list error", error);
      })
      .finally(this.setState({ loading: false }));
  }

  handleError = () => {
    Alert.alert("No card found with that name!", "Please try again", [
      {
        text: "Okay",
        onPress: () => this.props.navigation.navigate("myCollection")
      }
    ]);
  };

  handleInc(_id) {
    this.setState({ loading: true }, () => {
      cardFetch(`/Collection/inc?_id=${_id}`, {
        method: "PUT"
      })
        .then(res => {
          this.setState({ updatedItem: res.result });
        })
        .catch(error => {
          console.log("inc press error", error);
        })
        .finally(() => {
          this.setState({ loading: false });
          this.componentDidMount();
        });
    });
  }

  handleDec(_id) {
    this.setState({ loading: true }, () => {
      cardFetch(`/Collection/dec?_id=${_id}`, {
        method: "PUT"
      })
        .then(res => {
          this.setState({ updatedItem: res.result });
        })
        .catch(error => {
          console.log("dec press error", error);
        })
        .finally(() => {
          this.setState({ loading: false });
          this.componentDidMount();
        });
    });
  }

  onAdd = () => {
    cardFetch("/Collection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cardName: this.state.currentName,
        numCardOwned: 1
      })
    })
      .then(response => {
        this.setState({
          currentID: response._id
        });
        console.log(" added and +1");
      })
      .then(response => {
        Alert.alert(
          "Card Added",
          `${this.state.currentName} has been added to your collection!`,
          [
            {
              text: "Okay"
            }
          ]
        );
      })
      .catch(error => {
        console.log("create card error", error);
      })
      .finally(() => {
        this.setState({ loading: false });
        console.log("card added");
      });
  };

  inDatabase() {
    // if (this.state.dbItem == undefined) {
    return (
      <View>
        <Text style={styles.text}>
          Would you like to add this card to your collection?
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => this.onAdd()}>
          <Text style={styles.buttonT}>+</Text>
        </TouchableOpacity>
      </View>
    );
    // } else {
    //   return (
    //     <View>
    //       <Text>This card Is already in your collection</Text>
    //     </View>
    //   );
    // }
  }

  render() {
    // if (this.state.loading) {
    //   return (
    //     <View>
    //       <ActivityIndicator color="#000" size="large" />
    //     </View>
    //   );
    // }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.section}>
            <Text style={styles.titleText}>{this.state.currentName}</Text>
            {this.inDatabase()}
            <Image
              style={{ width: 63 * 5, height: 88 * 5 }}
              source={{ uri: this.state.cardImageURI }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default cardDetails;
