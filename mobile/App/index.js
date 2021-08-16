import React from "react";
import { TouchableOpacity, Image, StatusBar } from "react-native";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import myCollection from "./screens/myCollection";
import cardDetails from "./screens/cardDetails";
import search from "./screens/search";

const HeaderRightButton = ({ onPress, style, icon }) => (
  <TouchableOpacity onPress={onPress}>
    <Image
      source={icon}
      resizeMode="contain"
      style={[
        {
          marginRight: 15,
          width: 20,
          height: 20,
          tintColor: "#fff"
        },
        style
      ]}
    />
  </TouchableOpacity>
);

const MainStack = createStackNavigator({
  myCollection: {
    screen: myCollection,
    navigationOptions: ({ navigation }) => ({
      headerTitle: "My Collection",

      headerRight: (
        <React.Fragment>
          <StatusBar barStyle="light-content" />
        </React.Fragment>
      ),
      headerStyle: {
        backgroundColor: "#3145b7",
        borderBottomColor: "#3145b7"
      },
      headerTintColor: "#fff"
    })
  },
  cardDetails: {
    screen: cardDetails,
    navigationOptions: ({ navigation }) => ({
      //headerTitle: navigation.getParam("cardN", {}),
      headerTitle: navigation.getParam("title", ""),

      headerRight: (
        <React.Fragment>
          <StatusBar barStyle="light-content" />
          <HeaderRightButton
            icon={require("./assets/folder-white-shape.png")}
            onPress={() => navigation.navigate("myCollection")}
          />
        </React.Fragment>
      ),
      headerStyle: {
        backgroundColor: "#3145b7",
        borderBottomColor: "#3145b7"
      },
      headerTintColor: "#fff"
    })
  },
  search: {
    screen: search,
    navigationOptions: ({ navigation }) => ({
      // TODO
      // headerTitle: navigation.getParam("title", ""),
      // later the title will be the name of the card

      headerTitle: "Card Search",

      headerRight: (
        <React.Fragment>
          <StatusBar barStyle="light-content" />
          <HeaderRightButton
            icon={require("./assets/close.png")}
            onPress={() => navigation.pop()}
          />
        </React.Fragment>
      ),
      headerStyle: {
        backgroundColor: "#3145b7",
        borderBottomColor: "#3145b7"
      },
      headerTintColor: "#fff"
    })
  }
});

export default createAppContainer(MainStack);
