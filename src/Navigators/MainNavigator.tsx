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
import { setupAuthed } from "../utils/initializers";
import { RootState } from "../redux";

const Drawer = createDrawerNavigator();

const hiddenRoutes = ["AddCharger", "AddVehicle"];

const MainNavigator: React.FC = () => {
  const dimensions = useWindowDimensions();
  const auth = useSelector((state: RootState) => state.auth);
  const chargers = useSelector((state: RootState) => state.charger.chargers);
  const vehicles = useSelector((state: RootState) => state.vehicle.vehicles);

  React.useEffect(() => {
    (async () => {
      await setupAuthed(auth!.token!);

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
    })();
  }, [auth.user]);

  let initialRoute = "Home";
  if (!auth.user!.finishedCharger || chargers.length === 0) {
    initialRoute = "AddCharger";
  } else if (!auth.user!.finishedVehicle || vehicles.length === 0) {
    initialRoute = "AddVehicle";
  }

  const completedSetup = initialRoute === "Home";

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
      <Drawer.Screen name="AddCharger" component={AddChargerScreen} />
      <Drawer.Screen name="AddVehicle" component={AddVehicleScreen} />
    </Drawer.Navigator>
  );
};

export default MainNavigator;
