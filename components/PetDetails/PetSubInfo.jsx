import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import PerSubInfoCard from "./PerSubInfoCard";

const PetSubInfo = ({ pet }) => {
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <PerSubInfoCard
          icon={require("./../../assets/images/calendar.png")}
          title="Age"
          value={pet?.age + " Years"}
        />
        <PerSubInfoCard
          title="Breed"
          value={pet?.breed}
          icon={require("./../../assets/images/bone.png")}
        />
      </View>

      <View style={{ display: "flex", flexDirection: "row" }}>
        <PerSubInfoCard
          icon={require("./../../assets/images/sex.png")}
          title="Sex"
          value={pet?.sex}
        />
        <PerSubInfoCard
          title="Weight"
          value={pet?.weight + " Kg"}
          icon={require("./../../assets/images/weight.png")}
        />
      </View>
    </View>
  );
};

export default PetSubInfo;
