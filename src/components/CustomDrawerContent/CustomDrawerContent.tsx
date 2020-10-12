import * as React from "react";
import { StyleSheet } from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

interface PropTypes extends DrawerContentComponentProps {
  hiddenRoutes?: string[];
}

const CustomDrawerContent: React.FC<PropTypes> = ({
  hiddenRoutes = [],
  itemStyle,
  labelStyle,
  ...props
}) => {
  const { state, ...rest } = props;
  const newState = { ...state };
  newState.routes = newState.routes.filter(
    (item) => !hiddenRoutes.includes(item.name)
  );

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList
        state={newState}
        itemStyle={[itemStyle, styles.item]}
        labelStyle={[labelStyle, styles.label]}
        {...rest}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  item: {
    // flex: 1,
    // padding: 24,
    backgroundColor: "#eaeaea",
    // alignItems: "center",
    fontSize: 20,
  },
  label: {
    fontSize: 16,
  },
});

export default CustomDrawerContent;
