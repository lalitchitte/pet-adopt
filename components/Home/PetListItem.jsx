import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import MarkFav from "../MarkFav";

const PetListItem = ({ pet }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.petListItem}
      onPress={() =>
        router.push({
          pathname: "/pet-details",
          params: pet,
        })
      }
    >
      <View style={{ position: "absolute", zIndex: 10, right: 14, top: 12 }}>
        <MarkFav pet={pet} color={"white"} />
      </View>
      <Image
        style={{
          width: 160,
          height: 135,
          objectFit: "cover",
          borderRadius: 10,
        }}
        source={{ uri: pet?.imageUrl }}
      />
      <Text style={{ fontFamily: "outfit-medium", fontSize: 17 }}>
        {pet?.name}
      </Text>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: Colors.GRAY, fontFamily: "outfit" }}>
          {pet?.breed}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            color: Colors.PRIMARY,
            paddingHorizontal: 5,
            borderRadius: 10,
            fontSize: 11,
            backgroundColor: Colors.LIGHT_PRIMARY,
          }}
        >
          {pet?.age} YRS
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  petListItem: {
    padding: 9,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 4,
    marginRight: 6,
    elevation: 2,
  },
});

export default PetListItem;
