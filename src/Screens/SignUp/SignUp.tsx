import React from "react";
import { Button, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../types/Navigation";

interface PropTypes {
  navigation: StackNavigationProp<AuthStackParamList, "SignUp">;
}

const SignUpScreen: React.FC<PropTypes> = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Button onPress={() => navigation.navigate("Login")} title="Go to login" />
  </View>
);

export default SignUpScreen;
