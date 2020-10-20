import React from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  Alert,
  View,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import dayjs from "dayjs";
import range from "lodash/range";
import Picker from "../../components/Picker";
import FormInput from "../../components/FormInput";
import { MainStackParamList } from "../../types/navigation";
import { updateVehicle } from "../../redux/vehicle/vehicleSlice";
import { useAppDispatch } from "../../redux";
import * as cars from "../../constants/cars";
import { RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

interface PropTypes {
  route: RouteProp<MainStackParamList, "EditVehicle">;
  navigation: DrawerNavigationProp<MainStackParamList, "EditVehicle">;
}

const EditVehicleScreen: React.FC<PropTypes> = ({ route, navigation }) => {
  const dispatch = useAppDispatch();
  const { vehicle: existingVehicle } = route.params;
  const [year, setYear] = React.useState<number>(
    existingVehicle.year ?? dayjs().year()
  );
  const [make, setMake] = React.useState<string>(existingVehicle.make ?? "");
  const [model, setModel] = React.useState<string>(existingVehicle.model ?? "");
  const [color, setColor] = React.useState<string>(existingVehicle.color ?? "");
  const [plugType, setPlugType] = React.useState<string>(
    existingVehicle.plugType ?? ""
  );

  const handleGoBack = () =>
    navigation.reset({
      index: 0,
      routes: [{ name: "Vehicles" }],
    });

  const handleEdit = async () => {
    if (
      year < 1900 ||
      make.length === 0 ||
      model.length === 0 ||
      color.length === 0 ||
      plugType.length === 0
    ) {
      Alert.alert("Error", "Please fill out all fields!", [{ text: "Ok" }], {
        cancelable: false,
      });
      return;
    }

    const vehicleAction = await dispatch(
      updateVehicle({
        _id: existingVehicle._id,
        year,
        make,
        model,
        color,
        plugType,
      })
    );

    if (updateVehicle.fulfilled.match(vehicleAction)) {
      await handleGoBack();
    } else {
      Alert.alert(
        vehicleAction?.error?.message ?? "Error",
        (vehicleAction?.payload as string) ?? "Unable to edit vehicle!",
        [{ text: "Ok" }],
        {
          cancelable: false,
        }
      );
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="ios-arrow-round-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Vehicle</Text>
        <View style={styles.headerSpacer} />
      </View>
      <KeyboardAwareScrollView style={styles.scrollRoot}>
        <View style={styles.scrollContainer}>
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
            editable={false}
            label="License Plate"
            containerStyle={styles.spacer}
            value={existingVehicle.licensePlate}
          />
          <TouchableHighlight
            style={[styles.button, styles.spacer]}
            onPress={handleEdit}
          >
            <Text style={[styles.actionText, styles.buttonText]}>Edit</Text>
          </TouchableHighlight>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderBottomWidth: 2,
    borderBottomColor: "#cccccc",
    paddingHorizontal: 8,
  },
  headerSpacer: {
    width: 50,
    height: "100%",
    padding: 8,
  },
  headerText: {
    fontSize: 20,
    color: "#000000",
  },
  backButton: {
    width: 50,
    height: "100%",
    padding: 8,
  },
  scrollRoot: {
    flex: 1,
    backgroundColor: "#eaeaea",
  },
  scrollContainer: {
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

export default EditVehicleScreen;
