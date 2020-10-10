import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import { StackNavigationProp } from "@react-navigation/stack";
import { setToken } from "../../redux/auth/authSlice";
import { AuthStackParamList } from "../../types/Navigation";

interface PropTypes {
  navigation: StackNavigationProp<AuthStackParamList, "Login">;
}

const LoginScreen: React.FC<PropTypes> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleLogin = async () => {
    await dispatch(setToken("hello"));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, styles.spacer]}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={[styles.input, styles.spacer]}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TouchableHighlight
        style={[styles.button, styles.spacer]}
        onPress={handleLogin}
      >
        <Text style={[styles.actionText, styles.buttonText]}>Login</Text>
      </TouchableHighlight>
      <TouchableWithoutFeedback
        style={styles.link}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.actionText}>Sign Up</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    padding: 4,
    fontSize: 20,
  },
  button: {
    width: 200,
    maxWidth: "80%",
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#142560",
    borderRadius: 8,
  },
  link: {
    backgroundColor: "#401460",
  },
  actionText: {
    fontSize: 20,
  },
  buttonText: {
    color: "#ffffff",
  },
  spacer: {
    marginBottom: 24,
  },
});

export default LoginScreen;
