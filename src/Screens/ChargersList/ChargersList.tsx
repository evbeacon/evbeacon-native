import React from "react";
import { StyleSheet, View, Text, Alert, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import SwipeableItem from "../../components/SwipeableItem";
import { MainStackParamList } from "../../types/navigation";
import { getCharger } from "../../actions/charger";
import { setChargers } from "../../redux/charger/chargerSlice";
import { RootState } from "../../redux";
import { ChargerType } from "../../types/charger";

interface PropTypes {
  navigation: DrawerNavigationProp<MainStackParamList, "ChargersList">;
}

const ChargersListScreen: React.FC<PropTypes> = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const chargers = useSelector((state: RootState) => state.charger.chargers);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      await handleRefresh();
    })();
  }, [token]);

  const handleRefresh = async (): Promise<void> => {
    try {
      setRefreshing(true);
      const newChargers = await getCharger(token!, {});

      await dispatch(setChargers(newChargers));
      setRefreshing(false);
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to fetch chargers!",
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

  const handleDelete = (charger: ChargerType): void => {
    Alert.alert(
      "Warning",
      `Are you sure you want to delete this charger?\n${charger.address.street}`,
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
      data={chargers}
      onRefresh={handleRefresh}
      refreshing={refreshing}
      ListHeaderComponent={() => (
        <View>
          <Text>Chargers</Text>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item: charger }) => (
        <SwipeableItem
          style={styles.itemContainer}
          rightActions={[
            {
              text: "Delete",
              color: "#dc3545",
              onPress: () => handleDelete(charger),
            },
          ]}
        >
          <Text>{charger.address.street}</Text>
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

export default ChargersListScreen;
