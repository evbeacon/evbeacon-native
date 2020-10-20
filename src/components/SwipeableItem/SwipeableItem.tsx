import * as React from "react";
import { Animated, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import SwipeableAction from "./SwipeableAction";

type SwipeAction = {
  text: string;
  color: string;
  onPress: () => void | Promise<void>;
};

interface PropTypes {
  style?: StyleProp<ViewStyle>;
  leftActions?: SwipeAction[];
  rightActions?: SwipeAction[];
  onPress?: () => void | Promise<void>;
}

const SwipeableItem: React.FC<PropTypes> = ({
  style,
  leftActions = [],
  rightActions = [],
  onPress,
  children,
}) => {
  const safeFrame = useSafeAreaFrame();

  const renderLeftActions = (progress: Animated.AnimatedInterpolation) => (
    <View
      style={[
        styles.actionContainer,
        {
          width: safeFrame.width,
        },
      ]}
    >
      {leftActions.map((action, index) => (
        <SwipeableAction
          direction="LEFT"
          key={`${action.text}-${action.color}`}
          text={action.text}
          color={action.color}
          x={(safeFrame.width / leftActions.length) * (index + 1)}
          progress={progress}
          onPress={action.onPress}
        />
      ))}
    </View>
  );

  const renderRightActions = (progress: Animated.AnimatedInterpolation) => (
    <View
      style={[
        styles.actionContainer,
        {
          width: safeFrame.width,
        },
      ]}
    >
      {rightActions.map((action, index) => (
        <SwipeableAction
          direction="RIGHT"
          key={`${action.text}-${action.color}`}
          text={action.text}
          color={action.color}
          x={(safeFrame.width / rightActions.length) * (index + 1)}
          progress={progress}
          onPress={action.onPress}
        />
      ))}
    </View>
  );

  return (
    <Swipeable
      friction={2}
      leftThreshold={30}
      rightThreshold={40}
      renderLeftActions={
        leftActions?.length > 0 ? renderLeftActions : undefined
      }
      renderRightActions={
        rightActions?.length > 0 ? renderRightActions : undefined
      }
    >
      <RectButton style={style} onPress={onPress}>
        {children}
      </RectButton>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: "row",
  },
});

export default SwipeableItem;
