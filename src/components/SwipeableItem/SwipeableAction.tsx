import * as React from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";

interface PropTypes {
  direction: "LEFT" | "RIGHT";
  text: string;
  color: string;
  onPress: () => void | Promise<void>;
  x: number;
  progress: Animated.AnimatedInterpolation;
}

const SwipeableAction: React.FC<PropTypes> = ({
  direction,
  text,
  color,
  x,
  progress,
  onPress,
}) => {
  const trans = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [direction === "LEFT" ? -x : x, 0],
  });

  return (
    <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
      <RectButton
        style={[styles.action, { backgroundColor: color }]}
        onPress={onPress}
      >
        <Text style={styles.actionText}>{text}</Text>
      </RectButton>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  action: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    color: "white",
    fontSize: 16,
    backgroundColor: "transparent",
    padding: 10,
  },
});

export default SwipeableAction;
