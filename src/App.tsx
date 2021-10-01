import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import YaMap from "react-native-yamap";
import Icon from "react-native-vector-icons/MaterialIcons";

YaMap.init("55349452-7237-4488-bc7d-885e918ec3e0");

export const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <YaMap
        // showUserPosition={true}
        userLocationIcon={{
          uri: "https://www.clipartmax.com/png/middle/180-1801760_pin-png.png",
        }}
        style={{ flex: 1, height: 200 }}>
        <View style={{ flex: 1 }}>
          <Text>some buttons</Text>
        </View>
      </YaMap>

      <View
        style={{
          position: "absolute",
          bottom: 300,
          right: 10,
          justifyContent: "space-between",
          width: 45,
          height: 120,
          borderRadius: 10,
          backgroundColor: "#FFFFFF",
        }}>
        <Pressable style={{}}>
          <Icon name={"zoom-in"} size={50} />
        </Pressable>
        <Pressable style={{}}>
          <Icon name={"zoom-out"} size={50} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});
