import React from "react";
import { useSelector } from "react-redux";
import { Alert, useWindowDimensions } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../Screens/Home";
import NotificationsScreen from "../Screens/Notifications";
import ProfileScreen from "../Screens/Profile";
import AddChargerScreen from "../Screens/AddCharger";
import AddVehicleScreen from "../Screens/AddVehicle";
import CustomDrawerContent from "../components/CustomDrawerContent";
import { RootState } from "../redux";

const Drawer = createDrawerNavigator();

const hiddenRoutes = ["AddCharger", "AddVehicle"];

const MainNavigator: React.FC = () => {
  const dimensions = useWindowDimensions();
  const user = useSelector((state: RootState) => state.auth?.user);
  const completedSetup = user!.finishedCharger && user!.finishedVehicle;

  React.useEffect(() => {
    if (!completedSetup) {
      Alert.alert(
        "Welcome",
        "Welcome to EVBeacon! Please setup a charger and vehicle!",
        [{ text: "Ok" }],
        {
          cancelable: false,
        }
      );
    }
  }, [user]);

  let initialRoute = "Home";
  if (!user!.finishedCharger) {
    initialRoute = "AddCharger";
  } else if (!user!.finishedVehicle) {
    initialRoute = "AddVehicle";
  }

  return (
    <Drawer.Navigator
      initialRouteName={initialRoute}
      drawerType={dimensions.width >= 800 ? "permanent" : "front"}
      drawerContent={(props) => (
        <CustomDrawerContent hiddenRoutes={hiddenRoutes} {...props} />
      )}
    >
      {completedSetup && (
        <>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Notifications" component={NotificationsScreen} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
        </>
      )}
      <Drawer.Screen
        name="AddCharger"
        component={AddChargerScreen}
        options={{
          drawerLabel: () => null,
          title: undefined,
          drawerIcon: () => null,
        }}
      />
      <Drawer.Screen
        name="AddVehicle"
        component={AddVehicleScreen}
        options={{
          drawerLabel: () => null,
          title: undefined,
          drawerIcon: () => null,
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainNavigator;
