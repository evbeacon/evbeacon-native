import React from "react";
import { Animated, ViewProps } from "react-native";

interface PropTypes extends ViewProps {
  visible: boolean;
  duration: number;
  maxOpacity?: number;
}

const FadeView: React.FC<PropTypes> = ({
  visible,
  duration,
  maxOpacity = 1,
  style,
  children,
  ...other
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: visible ? maxOpacity : 0,
      duration,
      useNativeDriver: true,
    }).start();

    return () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }).start();
    };
  }, [visible, fadeAnim]);

  return (
    <Animated.View
      style={{
        ...(style as Record<string, unknown>),
        opacity: fadeAnim,
      }}
      {...other}
    >
      {children}
    </Animated.View>
  );
};

export default FadeView;
