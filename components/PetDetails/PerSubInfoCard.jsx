import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

const PerSubInfoCard = ({ icon, title, value }) => {
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: 10,
        margin: 5,
        borderRadius: 8,
        gap: 10,
      }}
    >
      <Image style={{ width: 40, height: 40 }} source={icon} />

      <View style={{ flex: 1 }}>
        <Text
          style={{ fontFamily: "outfit", fontSize: 16, color: Colors.GRAY }}
        >
          {title}
        </Text>
        <Text style={{ fontFamily: "outfit-medium", fontSize: 16 }}>
          {value}
        </Text>
      </View>
    </View>
  );
};

export default PerSubInfoCard;
