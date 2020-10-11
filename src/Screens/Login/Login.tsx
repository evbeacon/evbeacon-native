import React from "react";
import {
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  StyleSheet,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StackNavigationProp } from "@react-navigation/stack";
import { setToken, setUser } from "../../redux/auth/authSlice";
import { AuthStackParamList } from "../../types/navigation";
import { login } from "../../actions/auth";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface PropTypes {
  navigation: StackNavigationProp<AuthStackParamList, "Login">;
}

const LoginScreen: React.FC<PropTypes> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleLogin = async () => {
    if (password.length < 8 || !emailRegex.test(email)) {
      Alert.alert("Error", "Please fill out all fields!", [{ text: "Ok" }], {
        cancelable: false,
      });
      return;
    }

    try {
      const response = await login({
        email,
        password,
      });

      dispatch(
        setUser({
          user: response.user,
        })
      );
      dispatch(
        setToken({
          token: response.token,
        })
      );
    } catch (error) {
      Alert.alert("Error", error.message, [{ text: "Ok" }], {
        cancelable: false,
      });
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.root}
      contentContainerStyle={styles.container}
    >
      <TextInput
        style={[styles.input, styles.spacer]}
        placeholder="Email"
        textContentType="emailAddress"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={[styles.input, styles.spacer]}
        placeholder="Password"
        textContentType="password"
        secureTextEntry
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
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#eaeaea",
  },
  container: {
    flex: 1,
    padding: 24,
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
