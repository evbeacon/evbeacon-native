import * as React from "react";
import {
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import DateTimePickerModal, {
  ReactNativeModalDateTimePickerProps,
} from "react-native-modal-datetime-picker";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

interface PropTypes
  extends Omit<ReactNativeModalDateTimePickerProps, "onCancel"> {
  value: Date;
  label: string;
  style?: StyleProp<ViewStyle>;
  minCurrent?: boolean;
  maxCurrent?: boolean;
}

const DateTimePicker: React.FC<PropTypes> = ({
  value,
  label,
  style,
  mode,
  minCurrent = false,
  maxCurrent = false,
  onConfirm,
  ...pickerProps
}: PropTypes) => {
  const [open, setOpen] = React.useState<boolean>(false);

  let formatter = "";
  if (mode?.startsWith("date")) {
    formatter += "MMM D, ";
  }
  if (mode?.endsWith("time")) {
    formatter += "LT";
  }
  formatter = formatter.trim();
  if (formatter.endsWith(",")) {
    formatter = formatter.substr(0, formatter.length - 1);
  }
  const formattedValue = dayjs(value).format(formatter);

  const handleConfirm = (date: Date) => {
    if (date != null) {
      onConfirm(date);
      setOpen(false);
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpen(true)}>
        <View style={[styles.primaryContainer, style]}>
          <Text style={styles.text}>{label}:</Text>
          <Text style={styles.text}>{formattedValue}</Text>
        </View>
      </TouchableWithoutFeedback>
      <DateTimePickerModal
        isVisible={open}
        mode={mode}
        headerTextIOS={`Pick a ${mode}`}
        date={value}
        minimumDate={minCurrent ? new Date() : undefined}
        maximumDate={maxCurrent ? new Date() : undefined}
        onCancel={() => setOpen(false)}
        onConfirm={handleConfirm}
        isDarkModeEnabled={false}
        {...pickerProps}
      />
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
  text: {
    fontSize: 20,
  },
});

export default DateTimePicker;
