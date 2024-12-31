import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import Header from "@/components/Home/Header";
import Slider from "@/components/Home/Slider";
import PetListBYCategory from "@/components/Home/PetListBYCategory";
import Colors from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

const Home = () => {
  const navigation = useRouter();

  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Header />
      <Slider />
      <PetListBYCategory />

      <TouchableOpacity
        style={styles.addNewPetContainer}
        onPress={() => navigation.push("/add-new-pet")}
      >
        <MaterialIcons name="pets" size={24} color={Colors.PRIMARY} />
        <Text
          style={{
            color: Colors.PRIMARY,
            fontFamily: "outfit-medium",
            fontSize: 18,
          }}
        >
          Add New Pet
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  addNewPetContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 20,
    marginTop: 20,
    backgroundColor: Colors.LIGHT_PRIMARY,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 15,
    borderStyle: "dashed",
    justifyContent: "center",
  },
});

export default Home;
