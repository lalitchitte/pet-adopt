import { View, Text, FlatList, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "./../../config/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const Slider = () => {
  const [sliderList, setSliderList] = useState([]);
  useEffect(() => {
    GetSliders();
  }, []);

  const GetSliders = async () => {
    setSliderList([]);
    const snapshot = await getDocs(collection(db, "Sliders"));
    snapshot.forEach((doc) => {
      setSliderList((sliderList) => [...sliderList, doc.data()]);
    });
  };

  return (
    <View style={{ marginTop: 15 }}>
      <FlatList
        data={sliderList}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item, index }) => (
          <View>
            <Image
              style={{
                width: Dimensions.get("screen").width * 0.9,
                height: 170,
                borderRadius: 15,
                marginRight: 15,
              }}
              source={{ uri: item?.imageUrl }}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Slider;
