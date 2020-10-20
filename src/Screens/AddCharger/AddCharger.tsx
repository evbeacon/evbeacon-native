import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Checkbox from "../../components/Checkbox";
import Picker from "../../components/Picker";
import FormInput from "../../components/FormInput";
import DateTimePicker from "../../components/DateTimePicker";
import { MainStackParamList } from "../../types/navigation";
import { createCharger } from "../../actions/charger";
import { updateUser } from "../../actions/user";
import { RootState } from "../../redux";
import { setUser } from "../../redux/auth/authSlice";
import {
  getCurrentLocation,
  getAddressFromLocation,
  getLocationFromAddress,
} from "../../utils/location";
import { validateLocation, validateAddress } from "../../utils/location";
import * as locations from "../../constants/locations";
import * as cars from "../../constants/cars";
import { AddressType } from "../../types/address";

dayjs.extend(utc);

interface PropTypes {
  navigation: DrawerNavigationProp<MainStackParamList, "AddCharger">;
}

const AddChargerScreen: React.FC<PropTypes> = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentTime = dayjs();
  const auth = useSelector((state: RootState) => state.auth);
  const [address, setAddress] = React.useState<AddressType>({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  const [plugType, setPlugType] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [hasOffHours, setHasOffHours] = React.useState<boolean>(false);
  const [offHoursStart, setOffHoursStart] = React.useState<Date>(
    currentTime.subtract(currentTime.minute(), "minute").toDate()
  );
  const [offHoursEnd, setOffHoursEnd] = React.useState<Date>(
    currentTime.subtract(currentTime.minute(), "minute").add(8, "hour").toDate()
  );

  React.useEffect(() => {
    if (!auth.user?.finishedCharger) {
      navigation.setOptions({
        gestureEnabled: false,
        swipeEnabled: false,
      });
    }
  }, [auth.user]);

  React.useEffect(() => {
    (async () => {
      try {
        const curLocation = await getCurrentLocation();
        const curAddress = await getAddressFromLocation(curLocation);

        setAddress(curAddress);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log("Failed to retrieve current location!", error);
      }
    })();
  }, []);

  const handleCreate = async () => {
    if (plugType.length === 0 || !validateAddress(address)) {
      Alert.alert("Error", "Please fill out all fields!", [{ text: "Ok" }], {
        cancelable: false,
      });
      return;
    }

    try {
      const location = await getLocationFromAddress(address);

      if (!validateLocation(location)) {
        throw new Error("Invalid address!");
      }

      await createCharger(auth.token!, {
        location,
        address,
        plugType,
        description,
        ...(hasOffHours && {
          offHoursStartUTC: dayjs(offHoursStart).utc().hour(),
          offHoursEndUTC: dayjs(offHoursEnd).utc().hour(),
        }),
      });

      const updatedUser = await updateUser(auth.token!, {
        _id: auth.user!._id,
        finishedCharger: true,
      });

      await dispatch(setUser(updatedUser));

      await navigation.navigate("AddVehicle");
    } catch (error) {
      Alert.alert("Error", error.message, [{ text: "Ok" }], {
        cancelable: false,
      });
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.root}>
      <View style={styles.container}>
        <FormInput
          label="Street"
          containerStyle={styles.spacer}
          textContentType="fullStreetAddress"
          onChangeText={(text) =>
            setAddress((prevState) => ({
              ...prevState,
              street: text,
            }))
          }
          value={address.street}
        />
        <FormInput
          label="City"
          containerStyle={styles.spacer}
          textContentType="addressCity"
          onChangeText={(text) =>
            setAddress((prevState) => ({
              ...prevState,
              city: text,
            }))
          }
          value={address.city}
        />
        <FormInput
          label="State"
          containerStyle={styles.spacer}
          textContentType="addressState"
          onChangeText={(text) =>
            setAddress((prevState) => ({
              ...prevState,
              state: text,
            }))
          }
          value={address.state}
        />
        <FormInput
          label="Zip Code"
          containerStyle={styles.spacer}
          onChangeText={(text) =>
            setAddress((prevState) => ({
              ...prevState,
              zipCode: text,
            }))
          }
          value={address.zipCode}
        />
        <Picker
          label="Country"
          selectedValue={address.country}
          style={[styles.pickerTextContainer, styles.spacer]}
          pickerStyle={styles.picker}
          onValueChange={(itemValue) =>
            setAddress((prevState) => ({
              ...prevState,
              country: itemValue.toString(),
            }))
          }
        >
          {locations.countries.map((item) => (
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
          label="Description (optional)"
          containerStyle={styles.spacer}
          style={styles.multiline}
          multiline
          onChangeText={(text) => setDescription(text)}
          value={description}
        />
        <View style={[styles.checkboxContainer, styles.spacer]}>
          <Checkbox
            checked={hasOffHours}
            onPress={() => setHasOffHours((prevState) => !prevState)}
            style={styles.checkboxSpacer}
          />
          <Text style={styles.actionText}>Off Hours</Text>
        </View>
        {hasOffHours && (
          <>
            <DateTimePicker
              label="Start"
              value={offHoursStart}
              mode="time"
              is24Hour={false}
              style={[styles.pickerTextContainer, styles.spacer]}
              onConfirm={(selectedDate) => {
                const parsedDate = dayjs(selectedDate);
                const newDate = parsedDate.subtract(
                  parsedDate.minute(),
                  "minute"
                );

                setOffHoursStart(newDate.toDate());
              }}
            />
            <DateTimePicker
              label="End"
              value={offHoursEnd}
              mode="time"
              is24Hour={false}
              style={[styles.pickerTextContainer, styles.spacer]}
              onConfirm={(selectedDate) => {
                const parsedDate = dayjs(selectedDate);
                const newDate = parsedDate.subtract(
                  parsedDate.minute(),
                  "minute"
                );

                setOffHoursEnd(newDate.toDate());
              }}
            />
          </>
        )}
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
  multiline: {
    textAlignVertical: "top",
    height: 120,
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
  checkboxContainer: {
    width: "100%",
    height: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    padding: 4,
    fontSize: 20,
  },
  checkboxSpacer: {
    marginRight: 12,
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

export default AddChargerScreen;
