import React from "react";
import { Provider, useSelector } from "react-redux";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { PersistGate } from "redux-persist/integration/react";
import * as SplashScreen from "expo-splash-screen";
import MainNavigator from "./src/Navigators/MainNavigator";
import AuthNavigator from "./src/Navigators/AuthNavigator";
import { store, persistor, RootState } from "./src/redux";
import { setupPermissions, setupRedux } from "./src/utils/initializers";

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

      await setupPermissions();
      await setupRedux();

      await SplashScreen.hideAsync();
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SafeAreaView style={{ flex: 1 }} edges={["left", "top", "right"]}>
            <App />
          </SafeAreaView>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default WrappedApp;
