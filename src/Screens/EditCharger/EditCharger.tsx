import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Alert,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RouteProp } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Checkbox from "../../components/Checkbox";
import Picker from "../../components/Picker";
import FormInput from "../../components/FormInput";
import DateTimePicker from "../../components/DateTimePicker";
import { MainStackParamList } from "../../types/navigation";
import { updateCharger } from "../../redux/charger/chargerSlice";
import { useAppDispatch } from "../../redux";
import * as locations from "../../constants/locations";
import * as cars from "../../constants/cars";
import { Ionicons } from "@expo/vector-icons";

dayjs.extend(utc);

interface PropTypes {
  route: RouteProp<MainStackParamList, "EditCharger">;
  navigation: DrawerNavigationProp<MainStackParamList, "EditCharger">;
}

const EditChargerScreen: React.FC<PropTypes> = ({ route, navigation }) => {
  const dispatch = useAppDispatch();
  const { charger: existingCharger } = route.params;
  const currentTime = dayjs();
  const [plugType, setPlugType] = React.useState<string>(
    existingCharger.plugType ?? ""
  );
  const [description, setDescription] = React.useState<string>(
    existingCharger.description ?? ""
  );
  const [hasOffHours, setHasOffHours] = React.useState<boolean>(
    existingCharger.offHoursStartUTC != null ||
      existingCharger.offHoursEndUTC != null
  );
  const [offHoursStart, setOffHoursStart] = React.useState<Date>(
    existingCharger.offHoursStartUTC
      ? currentTime.set("hour", existingCharger.offHoursStartUTC).toDate()
      : currentTime.subtract(currentTime.minute(), "minute").toDate()
  );
  const [offHoursEnd, setOffHoursEnd] = React.useState<Date>(
    existingCharger.offHoursEndUTC
      ? currentTime.set("hour", existingCharger.offHoursEndUTC).toDate()
      : currentTime
          .subtract(currentTime.minute(), "minute")
          .add(8, "hour")
          .toDate()
  );
  const [isDisabled, setIsDisabled] = React.useState<boolean>(
    existingCharger.disabledUntil != null
  );
  const [disabledUntil, setDisabledUntil] = React.useState<Date>(
    currentTime.add(2, "week").toDate()
  );

  const handleGoBack = () =>
    navigation.reset({
      index: 0,
      routes: [{ name: "Chargers" }],
    });

  const handleEdit = async () => {
    if (plugType.length === 0) {
      Alert.alert("Error", "Please fill out all fields!", [{ text: "Ok" }], {
        cancelable: false,
      });
      return;
    }

    const chargerAction = await dispatch(
      updateCharger({
        _id: existingCharger._id,
        plugType,
        description,
        ...(hasOffHours && {
          offHoursStartUTC: dayjs(offHoursStart).utc().hour(),
          offHoursEndUTC: dayjs(offHoursEnd).utc().hour(),
        }),
        ...(isDisabled && {
          disabledUntil,
        }),
      })
    );

    if (updateCharger.fulfilled.match(chargerAction)) {
      await handleGoBack();
    } else {
      Alert.alert(
        chargerAction?.error?.message ?? "Error",
        (chargerAction?.payload as string) ?? "Unable to edit charger!",
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
        <Text style={styles.headerText}>Edit Charger</Text>
        <View style={styles.headerSpacer} />
      </View>
      <KeyboardAwareScrollView style={styles.scrollRoot}>
        <View style={styles.scrollContainer}>
          <FormInput
            editable={false}
            label="Street"
            containerStyle={styles.spacer}
            textContentType="fullStreetAddress"
            value={existingCharger.address.street}
          />
          <FormInput
            editable={false}
            label="City"
            containerStyle={styles.spacer}
            textContentType="addressCity"
            value={existingCharger.address.city}
          />
          <FormInput
            editable={false}
            label="State"
            containerStyle={styles.spacer}
            textContentType="addressState"
            value={existingCharger.address.state}
          />
          <FormInput
            editable={false}
            label="Zip Code"
            containerStyle={styles.spacer}
            value={existingCharger.address.zipCode}
          />
          <Picker
            enabled={false}
            label="Country"
            selectedValue={existingCharger.address.country}
            style={[styles.pickerTextContainer, styles.spacer]}
            pickerStyle={styles.picker}
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
          <View style={[styles.checkboxContainer, styles.spacer]}>
            <Checkbox
              checked={isDisabled}
              onPress={() => setIsDisabled((prevState) => !prevState)}
              style={styles.checkboxSpacer}
            />
            <Text style={styles.actionText}>Disabled</Text>
          </View>
          {isDisabled && (
            <DateTimePicker
              label="Disabled Until"
              value={disabledUntil}
              mode="datetime"
              is24Hour={false}
              style={[styles.pickerTextContainer, styles.spacer]}
              onConfirm={(selectedDate) => {
                setDisabledUntil(selectedDate);
              }}
            />
          )}
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

export default EditChargerScreen;
