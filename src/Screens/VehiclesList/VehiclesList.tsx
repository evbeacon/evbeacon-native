import React from "react";
import { StyleSheet, View, Text, Alert, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import SwipeableItem from "../../components/SwipeableItem";
import { MainStackParamList } from "../../types/navigation";
import { getVehicle } from "../../actions/vehicle";
import { setVehicles } from "../../redux/vehicle/vehicleSlice";
import { RootState } from "../../redux";
import { VehicleType } from "../../types/vehicle";

interface PropTypes {
  navigation: DrawerNavigationProp<MainStackParamList, "ChargersList">;
}

const VehiclesListScreen: React.FC<PropTypes> = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const vehicles = useSelector((state: RootState) => state.vehicle.vehicles);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      await handleRefresh();
    })();
  }, [token]);

  const handleRefresh = async (): Promise<void> => {
    try {
      setRefreshing(true);
      const newVehicles = await getVehicle(token!, {});

      await dispatch(setVehicles(newVehicles));
      setRefreshing(false);
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to fetch vehicles!",
        [
          {
            text: "Ok",
            onPress: () => setRefreshing(false),
          },
        ],
        {
          cancelable: false,
        }
      );
    }
  };

  const handleDelete = (vehicle: VehicleType): void => {
    Alert.alert(
      "Warning",
      `Are you sure you want to delete this vehicle?\n${vehicle.make} ${vehicle.model}`,
      [
        {
          text: "No",
        },
        {
          text: "Yes",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <FlatList
      data={vehicles}
      onRefresh={handleRefresh}
      refreshing={refreshing}
      ListHeaderComponent={() => (
        <View>
          <Text>Vehicles</Text>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item: vehicle }) => (
        <SwipeableItem
          style={styles.itemContainer}
          rightActions={[
            {
              text: "Delete",
              color: "#dc3545",
              onPress: () => handleDelete(vehicle),
            },
          ]}
        >
          <Text>
            {vehicle.make} {vehicle.model}
          </Text>
        </SwipeableItem>
      )}
      keyExtractor={(item) => item._id}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "column",
    backgroundColor: "#ffffff",
  },
  separator: {
    backgroundColor: "rgb(200, 199, 204)",
    height: StyleSheet.hairlineWidth,
  },
});

export default VehiclesListScreen;
