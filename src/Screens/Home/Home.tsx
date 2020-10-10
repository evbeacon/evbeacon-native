import React from "react";
import { Button, View } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { MainStackParamList } from "../../types/Navigation";

interface PropTypes {
  navigation: DrawerNavigationProp<MainStackParamList, "Home">;
}

const HomeScreen: React.FC<PropTypes> = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Button
      onPress={() => navigation.navigate("Notifications")}
      title="Go to notifications"
    />
  </View>
);

export default HomeScreen;
