import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../Screens/Home";
import NotificationsScreen from "../Screens/Notifications";
import ProfileScreen from "../Screens/Profile";

const Drawer = createDrawerNavigator();

const MainNavigator: React.FC = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    <Drawer.Screen name="Profile" component={ProfileScreen} />
  </Drawer.Navigator>
);

export default MainNavigator;
