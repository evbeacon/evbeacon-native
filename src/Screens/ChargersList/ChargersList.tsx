import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import SwipeableItem from "../../components/SwipeableItem";
import { MainStackParamList } from "../../types/navigation";
import { getCharger } from "../../actions/charger";
import { setChargers } from "../../redux/charger/chargerSlice";
import { RootState } from "../../redux";
import { ChargerType } from "../../types/charger";
import { Ionicons } from "@expo/vector-icons";

interface PropTypes {
  navigation: DrawerNavigationProp<MainStackParamList, "Chargers">;
}

const ChargersListScreen: React.FC<PropTypes> = ({ navigation }) => {
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
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headerSpacer} />
        <Text style={styles.headerText}>Chargers</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddVehicle")}
        >
          <Ionicons name="ios-add" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.list}
        data={chargers}
        onRefresh={handleRefresh}
        refreshing={refreshing}
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
            <Text style={styles.itemText}>{charger.address.street}</Text>
          </SwipeableItem>
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderBottomWidth: 2,
    borderBottomColor: "#cccccc",
    paddingHorizontal: 8,
  },
  headerSpacer: {
    width: 50,
    height: "100%",
    padding: 8,
  },
  headerText: {
    fontSize: 20,
    color: "#000000",
  },
  addButton: {
    width: 50,
    height: "100%",
    padding: 8,
  },
  list: {
    flex: 1,
    width: "100%",
  },
  itemContainer: {
    flex: 1,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
  },
  itemText: {
    fontSize: 16,
  },
  separator: {
    backgroundColor: "rgb(200, 199, 204)",
    height: StyleSheet.hairlineWidth,
  },
});

export default ChargersListScreen;
