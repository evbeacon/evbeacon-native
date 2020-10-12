import React from "react";
import { Provider, useSelector } from "react-redux";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import * as Location from "expo-location";
import MainNavigator from "./src/Navigators/MainNavigator";
import AuthNavigator from "./src/Navigators/AuthNavigator";
import store, { RootState } from "./src/redux";
import { setToken, setUser } from "./src/redux/auth/authSlice";
import { getUser } from "./src/actions/user";
import { Alert } from "react-native";

const App: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <NavigationContainer>
      {token == null ? <AuthNavigator /> : <MainNavigator />}
    </NavigationContainer>
  );
};

const WrappedApp: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      await SplashScreen.preventAutoHideAsync();

      const storedToken = await SecureStore.getItemAsync("token");

      if (storedToken != null) {
        try {
          const user = await getUser(storedToken, {});

          await store.dispatch(
            setToken({
              token: storedToken.toString(),
            })
          );

          await store.dispatch(
            setUser({
              user,
            })
          );
        } catch (error) {
          Alert.alert("Error", error.message, [{ text: "Ok" }], {
            cancelable: false,
          });
        }
      }

      await SplashScreen.hideAsync();
      setIsLoading(false);
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestPermissionsAsync();
        if (status !== "granted") {
          throw new Error("Permission to access location was denied");
        }
      } catch (error) {
        Alert.alert("Error", error.message, [{ text: "Ok" }], {
          cancelable: false,
        });
      }
    })();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <SafeAreaView style={{ flex: 1 }}>
          <App />
        </SafeAreaView>
      </Provider>
    </SafeAreaProvider>
  );
};

export default WrappedApp;
