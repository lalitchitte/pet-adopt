import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Category from "./Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import PetListItem from "./PetListItem";

const PetListBYCategory = () => {
  const [petList, setPetList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    GetPetList("Dogs");
  }, []);

  const GetPetList = async (category) => {
    setLoader(true);
    setPetList([]);
    const q = query(collection(db, "Pets"), where("category", "==", category));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setPetList((prev) => [...prev, doc.data()]);
    });
    setLoader(false);
  };

  return (
    <View>
      <Category ccategory={(category) => GetPetList(category)} />

      <FlatList
        style={{ marginTop: 10 }}
        data={petList}
        horizontal
        refreshing={loader}
        onRefresh={() => GetPetList("Dogs")}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <PetListItem pet={item} />}
      />
    </View>
  );
};

export default PetListBYCategory;
