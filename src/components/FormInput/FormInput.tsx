import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  TextInput,
  ViewStyle,
  TextInputProps,
  TouchableWithoutFeedback,
} from "react-native";

interface PropTypes extends TextInputProps {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const FormInput: React.FC<PropTypes> = ({
  label,
  style,
  containerStyle,
  multiline = false,
  ...rest
}: PropTypes) => {
  const inputRef = React.useRef<TextInput>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <View
      style={{
        ...styles.container,
        ...(multiline && styles.multilineContainer),
        ...(containerStyle as Record<string, unknown>),
      }}
    >
      {label != null && (
        <TouchableWithoutFeedback onPress={handleFocus}>
          <Text style={styles.text}>{label}:</Text>
        </TouchableWithoutFeedback>
      )}
      <TextInput
        multiline={multiline}
        ref={inputRef}
        style={{
          ...styles.input,
          ...(multiline && styles.multilineInput),
          ...(style as Record<string, unknown>),
        }}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    fontSize: 20,
  },
  multilineContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  input: {
    flex: 1,
    fontSize: 20,
    textAlign: "right",
  },
  multilineInput: {
    flex: 0,
    textAlign: "left",
    textAlignVertical: "top",
    height: 120,
  },
  text: {
    fontSize: 20,
  },
});

export default FormInput;
