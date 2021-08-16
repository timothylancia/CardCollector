import React from "react";
import {
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions
} from "react-native";

import { SearchBar } from "../components/SearchBar";
import { ScrollView } from "react-native-gesture-handler";
import { cardFetch } from "../util/api";
import { List, ListItem } from "../components/List";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  box: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#eee"
  },
  button: {
    backgroundColor: "#3145b7",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 45,
    alignItems: "center",
    marginBottom: 20
  },
  textB: {
    color: "#fff"
  }
});

class myCollection extends React.Component {
  state = {
    query: "",
    swap: true,
    loading: true,
    list: [],
    updatedItem: null
  };

  componentDidMount() {
    cardFetch("/Collection/list")
      .then(response => {
        this.setState({
          loading: false,
          list: response.result
        });
      })
      .catch(error => {
        console.log("list error", error);
      });
  }

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
          this.setState({ loading: false, swap: !this.state.swap });
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
          this.setState({ loading: false, swap: !this.state.swap });
          this.componentDidMount();
        });
    });
  }

  refresh = () => {
    this.componentDidMount();
  };

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          onSearch={() => {
            this.props.navigation.navigate("cardDetails", {
              cardN: this.state.query
            });
          }}
          searchButtonEnabled={this.state.query.length >= 1}
          placeholder="Card Name"
          onChangeText={query => this.setState({ query })}
        />
        <ScrollView style={styles.box}>
          <List
            data={this.state.list}
            renderItem={({ item, index }) => (
              <ListItem
                cardName={item.cardName}
                numCardOwned={item.numCardOwned}
                isLoading={this.state.loading}
                onPress1={() =>
                  this.props.navigation.navigate("cardDetails", {
                    cardN: item.cardName
                  })
                }
                onPress2={() => this.handleDec(item._id)}
                onPress3={() => this.handleInc(item._id)}
              />
            )}
          ></List>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.refresh()}
          >
            <Text style={styles.textB}>Refresh</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export default myCollection;
