import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import Colors from "@/constants/Colors";

const Category = ({ ccategory }) => {
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Dogs");

  useEffect(() => {
    GetCategory();
  }, []);

  const GetCategory = async () => {
    setCategory([]);
    const snapshot = await getDocs(collection(db, "Category"));
    snapshot.forEach((doc) => {
      setCategory((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
        Category
      </Text>

      <FlatList
        data={category}
        numColumns={4}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedCategory(item.name);
              ccategory(item.name);
            }}
            style={{ flex: 1 }}
          >
            <View
              style={[
                {
                  backgroundColor: Colors.LIGHT_PRIMARY,
                  padding: 15,
                  alignItems: "center",
                  borderWidth: 1,
                  borderRadius: 15,
                  borderColor: Colors.PRIMARY,
                  margin: 5,
                },
                selectedCategory === item?.name && {
                  backgroundColor: Colors.SECONDARY,
                  borderColor: Colors.SECONDARY,
                },
              ]}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={{ uri: item?.imageUrl }}
              ></Image>
            </View>
            <Text style={{ textAlign: "center", fontFamily: "outfit" }}>
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Category;
