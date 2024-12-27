import { View, Text, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";

const Header = () => {
  const { user } = useUser();

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View>
        <Text style={{ fontFamily: "outfit", fontSize: 18 }}>Welcome,</Text>
        <Text style={{ fontFamily: "outfit-medium", fontSize: 25 }}>
          {user ? user?.fullName : "Lalit Chitte"}
        </Text>
      </View>
      <Image
        style={{ width: 50, height: 50 }}
        source={require("../../assets/images/profile.png")}
      />
    </View>
  );
};

export default Header;
