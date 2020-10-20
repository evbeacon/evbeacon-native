import React from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  Alert,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import dayjs from "dayjs";
import range from "lodash/range";
import Picker from "../../components/Picker";
import FormInput from "../../components/FormInput";
import { MainStackParamList } from "../../types/navigation";
import { createVehicle } from "../../actions/vehicle";
import { updateUser } from "../../actions/user";
import { setUser } from "../../redux/auth/authSlice";
import * as cars from "../../constants/cars";
import { RootState } from "../../redux";

interface PropTypes {
  navigation: DrawerNavigationProp<MainStackParamList, "AddVehicle">;
}

const AddVehicleScreen: React.FC<PropTypes> = ({ navigation }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const [year, setYear] = React.useState<number>(dayjs().year());
  const [make, setMake] = React.useState<string>("");
  const [model, setModel] = React.useState<string>("");
  const [color, setColor] = React.useState<string>("");
  const [plugType, setPlugType] = React.useState<string>("");
  const [licensePlate, setLicensePlate] = React.useState<string>("");

  React.useEffect(() => {
    if (!auth.user?.finishedVehicle) {
      navigation.setOptions({
        gestureEnabled: true,
        swipeEnabled: true,
      });
    }
  }, [auth.user]);

  const handleCreate = async () => {
    if (
      year < 1900 ||
      make.length === 0 ||
      model.length === 0 ||
      color.length === 0 ||
      plugType.length === 0 ||
      licensePlate.length === 0
    ) {
      Alert.alert("Error", "Please fill out all fields!", [{ text: "Ok" }], {
        cancelable: false,
      });
      return;
    }

    try {
      await createVehicle(auth.token!, {
        year,
        make,
        model,
        color,
        plugType,
        licensePlate,
      });

      const updatedUser = await updateUser(auth.token!, {
        _id: auth.user!._id,
        finishedVehicle: true,
      });

      await dispatch(setUser(updatedUser));

      await navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", error.message, [{ text: "Ok" }], {
        cancelable: false,
      });
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.root}>
      <View style={styles.container}>
        <Picker
          label="Year"
          selectedValue={year.toString()}
          style={[styles.pickerTextContainer, styles.spacer]}
          pickerStyle={styles.picker}
          onValueChange={(itemValue) =>
            setYear(parseInt(itemValue.toString(), 10))
          }
        >
          {range(dayjs().year() + 1, 1899, -1).map((item) => (
            <Picker.Item
              key={item}
              label={item.toString()}
              value={item.toString()}
            />
          ))}
        </Picker>
        <Picker
          label="Make"
          selectedValue={make}
          style={[styles.pickerTextContainer, styles.spacer]}
          pickerStyle={styles.picker}
          onValueChange={(itemValue) => setMake(itemValue.toString())}
        >
          {cars.makes.map((item) => (
            <Picker.Item key={item} label={item} value={item} />
          ))}
        </Picker>
        <Picker
          label="Model"
          selectedValue={model}
          style={[styles.pickerTextContainer, styles.spacer]}
          pickerStyle={styles.picker}
          onValueChange={(itemValue) => setModel(itemValue.toString())}
        >
          {(make === "" ? [] : cars.modelsByMake[make]).map((item) => (
            <Picker.Item key={item} label={item} value={item} />
          ))}
        </Picker>
        <Picker
          label="Color"
          selectedValue={color}
          style={[styles.pickerTextContainer, styles.spacer]}
          pickerStyle={styles.picker}
          onValueChange={(itemValue) => setColor(itemValue.toString())}
        >
          {cars.colors.map((item) => (
            <Picker.Item key={item} label={item} value={item} />
          ))}
        </Picker>
        <Picker
          label="Plug Type"
          selectedValue={plugType}
          style={[styles.pickerTextContainer, styles.spacer]}
          pickerStyle={styles.picker}
          onValueChange={(itemValue) => setPlugType(itemValue.toString())}
        >
          {cars.plugTypes.map((item) => (
            <Picker.Item key={item} label={item} value={item} />
          ))}
        </Picker>
        <FormInput
          label="License Plate"
          containerStyle={styles.spacer}
          onChangeText={(text) => setLicensePlate(text)}
          value={licensePlate}
        />
        <TouchableHighlight
          style={[styles.button, styles.spacer]}
          onPress={handleCreate}
        >
          <Text style={[styles.actionText, styles.buttonText]}>Create</Text>
        </TouchableHighlight>
      </View>
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
  pickerTextContainer: {
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    padding: 4,
    fontSize: 20,
  },
  picker: {
    width: "100%",
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

export default AddVehicleScreen;
