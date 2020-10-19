import * as React from "react";
import { Animated, StyleProp, View, ViewStyle } from "react-native";
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
      style={{
        width: safeFrame.width,
      }}
    >
      {leftActions.reverse().map((action, index) => (
        <SwipeableAction
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
      style={{
        width: safeFrame.width,
      }}
    >
      {rightActions.reverse().map((action, index) => (
        <SwipeableAction
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
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
    >
      <RectButton style={style} onPress={onPress}>
        {children}
      </RectButton>
    </Swipeable>
  );
};

export default SwipeableItem;
