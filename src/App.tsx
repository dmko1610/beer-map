import React, { useEffect } from "react";
import {
  PermissionsAndroid,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import YaMap, { CameraPosition } from "react-native-yamap";
import Geolocation from "react-native-geolocation-service";
import Icon from "react-native-vector-icons/MaterialIcons";
import { MapKitAPIKey } from "./api_keys";

YaMap.init(MapKitAPIKey);

export const App = () => {
  const map = React.useRef<YaMap>(null);
  const [locationAccess, setLocationAccess] = React.useState(false);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Beer Map App Location Permission",
          message: "Beer Map App needs access to your camera ",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setLocationAccess(true);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentPosition = (): Promise<CameraPosition> => {
    return new Promise<CameraPosition>(resolve => {
      if (map.current) {
        map.current.getCameraPosition(position => resolve(position));
      }
    });
  };

  const zoomUp = async (): Promise<void> => {
    const position = await getCurrentPosition();
    if (map.current) {
      map.current.setZoom(position.zoom * 1.5, 0.1);
    }
  };

  const zoomOut = async (): Promise<void> => {
    const position = await getCurrentPosition();
    if (map.current) {
      map.current.setZoom(position.zoom * 0.6, 0.1);
    }
  };

  useEffect(() => {
    requestLocationPermission();
    if (locationAccess) {
      Geolocation.getCurrentPosition(
        position => {
          console.log("real position ", position);
        },
        error => {
          console.log("error ", error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <YaMap ref={map} style={{ flex: 1, height: 200 }}>
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
        <Pressable style={{}} onPress={zoomUp}>
          <Icon name={"zoom-in"} size={50} />
        </Pressable>
        <Pressable style={{}} onPress={zoomOut}>
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
