import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { useDispatch } from "react-redux";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { removeToken } from "../../redux/auth/authSlice";
import { MainStackParamList } from "../../types/navigation";

interface PropTypes {
  navigation: DrawerNavigationProp<MainStackParamList, "Profile">;
}

const ProfileScreen: React.FC<PropTypes> = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(removeToken());
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={[styles.button, styles.spacer]}
        onPress={handleLogout}
      >
        <Text style={[styles.actionText, styles.buttonText]}>Logout</Text>
      </TouchableHighlight>
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

export default ProfileScreen;
