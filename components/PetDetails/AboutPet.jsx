import { View, Text } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";

const AboutPet = ({ pet }) => {
  const [readMore, setReadMore] = useState(true);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
        About {pet?.name}
      </Text>
      <Text
        numberOfLines={readMore ? 3 : 20}
        style={{ fontFamily: "outfit", fontSize: 15 }}
      >
        {pet?.about}
      </Text>
      {readMore && (
        <Text
          onPress={() => setReadMore(false)}
          style={{
            fontFamily: "outfir-medium",
            fontSize: 14,
            color: Colors.SECONDARY,
          }}
        >
          Read More
        </Text>
      )}
    </View>
  );
};

export default AboutPet;
