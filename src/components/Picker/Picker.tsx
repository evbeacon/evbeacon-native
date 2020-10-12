import * as React from "react";
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  Dimensions,
} from "react-native";
import { Picker as BasePicker } from "@react-native-community/picker";
import type {
  PickerProps,
  PickerItemProps,
} from "@react-native-community/picker/typings/Picker";
import FadeView from "../FadeView";

type IPicker<P> = React.FC<P> & {
  Item: React.ComponentType<PickerItemProps>;
};

interface PropTypes extends PickerProps {
  label: string;
  pickerStyle?: StyleProp<TextStyle>;
}

const Picker: IPicker<PropTypes> = ({
  label,
  style,
  pickerStyle,
  ...pickerProps
}: PropTypes) => {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpen(true)}>
        <View style={[styles.primaryContainer, style]}>
          <Text style={styles.text}>{label}:</Text>
          <Text style={styles.text}>{pickerProps.selectedValue}</Text>
        </View>
      </TouchableWithoutFeedback>
      <FadeView
        visible={open}
        duration={250}
        maxOpacity={0.6}
        style={styles.modalBackground}
        pointerEvents="none"
      />
      <Modal
        style={styles.modal}
        animationType="slide"
        visible={open}
        transparent
      >
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View style={styles.modalWrapper}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <BasePicker
                  mode="dropdown"
                  style={[pickerStyle, styles.spacer]}
                  {...pickerProps}
                />
                <TouchableWithoutFeedback onPress={() => setOpen(false)}>
                  <View style={styles.button}>
                    <Text style={[styles.text, styles.buttonText]}>Select</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  primaryContainer: {
    width: "100%",
    height: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    padding: 4,
    fontSize: 20,
  },
  modal: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalWrapper: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    backgroundColor: "#242424",
    position: "absolute",
    top: 0,
    zIndex: 5,
  },
  modalContainer: {
    width: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 8,
  },
  picker: {
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    padding: 4,
    fontSize: 20,
  },
  text: {
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
  buttonText: {
    color: "#ffffff",
  },
  spacer: {
    marginBottom: 24,
  },
});

Picker.Item = BasePicker.Item;

export default Picker;
