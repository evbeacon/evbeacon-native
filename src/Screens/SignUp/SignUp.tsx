import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../types/navigation";
import { signUp } from "../../actions/auth";
import { setUser, setToken } from "../../redux/auth/authSlice";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface PropTypes {
  navigation: StackNavigationProp<AuthStackParamList, "SignUp">;
}

const SignUpScreen: React.FC<PropTypes> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");

  const handleSignUp = async () => {
    if (
      firstName.length < 3 ||
      lastName.length < 3 ||
      !emailRegex.test(email)
    ) {
      Alert.alert("Error", "Please fill out all fields!", [{ text: "Ok" }], {
        cancelable: false,
      });
      return;
    } else if (password.length < 8) {
      Alert.alert(
        "Error",
        "Password must be at least 8 characters long!",
        [{ text: "Ok" }],
        {
          cancelable: false,
        }
      );
      return;
    } else if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords must match!", [{ text: "Ok" }], {
        cancelable: false,
      });
      return;
    }

    try {
      const response = await signUp({
        email,
        name: `${firstName} ${lastName}`,
        password,
      });

      await dispatch(setUser(response.user));
      await dispatch(setToken(response.token));
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
        placeholder="First Name"
        textContentType="givenName"
        onChangeText={(text) => setFirstName(text)}
        value={firstName}
      />
      <TextInput
        style={[styles.input, styles.spacer]}
        placeholder="Last Name"
        textContentType="familyName"
        onChangeText={(text) => setLastName(text)}
        value={lastName}
      />
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
        textContentType="newPassword"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TextInput
        style={[styles.input, styles.spacer]}
        placeholder="Confirm Password"
        textContentType="newPassword"
        secureTextEntry
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
      />
      <TouchableHighlight
        style={[styles.button, styles.spacer]}
        onPress={handleSignUp}
      >
        <Text style={[styles.actionText, styles.buttonText]}>Sign Up</Text>
      </TouchableHighlight>
      <TouchableWithoutFeedback
        style={styles.link}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.actionText}>Login</Text>
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

export default SignUpScreen;
