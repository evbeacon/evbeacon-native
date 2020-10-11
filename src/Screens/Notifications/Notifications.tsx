import React from "react";
import { Button, View } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { MainStackParamList } from "../../types/navigation";

interface PropTypes {
  navigation: DrawerNavigationProp<MainStackParamList, "Notifications">;
}

const NotificationsScreen: React.FC<PropTypes> = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Button onPress={() => navigation.goBack()} title="Go back home" />
  </View>
);

export default NotificationsScreen;
